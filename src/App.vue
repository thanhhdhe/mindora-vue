<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { footerContact, footerInfo, menuItems } from './data/siteContent'

const route = useRoute()
const router = useRouter()

const pagePathByKey = {
  home: '/',
  about: '/about',
  featured: '/featured',
  ar: '/ar'
}

const currentPage = computed(() => route.meta.pageKey ?? 'home')

const goToPage = (key) => {
  router.push(pagePathByKey[key] ?? '/')
}
</script>

<template>
  <div class="landing-page">
    <SiteHeader :menu-items="menuItems" :current-page="currentPage" @navigate="goToPage" />

    <RouterView />

    <SiteFooter :footer-contact="footerContact" :footer-info="footerInfo" />
  </div>
</template>
