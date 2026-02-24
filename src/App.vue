<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import FeaturedPage from './components/FeaturedPage.vue'
import ArPage from './components/ArPage.vue'

const currentPage = ref('home')
const validPages = ['home', 'about', 'featured', 'ar']

const goToPage = (key) => {
  currentPage.value = validPages.includes(key) ? key : 'home'
}

const heroMainImage = 'https://www.figma.com/api/mcp/asset/b787c4e3-c540-4eca-a674-33745238ca8b'
const heroSmallImages = [
  'https://www.figma.com/api/mcp/asset/bef60b99-063f-4348-8f67-fc156bdec6be',
  'https://www.figma.com/api/mcp/asset/853e2bea-7f3a-4170-abb2-7889866fe2ef',
  'https://www.figma.com/api/mcp/asset/fac483ec-3699-45fd-a203-f4f05f41fd5b'
]
const productImage = 'https://www.figma.com/api/mcp/asset/4827fdfe-42fa-4356-8fb7-176396a29c63'
const guideImage = 'https://www.figma.com/api/mcp/asset/7f8abdc6-1ce3-4be2-8052-1a7a201265e8'
const aboutImage = 'https://www.figma.com/api/mcp/asset/bef60b99-063f-4348-8f67-fc156bdec6be'
const avatarImage = 'https://www.figma.com/api/mcp/asset/b76aaba8-8cf9-4e97-b4cb-1f1b551381f7'
const aboutPageImage = 'https://www.figma.com/api/mcp/asset/d41456b7-464f-4c85-b8af-b4c21e72d2a7'
const featuredPageImage = 'https://www.figma.com/api/mcp/asset/a0276e73-47d1-420d-b783-1634b9deca23'
const arBackgroundImage = 'https://www.figma.com/api/mcp/asset/41a644a9-3b81-493e-9c2a-7fc3b4d7a158'
const valueIcon01 = 'https://www.figma.com/api/mcp/asset/d33f92f2-ad56-4764-a2b7-273186b5ea6d'
const valueIcon02 = 'https://www.figma.com/api/mcp/asset/d7a03a06-0061-4aad-9cb3-f1c4d6e5b90f'
const valueIcon03 = 'https://www.figma.com/api/mcp/asset/c502c73f-4a20-416d-81e9-7ba04431ee38'
const valueIcon04 = 'https://www.figma.com/api/mcp/asset/794d4ed9-7350-4372-89ca-672fd729e8c4'

const menuItems = [
  { key: 'home', label: 'Trang chủ' },
  { key: 'about', label: 'Về chúng tôi' },
  { key: 'featured', label: 'Sản phẩm nổi bật' },
  { key: 'ar', label: 'AR Camera' }
]

const guideSteps = [
  {
    title: 'Dùng trực tiếp trên web ở điện thoại',
    text: 'Các bạn có thể truy cập vào camera AR gameplay trực tiếp trên website của chúng tôi.'
  },
  {
    title: 'Cấp quyền truy cập vào camera',
    text: 'Bật quyền camera để trải nghiệm đầy đủ tính năng AR trên trình duyệt.'
  },
  {
    title: 'Sử dụng camera vào bộ đồ chơi khoa học',
    text: 'Đưa camera tới mô hình và quét thẻ NFC để hiển thị nội dung tương tác.'
  },
  {
    title: 'Hãy đắm chìm vào trải nghiệm công nghệ tự nhiên',
    text: 'Khám phá hiện tượng khoa học chân thật được mô phỏng trực quan qua AR.'
  }
]

const productCards = Array.from({ length: 4 }).map(() => ({
  title: 'Gradient Website Development',
  image: productImage
}))

const featuredCards = Array.from({ length: 12 }).map(() => ({
  title: 'Gradient Website Development',
  image: featuredPageImage
}))

const testimonials = Array.from({ length: 3 }).map(() => ({
  name: 'Lorem Ipsum',
  text: 'Donec auctor ligula sit amet mauris tincidunt, et viverra libero congue. Morbi vehicula interdum felis, non euismod felis auctor non.',
  stars: 5
}))

const footerContact = [
  'SacVietAR@gmail.com',
  'Số 50 ngách 59/93 Mễ Trì, Nam Từ Liêm, Hà Nội, Vietnam',
  '0869346214'
]

const footerInfo = ['Về chúng tôi', 'Thông tin liên hệ', 'Hỗ trợ khách hàng', 'Chính sách bảo mật thông tin']

const coreValues = [
  {
    number: '01',
    title: 'An toàn hàng đầu',
    text: 'Gỗ tự nhiên đạt chuẩn, cạnh bo tròn, sơn nước không độc hại – người bạn an toàn cho sức khỏe bé.',
    icon: valueIcon01
  },
  {
    number: '02',
    title: 'Khuyến khích sáng tạo',
    text: 'Thiết kế mở, trẻ tự lắp ráp, giải quyết vấn đề qua các mô hình khoa học thực tế.',
    icon: valueIcon02
  },
  {
    number: '03',
    title: 'Đột phá công nghệ',
    text: 'NFC + AR biến đồ chơi gỗ thành thế giới ảo sống động, tạo trải nghiệm đa giác quan độc đáo.',
    icon: valueIcon03
  },
  {
    number: '04',
    title: 'Bền vững lâu dài',
    text: 'Chất liệu thân thiện môi trường, giá trị giáo dục kéo dài, góp phần nuôi dưỡng thế hệ biết yêu khoa học.',
    icon: valueIcon04
  }
]
</script>

<template>
  <div class="landing-page">
    <SiteHeader :menu-items="menuItems" :current-page="currentPage" @navigate="goToPage" />

    <HomePage
      v-if="currentPage === 'home'"
      :hero-main-image="heroMainImage"
      :hero-small-images="heroSmallImages"
      :about-image="aboutImage"
      :guide-image="guideImage"
      :guide-steps="guideSteps"
      :product-cards="productCards"
      :testimonials="testimonials"
      :avatar-image="avatarImage"
    />

    <AboutPage v-else-if="currentPage === 'about'" :about-page-image="aboutPageImage" :core-values="coreValues" />

    <FeaturedPage v-else-if="currentPage === 'featured'" :featured-cards="featuredCards" />

    <ArPage v-else :ar-background-image="arBackgroundImage" />

    <SiteFooter :footer-contact="footerContact" :footer-info="footerInfo" />
  </div>
</template>
