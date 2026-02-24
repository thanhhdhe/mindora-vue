<script setup>
defineProps({
  footerContact: {
    type: Array,
    required: true
  },
  footerInfo: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand-col">
        <div class="brand footer-brand">MINDORA</div>
        <p>Copyright © 2020 Nexcent ltd.</p>
        <p>All rights reserved</p>
        <div class="socials">
          <span>IG</span><span>DR</span><span>TW</span><span>YT</span>
        </div>
      </div>

      <div class="footer-links-col footer-contact-col">
        <h4>Liên hệ</h4>
        <div class="footer-list">
          <a v-for="item in footerContact" :key="item" href="#">{{ item }}</a>
        </div>
      </div>

      <div class="footer-links-col footer-info-col">
        <h4>Thông tin</h4>
        <div class="footer-list">
          <a v-for="item in footerInfo" :key="item" href="#">{{ item }}</a>
        </div>
      </div>

      <div class="footer-news-col">
        <h4>Đăng ký nhận thông tin mới nhất</h4>
        <div class="newsletter-input">
          <input type="email" placeholder="Nhập email của bạn" />
          <button type="button">➤</button>
        </div>
        <button class="btn btn-orange" type="button">Đăng ký ngay</button>
      </div>
    </div>
  </footer>
</template>
