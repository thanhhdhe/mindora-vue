import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AboutPage from '../components/AboutPage.vue'
import FeaturedPage from '../components/FeaturedPage.vue'
import ArPage from '../components/ArPage.vue'
import { aboutPageProps, arPageProps, featuredPageProps, homePageProps } from '../data/siteContent'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    props: homePageProps,
    meta: { pageKey: 'home' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    props: aboutPageProps,
    meta: { pageKey: 'about' }
  },
  {
    path: '/featured',
    name: 'featured',
    component: FeaturedPage,
    props: featuredPageProps,
    meta: { pageKey: 'featured' }
  },
  {
    path: '/ar',
    name: 'ar',
    component: ArPage,
    props: arPageProps,
    meta: { pageKey: 'ar' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // khi back/forward
    if (savedPosition) {
      return savedPosition
    }

    // luôn scroll lên top
    return { top: 0 }
  }
})

export default router