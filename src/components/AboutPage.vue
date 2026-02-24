<script setup>
import PreorderSection from './PreorderSection.vue'

defineProps({
  aboutPageImage: String,
  coreValues: Array
})
</script>

<template>
  <main>
    <section class="section-white about-page-top">
      <div class="container centered-block">
        <h2><span>Chúng tôi</span> là ai?</h2>
        <p>
          Mindora là start-up giáo dục sáng tạo, chuyên mang đến những bộ đồ chơi gỗ cao cấp giúp trẻ 5 – 15 tuổi khám phá khoa học một cách thú vị và chủ động.
          Chúng tôi thiết kế các mô hình thu nhỏ về thiên văn, địa lý, vật lý, sinh học… – trẻ tự tay lắp ráp bằng trí tưởng tượng và logic của mình.
        </p>
        <p>
          Điểm đặc biệt là chip NFC tích hợp AR: chỉ cần quét điện thoại, khối gỗ “sống dậy” thành hình ảnh 3D tương tác, biến việc chơi thành hành trình học tập sống động, đầy bất ngờ.
        </p>
        <button class="btn btn-orange" type="button">Learn More</button>

        <div class="about-images">
          <img :src="aboutPageImage" alt="About product" />
          <img :src="aboutPageImage" alt="About product" />
        </div>
      </div>
    </section>

    <section class="section-beige mission-vision">
      <div class="container centered-block mv-title-wrap">
        <h2><span>Sứ mệnh -</span> Tầm nhìn</h2>
      </div>

      <div class="container mv-row">
        <img :src="aboutPageImage" alt="Sứ mệnh" />
        <div class="mv-content">
          <h3><span>Sứ mệnh</span></h3>
          <p>
            Mindora mang đến cho trẻ những bộ đồ chơi thông minh, an toàn, giúp các em tự khám phá tri thức qua việc lắp ráp và tương tác AR.
            Chúng tôi hướng tới việc giảm thời gian dùng thiết bị điện tử, khuyến khích học tập chủ động, phát triển tư duy logic và đam mê khoa học từ sớm.
            Đồng thời, dự án hỗ trợ giáo dục bền vững bằng chất liệu thân thiện môi trường và kiến thức lâu dài.
          </p>
          <button class="btn btn-orange" type="button">Learn More</button>
        </div>
      </div>

      <div class="container mv-row reverse">
        <div class="mv-content align-right">
          <h3>Tầm nhìn</h3>
          <p>
            Chúng tôi mong muốn trở thành thương hiệu đồ chơi giáo dục tích hợp công nghệ hàng đầu tại Việt Nam trong 5 năm tới,
            mở rộng thành hệ sinh thái học tập toàn diện với đa dạng chủ đề khoa học. Mindora sẽ phủ sóng rộng rãi đến phụ huynh,
            trường học và vươn ra quốc tế.
          </p>
          <button class="btn btn-orange" type="button">Learn More</button>
        </div>
        <img :src="aboutPageImage" alt="Tầm nhìn" />
      </div>
    </section>

    <section class="section-white core-values">
      <div class="container centered-block">
        <h2><span>Giá trị</span> Cốt lõi</h2>
        <p>Mindora đặt trẻ em làm trung tâm, với cam kết mang lại trải nghiệm chơi – học cân bằng và ý nghĩa.</p>
        <div class="value-grid">
          <article v-for="item in coreValues" :key="item.number" class="value-card">
            <div class="value-number">{{ item.number }}</div>
            <div class="value-icon-wrap">
              <img :src="item.icon" :alt="item.title" class="value-icon" />
            </div>
            <div class="value-lines"><span></span><span></span></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <PreorderSection />
  </main>
</template>
