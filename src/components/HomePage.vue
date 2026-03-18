<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PreorderSection from './PreorderSection.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  heroMainImage: String,
  heroSmallImages: Array,
  aboutImage: String,
  aboutPageImage: String,
  guideImage: String,
  guideSteps: Array,
  productCards: Array,
  testimonials: Array
})

const VISIBLE_CARDS = 3

const carouselRef = ref(null)
const viewportCards = ref(VISIBLE_CARDS)
const currentIndex = ref(VISIBLE_CARDS)
const isTransitionEnabled = ref(true)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDeltaX = ref(0)
const dragPointerId = ref(null)

const visibleCards = computed(() => {
  const total = props.testimonials?.length ?? 0
  return Math.min(viewportCards.value, Math.max(total, 1))
})

const canSlide = computed(() => (props.testimonials?.length ?? 0) > visibleCards.value)

const extendedTestimonials = computed(() => {
  const items = props.testimonials ?? []
  const cloneCount = visibleCards.value

  if (!canSlide.value) {
    return items
  }

  const head = items.slice(0, cloneCount)
  const tail = items.slice(-cloneCount)

  return [...tail, ...items, ...head]
})

const dragOffsetPercent = computed(() => {
  if (!isDragging.value || !carouselRef.value) {
    return 0
  }

  return (dragDeltaX.value / carouselRef.value.clientWidth) * 100
})

const testimonialTrackStyle = computed(() => {
  const baseTranslate = -((currentIndex.value * 100) / visibleCards.value)
  const translate = baseTranslate + dragOffsetPercent.value

  return {
    transform: `translateX(${translate}%)`,
    transition: isTransitionEnabled.value && !isDragging.value ? 'transform 0.35s ease' : 'none'
  }
})

const activeDotIndex = computed(() => {
  const total = props.testimonials?.length ?? 0

  if (!total) {
    return 0
  }

  if (!canSlide.value) {
    return 0
  }

  const normalized = (currentIndex.value - visibleCards.value) % total
  return normalized < 0 ? normalized + total : normalized
})

const resetTransitionAfterJump = async () => {
  await nextTick()
  requestAnimationFrame(() => {
    isTransitionEnabled.value = true
  })
}

const goToSlide = (index) => {
  if (!canSlide.value) {
    return
  }

  isTransitionEnabled.value = true
  currentIndex.value = visibleCards.value + index
}

const goNext = () => {
  if (!canSlide.value) {
    return
  }

  isTransitionEnabled.value = true
  currentIndex.value += 1
}

const goPrev = () => {
  if (!canSlide.value) {
    return
  }

  isTransitionEnabled.value = true
  currentIndex.value -= 1
}

const onPointerDown = (event) => {
  if (!canSlide.value) {
    return
  }

  event.currentTarget.setPointerCapture(event.pointerId)
  isDragging.value = true
  dragStartX.value = event.clientX
  dragDeltaX.value = 0
  dragPointerId.value = event.pointerId
}

const onPointerMove = (event) => {
  if (!isDragging.value || dragPointerId.value !== event.pointerId) {
    return
  }

  dragDeltaX.value = event.clientX - dragStartX.value
}

const onPointerEnd = (event) => {
  if (!isDragging.value || dragPointerId.value !== event.pointerId) {
    return
  }

  const moved = dragDeltaX.value
  const threshold = 50

  isDragging.value = false
  dragPointerId.value = null
  dragDeltaX.value = 0

  if (Math.abs(moved) <= threshold) {
    return
  }

  if (moved < 0) {
    goNext()
    return
  }

  goPrev()
}

const onTrackTransitionEnd = () => {
  if (!canSlide.value) {
    return
  }

  const total = props.testimonials.length
  const cloneCount = visibleCards.value

  if (currentIndex.value >= total + cloneCount) {
    isTransitionEnabled.value = false
    currentIndex.value = cloneCount
    resetTransitionAfterJump()
    return
  }

  if (currentIndex.value < cloneCount) {
    isTransitionEnabled.value = false
    currentIndex.value = total + cloneCount - 1
    resetTransitionAfterJump()
  }
}

function goToAR() {
  router.push({ name: 'ar' })
}
function goToProducts() {
  router.push({ name: 'featured' })
}
function goToAbout() {
  router.push({ name: 'about' })
}
const updateViewportCards = () => {
  if (typeof window === 'undefined') {
    return
  }

  viewportCards.value = window.innerWidth <= 992 ? 1 : VISIBLE_CARDS
}

onMounted(() => {
  updateViewportCards()
  window.addEventListener('resize', updateViewportCards)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportCards)
})

watch(
  () => [props.testimonials?.length ?? 0, visibleCards.value],
  () => {
    isTransitionEnabled.value = false
    currentIndex.value = canSlide.value ? visibleCards.value : 0
    resetTransitionAfterJump()
  },
  { immediate: true }
)
</script>

<template>
  <main>
    <section class="hero section-beige">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1>Chơi mà học<br />Khám phá thế giới cùng <span>Mindora</span></h1>
          <p>Đồ chơi khoa học bằng gỗ giúp trẻ phát triển tư duy, sáng tạo và khám phá khoa học một cách tự nhiên.</p>
          <button class="btn btn-orange" type="button" @click="goToAR">AR Camera</button>
        </div>

        <div class="hero-gallery">
          <img v-for="(item, index) in heroSmallImages" :key="index" :src="item" alt="Gallery" />
        </div>

        <div class="hero-image-wrap">
          <img :src="heroMainImage" alt="Hero" />
        </div>
      </div>
    </section>

    <section class="section-white about">
      <div class="container centered-block">
        <h2><span>Chúng tôi</span> là ai?</h2>
        <p>
          Mindora là start-up giáo dục sáng tạo, chuyên mang đến những bộ đồ chơi gỗ cao cấp giúp trẻ 5–12 tuổi khám phá
          khoa học một cách thú vị và chủ động.
          Chúng tôi thiết kế các mô hình thu nhỏ về thiên văn, địa lý, vật lý, sinh học để trẻ tự tay lắp ráp bằng trí
          tưởng tượng và logic của mình.
        </p>
        <p>
          Tại Mindora, đồ chơi không chỉ để giải trí mà còn là công cụ khơi dậy sự tò mò, giúp trẻ học qua trải nghiệm
          thực tế thay vì chỉ nhìn màn hình.
          Chúng tôi kết hợp chất liệu gỗ tự nhiên bền vững với công nghệ hiện đại để tạo nên hành trình khám phá khoa
          học sống động.
        </p>
        <button class="btn btn-orange" type="button" @click="goToAbout">Về Mindora</button>

        <div class="about-images">
          <img :src="aboutImage" alt="About product" />
          <img :src="aboutPageImage" alt="About product" />
        </div>
      </div>
    </section>

    <section class="section-beige guide ">
      <div class="container guide-inner centered-block">
        <div class="guide-visual">
          <img :src="guideImage" alt="Guide phone" class="guide-image"/>
        </div>
        <div class="guide-content">
          <h2><span>Hướng dẫn</span> sử dụng</h2>
          <div class="guide-list">
            <article v-for="step in guideSteps" :key="step.title" class="guide-item">
              <svg class="guide-svg" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 34 34" fill="none">
                <path
                  d="M16.6667 33.3333C7.46167 33.3333 0 25.8717 0 16.6667C0 7.46167 7.46167 0 16.6667 0C25.8717 0 33.3333 7.46167 33.3333 16.6667C33.3333 25.8717 25.8717 33.3333 16.6667 33.3333ZM15.005 23.3333L26.7883 11.5483L24.4317 9.19167L15.005 18.62L10.29 13.905L7.93333 16.2617L15.005 23.3333Z"
                  fill="#FF912B" />
              </svg>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-white products">
      <div class="container centered-block">
        <h2><span>Sản phẩm</span> nổi bật</h2>
        <p>
          Sắc Việt là một start-up sáng tạo văn hóa, hướng tới tái hiện di sản phi vật thể của Việt Nam thông qua thiết
          kế đổi mới,
          kết hợp thủ công mỹ nghệ và công nghệ AR để tạo trải nghiệm giáo dục hấp dẫn.
        </p>
        <button class="btn btn-orange" type="button" @click="goToProducts">Sản phẩm AR</button>

        <div class="product-grid">
          <article v-for="(card, index) in productCards" :key="index" class="product-card">
            <img :src="card.image" :alt="card.title" />
            <h3>{{ card.title }}</h3>
          </article>
        </div>
      </div>
    </section>

    <section class="section-white customers">
      <div class="container centered-block">
        <h2><span>Khách hàng</span> của chúng tôi</h2>
        <p>
          Chúng tôi đồng hành cùng phụ huynh và nhà trường để mang trải nghiệm học tập trực quan, sinh động và dễ tiếp
          cận cho trẻ em thông qua đồ chơi khoa học tích hợp AR.
        </p>

        <div ref="carouselRef" class="testimonial-carousel" :style="{ '--visible-cards': visibleCards }"
          @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerEnd"
          @pointercancel="onPointerEnd">
          <div class="testimonial-grid" :class="{ dragging: isDragging }" :style="testimonialTrackStyle"
            @transitionend="onTrackTransitionEnd">
            <div v-for="(item, index) in extendedTestimonials" :key="`${item.name}-${index}`" class="testimonial-slide">
              <article class="testimonial-card">
                <img :src="item.avatar" :alt="item.name" class="avatar" draggable="false" />
                <div class="testimonial-group">
                  <p class="testimonial-text">{{ item.text }}</p>
                  <!-- add break line has background: #D1D5DB; -->

                  <div>
                    <div class="break-line"></div>
                    <div class="testimonial-name">{{ item.name }}</div>
                    <div v-if="item.title" class="testimonial-title">{{ item.title }}</div>
                    <div class="stars" :aria-label="`${item.stars} sao`">
                      <svg v-for="starIndex in item.stars" :key="starIndex" xmlns="http://www.w3.org/2000/svg"
                        width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden="true" class="star-icon">
                        <path
                          d="M5.74007 5.14618C5.74007 5.14618 2.56535 5.49769 0.447528 5.7327C0.256643 5.7558 0.0878601 5.88335 0.0245665 6.07719C-0.038727 6.27102 0.0245664 6.47289 0.165219 6.60044C1.73852 8.03563 4.10248 10.1849 4.10248 10.1849C4.10047 10.1849 3.45347 13.3114 3.02348 15.3973C2.98731 15.5862 3.05562 15.786 3.22039 15.9055C3.38415 16.0251 3.59513 16.0271 3.7609 15.9337C5.61349 14.8811 8.38836 13.2983 8.38836 13.2983C8.38836 13.2983 11.1642 14.8811 13.0138 15.9347C13.1826 16.0271 13.3936 16.0251 13.5573 15.9055C13.7221 15.786 13.7904 15.5862 13.7532 15.3984C13.3232 13.3114 12.6772 10.1849 12.6772 10.1849C12.6772 10.1849 15.0412 8.03563 16.6145 6.60346C16.7552 6.47189 16.8174 6.27002 16.7552 6.07719C16.6929 5.88436 16.5241 5.75681 16.3332 5.73471C14.2154 5.49769 11.0397 5.14618 11.0397 5.14618C11.0397 5.14618 9.72355 2.23563 8.84648 0.295273C8.7641 0.121524 8.5913 0 8.38836 0C8.18542 0 8.01161 0.122528 7.93325 0.295273C7.05517 2.23563 5.74007 5.14618 5.74007 5.14618Z"
                          fill="#FF912B" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="pagination-dots">
          <button v-for="(item, index) in testimonials" :key="item.name" type="button"
            :class="{ active: activeDotIndex === index }" :aria-label="`Xem đánh giá ${index + 1}`"
            @click="goToSlide(index)"></button>
        </div>
      </div>
    </section>

    <PreorderSection />
  </main>
</template>
