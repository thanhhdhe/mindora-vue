<script setup>
import PreorderSection from './PreorderSection.vue'

defineProps({
    featuredCards: Array
})
</script>

<template>
    <main>
        <section class="section-white featured-page">
            <div class="container centered-block">
                <h2><span>Sản phẩm</span> nổi bật</h2>
                <p>
                    Sắc Việt là một start-up sáng tạo văn hóa, hướng tới tái hiện di sản phi vật thể của Việt Nam thông
                    qua thiết kế đổi mới.
                    Chúng tôi chuyên sản xuất tranh gỗ 3D lấy cảm hứng từ các loại hình nghệ thuật diễn xướng truyền
                    thống như Chèo, Tuồng,
                    Cải lương, Quan họ, Hát Xoan...
                </p>

                <div class="featured-tools">
                    <label class="search-field featured-search" for="featured-search-input">
                        <img width="16" height="16"
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-search-whatsapp-flatart-icons-outline-flatarticons.png"
                            alt="external-search-whatsapp-flatart-icons-outline-flatarticons" />

                        <input id="featured-search-input" type="text" placeholder="Tìm kiếm sản phẩm tại đây" />
                    </label>
                    <button class="btn btn-orange" type="button">Tìm kiếm</button>
                </div>

                <div class="featured-grid">
                    <article v-for="(card, index) in featuredCards" :key="index" class="product-card featured-card">
                        <img :src="card.image" :alt="card.title" />
                        <h3>{{ card.title }}</h3>
                    </article>
                </div>
            </div>
        </section>

        <PreorderSection />
    </main>
</template>
