<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'

defineProps({
  arBackgroundImage: String
})

const TARGET_COUNT = 20
const availableVideos = ['/ar/solar_system.mp4', '/ar/life_of_butterfly.mp4']
const AR_IMMERSIVE_CLASS = 'ar-immersive-mode'
const TARGET_LOST_GRACE_MS = 450
const SOURCE_SWITCH_COOLDOWN_MS = 220

const showPopup = ref(true)
const hasStarted = ref(false)
const isStarting = ref(false)
const userInteracted = ref(false)
const errorMessage = ref('')

const sceneRef = ref(null)
const videoRef = ref(null)
const canPlayHandler = ref(null)
const lostPauseTimer = ref(null)
const currentVideoSrc = ref('')
const lastSourceSwitchAt = ref(0)

const setChromeHidden = (hidden) => {
  if (typeof document === 'undefined') {
    return
  }

  document.body.classList.toggle(AR_IMMERSIVE_CLASS, hidden)
}

const getMainVideo = () => videoRef.value ?? document.getElementById('main-video')

const resolveVideoByTarget = (targetIndex) => {
  const normalizedIndex = Math.abs(targetIndex) % availableVideos.length
  return availableVideos[normalizedIndex]
}

const clearCanPlayHandler = () => {
  const video = getMainVideo()

  if (!video || !canPlayHandler.value) {
    return
  }

  video.removeEventListener('canplay', canPlayHandler.value)
  canPlayHandler.value = null
}

const clearLostPauseTimer = () => {
  if (lostPauseTimer.value) {
    clearTimeout(lostPauseTimer.value)
    lostPauseTimer.value = null
  }
}

const cleanupVideo = () => {
  const video = getMainVideo()

  if (!video) {
    return
  }

  clearCanPlayHandler()
  clearLostPauseTimer()
  video.pause()
  video.currentTime = 0
  video.removeAttribute('src')
  video.load()
  currentVideoSrc.value = ''
}

const startAR = async () => {
  if (isStarting.value) {
    return
  }

  errorMessage.value = ''
  isStarting.value = true

  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Trình duyệt không hỗ trợ camera API')
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    stream.getTracks().forEach((track) => track.stop())

    userInteracted.value = true
    hasStarted.value = true
    showPopup.value = false
    setChromeHidden(true)

    await nextTick()
    const video = getMainVideo()

    if (video) {
      video.load()
    }
  } catch (error) {
    console.warn('AR start error:', error)
    errorMessage.value = 'Không thể truy cập camera. Vui lòng kiểm tra quyền camera và thử lại.'
    setChromeHidden(false)
  } finally {
    isStarting.value = false
  }
}

const onTargetFound = (targetIndex) => {
  const video = getMainVideo()

  if (!video) {
    return
  }

  clearLostPauseTimer()

  const nextSrc = resolveVideoByTarget(targetIndex)
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const withinSwitchCooldown = now - lastSourceSwitchAt.value < SOURCE_SWITCH_COOLDOWN_MS

  if (withinSwitchCooldown && currentVideoSrc.value !== nextSrc) {
    return
  }

  if (currentVideoSrc.value !== nextSrc) {
    lastSourceSwitchAt.value = now
    currentVideoSrc.value = nextSrc

    clearCanPlayHandler()
    video.pause()
    video.src = nextSrc

    const playWhenReady = () => {
      video
        .play()
        .then(() => {
          if (userInteracted.value) {
            video.muted = false
            video.volume = 1
          }
        })
        .catch((error) => {
          console.warn('Autoplay error:', error)
        })
    }

    if (video.readyState >= 3) {
      playWhenReady()
    } else {
      canPlayHandler.value = playWhenReady
      video.addEventListener('canplay', playWhenReady, { once: true })
      video.load()
    }
    return
  }

  if (video.paused) {
    video.play().catch((error) => {
      console.warn('Replay error:', error)
    })
  }
}

const onTargetLost = () => {
  const video = getMainVideo()

  if (!video) {
    return
  }

  clearLostPauseTimer()
  lostPauseTimer.value = setTimeout(() => {
    clearCanPlayHandler()
    video.pause()
    lostPauseTimer.value = null
  }, TARGET_LOST_GRACE_MS)
}

onBeforeUnmount(() => {
  setChromeHidden(false)
  cleanupVideo()

  const sceneEl = sceneRef.value
  const mindarSystem = sceneEl?.systems?.['mindar-image-system']

  if (mindarSystem?.stop) {
    mindarSystem.stop()
  }
})
</script>

<template>
  <main>
    <section class="ar-experience">
      <img v-if="!hasStarted" class="ar-bg" :src="arBackgroundImage" alt="AR Background" />
      <div v-if="!hasStarted" class="ar-overlay"></div>

      <div v-if="showPopup" class="ar-modal">
        <h2>Trải nghiệm AR</h2>
        <p>Nhấn "Bắt đầu" để cho phép âm thanh và mở camera.</p>
        <button class="btn btn-orange" type="button" :disabled="isStarting" @click="startAR">
          {{ isStarting ? 'Đang mở camera...' : 'Bắt đầu' }}
        </button>
      </div>

      <div v-if="hasStarted" id="ar-container" class="my-page">
        <a-scene
          ref="sceneRef"
          mindar-image="imageTargetSrc: /targets.mind; maxTrack: 1; missTolerance: 8; filterMinCF: 0.001; filterBeta: 0.01"
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          embedded
        >
          <a-assets>
            <video
              id="main-video"
              ref="videoRef"
              preload="auto"
              muted
              loop
              playsinline
              webkit-playsinline
              crossorigin="anonymous"
            ></video>
          </a-assets>

          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

          <template v-for="i in TARGET_COUNT" :key="`target-${i}`">
            <a-entity
              :mindar-image-target="`targetIndex: ${i - 1}`"
              @targetFound="() => onTargetFound(i - 1)"
              @targetLost="onTargetLost"
            >
              <a-plane
                src="#main-video"
                position="0 0 0"
                rotation="0 0 0"
                width="1"
                height="0.681"
              ></a-plane>
            </a-entity>
          </template>
        </a-scene>
      </div>

      <p v-if="errorMessage" class="ar-error">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<style scoped>

#ar-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}
.ar-immersive-mode .ar-experience {
  height: 98vh;
}
.my-page :deep(video) {
  max-width: none !important;
}

.ar-error {
  position: absolute;
  left: 50%;
  bottom: 24px;
  z-index: 2;
  transform: translateX(-50%);
  margin: 0;
  border-radius: 10px;
  padding: 12px 16px;
  background: rgba(23, 23, 23, 0.85);
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

<style>
video[autoplay][muted][playsinline] {
  max-width: none !important;
}

.ar-immersive-mode .header,
.ar-immersive-mode .footer {
  display: none !important;
}


</style>
