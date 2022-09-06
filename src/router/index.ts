import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Khai báo component
const HomePage = () => import('@/views/HomeView.vue')

// Router
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  // do something before each route
})

export default router
