import smallImage from '@/assets/images/small_image_3.png'
import bigHeroImage from '@/assets/images/big_hero_image.png'
import avatar1 from '@/assets/images/feedback/avatar1.jpg'
import avatar2 from '@/assets/images/feedback/avatar2.jpg'
import avatar3 from '@/assets/images/feedback/avatar3.jpg'
import avatar4 from '@/assets/images/feedback/avatar4.jpg'
import avatar5 from '@/assets/images/feedback/avatar5.jpg'
import value01 from '@/assets/images/valueIcon/value_1.svg'
import value02 from '@/assets/images/valueIcon/value_2.svg'
import value03 from '@/assets/images/valueIcon/value_3.svg'
import value04 from '@/assets/images/valueIcon/value_4.svg'
import phone from '@/assets/images/phone.png'
const heroMainImage = bigHeroImage
const heroSmallImages = [
  smallImage,
  smallImage,
  smallImage
]
const productImage = 'https://www.figma.com/api/mcp/asset/4827fdfe-42fa-4356-8fb7-176396a29c63'
const guideImage = phone
const aboutImage = 'https://www.figma.com/api/mcp/asset/bef60b99-063f-4348-8f67-fc156bdec6be'
const aboutPageImage = 'https://www.figma.com/api/mcp/asset/d41456b7-464f-4c85-b8af-b4c21e72d2a7'
const featuredPageImage = 'https://www.figma.com/api/mcp/asset/a0276e73-47d1-420d-b783-1634b9deca23'
const arBackgroundImage = 'https://www.figma.com/api/mcp/asset/41a644a9-3b81-493e-9c2a-7fc3b4d7a158'
const valueIcon01 = value01
const valueIcon02 = value02
const valueIcon03 = value03
const valueIcon04 = value04

export const menuItems = [
  { key: 'home', label: 'Trang chủ', path: '/' },
  { key: 'about', label: 'Về chúng tôi', path: '/about' },
  { key: 'featured', label: 'Sản phẩm nổi bật', path: '/featured' },
  { key: 'ar', label: 'AR Camera', path: '/ar' }
]

export const guideSteps = [
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

export const productCards = Array.from({ length: 4 }).map(() => ({
  title: 'Gradient Website Development',
  image: productImage
}))

export const featuredCards = Array.from({ length: 12 }).map(() => ({
  title: 'Gradient Website Development',
  image: featuredPageImage
}))

export const testimonials = [
  {
    name: 'Nguyễn Thu Hà',
    title: 'Giáo viên Tiểu học',
    text: '“Sau khi thử nghiệm sản phẩm của Mindora trong một số tiết học khoa học, tôi nhận thấy học sinh hứng thú hơn rất nhiều so với các tiết học thông thường. Việc kết hợp mô hình gỗ với công nghệ AR giúp các em dễ dàng hình dung những kiến thức trừu tượng. Đây là một công cụ hỗ trợ giảng dạy khá hiệu quả cho giáo viên.”',
    stars: 5,
    avatar: avatar1
  },
  {
    name: 'Trần Minh Hoàng',
    title: 'Phụ huynh',
    text: '“Con tôi rất thích sản phẩm của Mindora vì vừa được chơi mô hình, vừa khám phá thêm nhiều thông tin thú vị qua ứng dụng AR. Tôi thấy cách học này giúp trẻ tiếp cận kiến thức khoa học một cách tự nhiên và không bị áp lực. Đây là một sản phẩm đáng để phụ huynh cân nhắc.”',
    stars: 5,
    avatar: avatar2
  },
  {
    name: 'Lê Phương Anh',
    title: 'Giáo viên STEM',
    text: '“Tôi thấy Mindora đã kết hợp khá sáng tạo giữa đồ chơi giáo dục truyền thống và công nghệ hiện đại. Thiết kế gỗ chắc chắn, an toàn cho trẻ em, trong khi nội dung AR lại tạo thêm sự sinh động cho hoạt động học tập. Sản phẩm phù hợp để tổ chức các hoạt động trải nghiệm và học theo nhóm.”',
    stars: 5,
    avatar: avatar3
  },
  {
    name: 'Đỗ Thảo Linh',
    title: 'Giáo viên mầm non',
    text: '“Tôi đánh giá cao tính trực quan của các sản phẩm trong việc hỗ trợ giảng dạy các nội dung khoa học cơ bản. Khi các con được quan sát mô hình và tương tác với AR, các con dễ hiểu bài hơn và chủ động đặt nhiều câu hỏi hơn trong lớp. Điều này giúp tiết học trở nên sôi động và hiệu quả.”',
    stars: 5,
    avatar: avatar4
  },
  {
    name: 'Phạm Quốc Khánh',
    title: 'Phụ huynh học sinh',
    text: '“Tôi khá ấn tượng với việc Mindora sử dụng chất liệu gỗ an toàn và thân thiện với trẻ em. Phần AR cũng được thiết kế dễ sử dụng nên trẻ có thể tự khám phá mà không gặp nhiều khó khăn. Sản phẩm vừa mang tính giáo dục vừa tạo được sự hứng thú cho trẻ trong quá trình học tập.”',
    stars: 5,
    avatar: avatar5
  }
]

export const footerContact = [
  'SacVietAR@gmail.com',
  'Số 50 ngách 59/93 Mễ Trì, Nam Từ Liêm, Hà Nội, Vietnam',
  '0869346214'
]

export const footerInfo = ['Về chúng tôi', 'Thông tin liên hệ', 'Hỗ trợ khách hàng', 'Chính sách bảo mật thông tin']

export const coreValues = [
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

export const homePageProps = {
  heroMainImage,
  heroSmallImages,
  aboutImage,
  guideImage,
  guideSteps,
  productCards,
  testimonials
}

export const aboutPageProps = {
  aboutPageImage,
  coreValues
}

export const featuredPageProps = {
  featuredCards
}

export const arPageProps = {
  arBackgroundImage
}