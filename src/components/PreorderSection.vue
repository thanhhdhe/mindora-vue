<template>
  <section class="section-beige preorder">
    <div class="container centered-block">
      <h2><span>Đăng ký</span> PreOrder Sản phẩm</h2>
      <button class="btn btn-orange" type="button">ĐI TỚI CHECKING</button>
      <p>Hoặc điền vào mẫu thông tin dưới đây của chúng tôi</p>

      <form class="preorder-form" @submit.prevent>
        <input type="text" placeholder="Họ và tên" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Số điện thoại" />
        <textarea placeholder="Lời nhắn" rows="5"></textarea>
        <button class="btn btn-orange" type="submit">ĐĂNG KÝ NGAY</button>
      </form>
    </div>
  </section>
</template>
