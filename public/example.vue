<template>
  <HeaderSection />

  <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow text-center max-w-sm">
      <h2 class="text-lg font-semibold mb-4">Trải nghiệm AR</h2>
      <p class="mb-4">Nhấn "Bắt đầu" để cho phép âm thanh và mở camera.</p>
      <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="startAR">🎬 Bắt đầu</button>
    </div>
  </div>

  <div id="ar-container" class="w-full h-screen my-page">
    <a-scene
      mindar-image="imageTargetSrc: /ar/targets.mind; maxTrack: 1"
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
      embedded
    >
      <a-assets>
        <video
          id="main-video"
          preload="auto"
          muted
          loop
          playsinline
          webkit-playsinline
          crossorigin="anonymous"
        ></video>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <template v-for="i in 20" :key="`target-${i}`">
        <a-entity
          :mindar-image-target="`targetIndex: ${i - 1}`"
          @targetFound="() => onTargetFound(i + 5)"
          @targetLost="onTargetLost"
        >
          <a-plane
            id="video-plane"
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
</template>


<script setup>
import HeaderSection from '../components/HeaderSection.vue'
import { ref } from 'vue'

const showPopup = ref(true)
const userInteracted = ref(false)

function startAR() {
  userInteracted.value = true
  showPopup.value = false

  // iOS Safari cần load trước video
  const video = document.getElementById('main-video')
  if (video) {
    video.load()
  }
}

function onTargetFound(index) {
  const video = document.getElementById('main-video')
  if (!video) return

  const newSrc = `/ar/${index}.mp4`
  if (video.src !== location.origin + newSrc) {
    video.pause()
    video.removeAttribute('src') // reset src
    video.load()

    video.setAttribute('src', newSrc)
    video.load()

    // Đợi video ready rồi mới play
    const playWhenReady = () => {
      video.play().then(() => {
        if (userInteracted.value) {
          video.muted = false
          video.volume = 1
        }
      }).catch((err) => {
        console.warn(`Autoplay error:`, err)
      })
    }

    video.addEventListener('canplay', playWhenReady, { once: true })
  } else {
    video.play()
  }
}


function onTargetLost() {
  const video = document.getElementById('main-video')
  if (video) {
    video.pause()
    video.currentTime = 0
  }
}
</script>


<style scoped>
#ar-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
}

.my-page video {
  max-width: none !important;
}
</style>

<style>
video[autoplay][muted][playsinline] {
  max-width: none !important;
}
</style>
