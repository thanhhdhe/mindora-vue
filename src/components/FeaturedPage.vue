<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import PreorderSection from './PreorderSection.vue'

const props = defineProps({
    featuredCards: {
        type: Array,
        default: () => []
    }
})

const searchInput = ref('')
const debouncedInput = ref('')
const MIN_SEARCH_LENGTH = 2
const SEARCH_DEBOUNCE_MS = 300

let debounceTimer = null

watch(
    searchInput,
    (value) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }

        debounceTimer = setTimeout(() => {
            debouncedInput.value = value
            debounceTimer = null
        }, SEARCH_DEBOUNCE_MS)
    },
    { immediate: true }
)

onBeforeUnmount(() => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
})

const immediateQueryLength = computed(() => searchInput.value.trim().length)
const normalizedQuery = computed(() => debouncedInput.value.trim().toLowerCase())
const isSearchActive = computed(() => normalizedQuery.value.length >= MIN_SEARCH_LENGTH)
const shouldShowMinLengthHint = computed(() => immediateQueryLength.value > 0 && immediateQueryLength.value < MIN_SEARCH_LENGTH)

const clearSearch = () => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
        debounceTimer = null
    }

    searchInput.value = ''
    debouncedInput.value = ''
}

const normalize = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const filteredCards = computed(() => {
    if (!isSearchActive.value) {
        return props.featuredCards
    }

    const seen = new Set()
    const keyword = normalize(normalizedQuery.value)

    return props.featuredCards.filter((card) => {
        const title = normalize(card?.title ?? '')

        if (!title.includes(keyword)) return false
        if (seen.has(title)) return false

        seen.add(title)
        return true
    })
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

                        <input
                            id="featured-search-input"
                            v-model="searchInput"
                            type="text"
                            placeholder="Nhập tối thiểu 2 ký tự để tìm kiếm"
                        />
                    </label>
                    <button class="btn btn-orange" type="button" @click="clearSearch">Xóa lọc</button>
                </div>

                <p v-if="shouldShowMinLengthHint">Nhập tối thiểu 2 ký tự để bắt đầu tìm kiếm.</p>

                <p v-if="isSearchActive && !filteredCards.length">Không tìm thấy sản phẩm phù hợp.</p>

                <div class="featured-grid">
                    <article v-for="(card, index) in filteredCards" :key="index" class="product-card featured-card">
                        <img :src="card.image" :alt="card.title" />
                        <h3>{{ card.title }}</h3>
                    </article>
                </div>
            </div>
        </section>

        <PreorderSection />
    </main>
</template>
