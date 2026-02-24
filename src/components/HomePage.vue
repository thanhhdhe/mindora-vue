<script setup>
import PreorderSection from './PreorderSection.vue'

defineProps({
  heroMainImage: String,
  heroSmallImages: Array,
  aboutImage: String,
  guideImage: String,
  guideSteps: Array,
  productCards: Array,
  testimonials: Array,
  avatarImage: String
})
</script>

<template>
  <main>
    <section class="hero section-beige">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1>Enjoy your <span>coffee</span><br />before your activity</h1>
          <p>Boost your productivity and build your mood with a glass of coffee in the morning.</p>
          <button class="btn btn-orange" type="button">Learn More</button>
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
          Mindora là start-up giáo dục sáng tạo, chuyên mang đến những bộ đồ chơi gỗ cao cấp giúp trẻ 5–15 tuổi khám phá khoa học một cách thú vị và chủ động.
          Chúng tôi thiết kế các mô hình thu nhỏ về thiên văn, địa lý, vật lý, sinh học để trẻ tự tay lắp ráp bằng trí tưởng tượng và logic của mình.
        </p>
        <p>
          Tại Mindora, đồ chơi không chỉ để giải trí mà còn là công cụ khơi dậy sự tò mò, giúp trẻ học qua trải nghiệm thực tế thay vì chỉ nhìn màn hình.
          Chúng tôi kết hợp chất liệu gỗ tự nhiên bền vững với công nghệ hiện đại để tạo nên hành trình khám phá khoa học sống động.
        </p>
        <button class="btn btn-orange" type="button">Về Mindora</button>

        <div class="about-images">
          <img :src="aboutImage" alt="About product" />
          <img :src="aboutImage" alt="About product" />
        </div>
      </div>
    </section>

    <section class="section-beige guide ">
      <div class="container guide-inner centered-block">
        <div class="guide-visual">
          <div class="phone-shell">
            <img :src="guideImage" alt="Guide phone" />
          </div>
        </div>
        <div class="guide-content">
          <h2><span>Hướng dẫn</span> sử dụng</h2>
          <div class="guide-list">
            <article v-for="step in guideSteps" :key="step.title" class="guide-item">
              <div class="check-icon">✓</div>
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
          Sắc Việt là một start-up sáng tạo văn hóa, hướng tới tái hiện di sản phi vật thể của Việt Nam thông qua thiết kế đổi mới,
          kết hợp thủ công mỹ nghệ và công nghệ AR để tạo trải nghiệm giáo dục hấp dẫn.
        </p>
        <button class="btn btn-orange" type="button">Sản phẩm AR</button>

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
          Chúng tôi đồng hành cùng phụ huynh và nhà trường để mang trải nghiệm học tập trực quan, sinh động và dễ tiếp cận cho trẻ em thông qua đồ chơi khoa học tích hợp AR.
        </p>

        <div class="testimonial-grid">
          <article v-for="(item, index) in testimonials" :key="index" class="testimonial-card">
            <img :src="avatarImage" alt="Customer" class="avatar" />
            <p class="testimonial-text">{{ item.text }}</p>
            <div class="testimonial-name">{{ item.name }}</div>
            <div class="stars">{{ '★'.repeat(item.stars) }}</div>
          </article>
        </div>
        <div class="pagination-dots">
          <span></span><span class="active"></span><span></span>
        </div>
      </div>
    </section>

    <PreorderSection />
  </main>
</template>
