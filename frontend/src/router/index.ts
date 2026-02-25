import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ConsultaView from '@/views/ConsultaView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/validar/:hash',
      name: 'validar',
      component: ConsultaView,
      props: true
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Home',
          component: HomeView
        },
      ]
    }
  ],
})

  router.beforeEach((to, from, next) => {
    const publicPages = ['login', 'register', 'validar']
    const authRequired = !publicPages.includes(to.name as string)
    const loggedIn = localStorage.getItem('token')
    if (authRequired && !loggedIn ) {
      return next('/login')
    }
    next()
  })
export default router
