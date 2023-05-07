import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth.js'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/CoursesView.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/student',
      name: 'student',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'studentHome',
          component: () => import('../views/student/HomeView.vue')
        },
        {
          path: 'profile',
          name: 'studentProfile',
          component: () => import('../views/student/ProfileView.vue')
        }
      ]
    },
    {
      path: '/instructor',
      name: 'instructor',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'instructorHome',
          component: () => import('../views/instructor/HomeView.vue')
        }
      ]
    },
    {
      // not found page
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    const { token, loginModal } = storeToRefs(auth)
    if (!token.value) {
      loginModal.value = true
      return { path: from.path, query: { redirect: to.fullPath } }
    }
  }
})
export default router
