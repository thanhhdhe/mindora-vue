<script setup>
import { ref } from 'vue'

defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  currentPage: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['navigate'])
const isMenuOpen = ref(false)

const navigateTo = (key) => {
  emit('navigate', key)
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <div class="brand-area">
        <button class="brand brand-btn" type="button" @click="navigateTo('home')">MINDORA</button>

        <nav class="nav header-desktop-nav">
          <button
            v-for="item in menuItems"
            :key="item.key"
            class="nav-link nav-button"
            :class="{ active: item.key === currentPage }"
            type="button"
            @click="navigateTo(item.key)"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>

      <label class="search-field header-search-desktop" for="search-input">
        <img width="16" height="16" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-search-whatsapp-flatart-icons-outline-flatarticons.png" alt="external-search-whatsapp-flatart-icons-outline-flatarticons"/>
        <input id="search-input" type="text" placeholder="Tìm kiếm" />
      </label>

      <div class="mobile-actions">
        <button class="mobile-icon-button" type="button" aria-label="Search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
          </svg>
        </button>
        <button class="mobile-icon-button" type="button" aria-label="Menu" @click="toggleMenu">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="8" y1="12" x2="20" y2="12"></line>
            <line x1="12" y1="17" x2="20" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="mobile-menu-backdrop" @click="closeMenu">
      <aside class="mobile-menu" @click.stop>
        <p class="brand mobile-brand">MINDORA</p>
        <nav class="nav">
          <button
            v-for="item in menuItems"
            :key="item.key"
            class="mobile-nav-item"
            :class="{ active: item.key === currentPage }"
            type="button"
            @click="navigateTo(item.key)"
          >
            <span>{{ item.label }}</span>
            <span v-if="item.key === currentPage" class="mobile-nav-line"></span>
          </button>
        </nav>
      </aside>
    </div>
  </header>
</template>
