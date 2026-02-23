import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    }
  ],
})

  router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('token')
    if (authRequired && !loggedIn) {
      return next('/')
    }
    next()
  })
export default router
