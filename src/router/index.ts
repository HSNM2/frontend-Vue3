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
          path: 'courses',
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
          path: 'courses',
          name: 'instructorCourses',
          component: () => import('../views/instructor/CoursesView.vue')
        },
        {
          path: 'course/:id',
          name: 'instructorCourse',
          component: () => import('../views/instructor/course/CourseLayoutView.vue'),
          children: [
            {
              path: '',
              name: 'instructorCourseChapter',
              component: () => import('../views/instructor/course/CourseChapterView.vue')
            },
            {
              path: 'chapter/:chapterId',
              name: 'instructorCourseChapterEdit',
              component: () => import('../views/instructor/course/CourseChapterEditView.vue')
            },
            {
              path: 'students',
              name: 'instructorCourseStudent',
              component: () => import('../views/instructor/course/CourseStudentsView.vue')
            }
          ]
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
  const { user, authModal, authModalType } = storeToRefs(auth)

  if (!user.value) {
    try {
      await getUser()
    } catch (err) {
      console.log('無登入')
    }

    if (to.meta.requiresAuth && !user.value) {
      authModal.value = true
      authModalType.value = 'login'
      return { path: from.path }
    }
  }
})
export default router
