<script setup>
defineProps({
  arBackgroundImage: String
})
</script>

<template>
  <main>
    <section class="ar-experience">
      <img class="ar-bg" :src="arBackgroundImage" alt="AR Background" />
      <div class="ar-overlay"></div>

      <div class="ar-modal">
        <h2>Trải nghiệm AR</h2>
        <p>Nhấn "Bắt đầu" để cho phép âm thanh và mở camera.</p>
        <button class="btn btn-orange" type="button">Bắt đầu</button>
      </div>
    </section>
  </main>
</template>
