import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth.js'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

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
      path: '/course/:id',
      name: 'course',
      component: () => import('../views/CourseView.vue')
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
      component: () => import('../views/student/DashboardView.vue'),
      children: [
        {
          path: 'profile',
          name: 'studentProfile',
          component: () => import('../views/student/ProfileView.vue')
        },
        {
          path: 'profile',
          name: 'studentCourses',
          component: () => import('../views/student/CoursesView.vue')
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

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const { getUser } = auth
  const { user, loginModal } = storeToRefs(auth)

  if (!user.value) {
    try {
      await getUser()
    } catch (err) {
      console.log('無登入')
    }

    if (to.meta.requiresAuth && !user.value) {
      loginModal.value = true
      return { path: from.path }
    }
  }
})
export default router
