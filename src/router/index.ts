import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/student',
      name: 'student',
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
    }
  ]
})

export default router
