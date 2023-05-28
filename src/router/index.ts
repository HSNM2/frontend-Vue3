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
      path: '/learn/:id',
      name: 'learn',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/LearnView.vue')
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
        requiresAuth: true,
        isInstructor: true
      },
      children: [
        {
          path: 'courses',
          name: 'instructorCourses',
          component: () => import('../views/instructor/CoursesView.vue')
        },
        {
          path: 'course/:courseId',
          name: 'instructorCourse',
          component: () => import('../views/instructor/course/CourseLayoutView.vue'),
          children: [
            {
              path: '',
              name: 'instructorCourseChapter',
              component: () => import('../views/instructor/course/CourseChapterView.vue')
            },
            {
              path: 'chapter/:chapterId/lesson/:lessonId?',
              name: 'instructorCourseLesson',
              component: () => import('../views/instructor/course/CourseLessonView.vue')
            },
            {
              path: 'students',
              name: 'instructorCourseStudents',
              component: () => import('../views/instructor/course/CourseStudentsView.vue')
            },
            {
              path: 'info',
              name: 'instructorCourseInfo',
              component: () => import('../views/instructor/course/CourseInfoView.vue')
            },
            {
              path: 'faq',
              name: 'instructorCourseFAQ',
              component: () => import('../views/instructor/course/CourseFAQEditView.vue')
            },
            {
              path: 'setting',
              name: 'instructorCourseSetting',
              component: () => import('../views/instructor/course/CourseSettingView.vue')
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
  }

  if (!user.value) {
    if (to.meta.requiresAuth) {
      // 無登入狀態
      authModal.value = true
      authModalType.value = 'login'
      return { path: from.path }
    }
  } else {
    if (to.meta.isInstructor && (!user.value.identity || user.value.identity !== '[1]')) {
      // 無開課權限
      Swal.fire({
        icon: 'warning',
        title: '尚無開啟開課功能'
      })
      return { path: from.path }
    }
  }
})
export default router
