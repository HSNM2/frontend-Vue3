<template>
  <main v-if="courseDetail">
    <div class="bg-paleYellow">
      <div class="md:container">
        <div class="grid grid-cols-12 px-3 py-6 lg:px-0 lg:py-[52px]">
          <div class="col-span-12 lg:col-span-6 lg:gap-x-6">
            <p class="pb-1 text-base text-neutral-800">
              {{ courseDetail.data.course.provider }}
            </p>
            <h2 class="pb-5 text-heading-3xl font-bold text-primary-6">
              {{ courseDetail.data.course.title }}
            </h2>
            <p class="pb-3 text-qa-title text-primary-6">
              {{ courseDetail.data.course.subTitle }}
            </p>
            <div class="flex gap-x-2 pb-3">
              <template
                v-for="(tag, index) in getcourseTags(courseDetail.data.course.tag)"
                :key="index"
              >
                <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">
                  {{ `#${tag}` }}
                </p>
              </template>
            </div>
            <div class="flex items-center lg:pb-3">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-lg text-primary-3">
                  {{ getStar(courseDetail.data.rating.avgRating, starIndex) }}
                </span>
              </template>
              <span class="text-sm text-neutral-600">{{
                `(${courseDetail.data.rating.countRating})`
              }}</span>
            </div>

            <p class="hidden pb-5 text-2xl font-bold text-primary-4 md:block">
              NT${{ courseDetail.data.course.price }}
            </p>
            <div class="flex items-center gap-x-5 pb-6">
              <template v-if="hasAddCart === false">
                <template v-if="isOwnedCourse === false">
                  <button
                    type="button"
                    class="btn-primary hidden md:block"
                    @click="enterOtherPage('paymentSelection')"
                  >
                    立即購買
                  </button>
                  <span
                    class="material-icons hidden cursor-pointer text-primary-6 md:block"
                    @click="handleCartAction()"
                  >
                    shopping_cart
                  </span>
                </template>
                <button
                  v-else
                  type="button"
                  class="btn-primary hidden md:block"
                  @click="enterOtherPage('learn')"
                >
                  進入課程
                </button>
              </template>
              <button
                v-else
                type="button"
                class="btn-secondary hidden md:block"
                @click="enterOtherPage('cart-step-one')"
              >
                已加入購物車
              </button>
              <span class="material-icons cursor-pointer text-primary-6"> share </span>
              <span
                class="material-icons cursor-pointer text-2xl text-primary-6"
                @click="handleCourseTag(courseDetail.data.course.id)"
              >
                {{ judgeTags(courseDetail.data.course.id) ? 'bookmark' : 'bookmark_border' }}
              </span>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6">
            <img
              class="h-52 w-full object-cover sm:h-96"
              :src="courseDetail.data.course.image_path"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="md:container">
      <div class="py-6 lg:py-[52px]">
        <div class="relative mx-[12.5px] py-3">
          <div
            class="flex justify-around gap-x-[19px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-[''] lg:justify-start"
          >
            <CourseTabs :tabs="tabs" @changeTabView="changeTabView"> </CourseTabs>
          </div>
        </div>
      </div>
      <component
        :is="currentTab"
        :isLogin="isLogin"
        :isOwnedCourse="isOwnedCourse"
        :user="user"
        :courseDetail="courseDetail"
        @update-is-response="inquiryReplyAction"
        @get-data="getData"
      ></component>
    </div>
  </main>
  <AuthModal />
  <teleport to="body">
    <div class="sticky bottom-0 z-10 w-full md:hidden">
      <div class="flex items-center justify-between gap-x-5 bg-secondary-1 px-3 py-[15px]">
        <p class="text-2xl font-bold text-primary-4">NT$23,000</p>
        <template v-if="hasAddCart === false">
          <template v-if="isOwnedCourse === false">
            <button type="button" class="btn-primary w-full px-2">立即購買</button>
            <span class="material-icons cursor-pointer text-primary-6"> shopping_cart </span>
          </template>
          <button
            v-else
            type="button"
            class="btn-primary block w-full px-2 md:hidden"
            @click="enterOtherPage('learn')"
          >
            進入課程
          </button>
        </template>
        <button v-else type="button" class="btn-primary w-full px-2">已加入購物車</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { shallowRef, ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'

import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { getStar } from '@/composables/userCourse'

import CourseTabs from '@/components/CourseTabs.vue'
import IntroduceView from '@/views/courseDtl/IntroduceView.vue'
import OutlineView from '@/views/courseDtl/OutlineView.vue'
import QAView from '@/views/courseDtl/QAView.vue'
import CommonProblemView from '@/views/courseDtl/CommonProblemView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'
import useErrorHandler from '@/composables/useErrorHandler'
import AuthModal from '@/components/AuthModal.vue'
import {
  GetCourseRequest,
  UseCourseTagRequest,
  GetCourseTagRequest,
  CheckUserHasCourseRequest
} from '@/models/course'

interface CourseDetail {
  status: boolean
  message: string
  data: CourseData
}

interface CourseData {
  course: Course
  chapters: Chapter[]
  inquiries: Inquiry[]
  faqs: Faq[]
  rating: Rating
}

interface CourseCartItem {
  id: string
  title: string
  provider: string
  category: string
  type: string
  avgRating: number
  originPrice: number
  price: number
}

interface Course {
  id: number
  price: number
  originPrice: number
  title: string
  tag: string
  image_path: string
  link: string
  subTitle: string
  description: string
  courseStatus: string // 1: 公開 / 2: 非公開
  type: string
  category: string // 待確認
  provider: string
  buyers: number
  totalTime: number // 待確認
  isPublish: boolean
  teacherId: string
  createdAt: string
  updatedAt: string
}

interface Chapter {
  id: number
  title: string
  lessons: Lesson[]
  isShow: boolean
}

interface Lesson {
  id: number
  title: string
  videoPath: string
}

interface Inquiry {
  id: string
  name: string
  date: string
  content: string
  responses: Response[]
  isResponse: boolean
  responseValue: string
}

interface Response {
  id: number
  name: string
  date: string
  content: string
}

interface Faq {
  id: string
  title: string
  questions: Question[]
  isShow: boolean
}

interface Question {
  id: number
  title: string
  content: string
  publish: boolean
}

interface Rating {
  avgRating: string
  countRating: number
  ratings: RatingItem[]
}

interface RatingItem {
  name: string
  number: string
  date: string
  content: string
}

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()
const { addCartItem, courseAddedCheck, addImmediateCourseItem } = useCartStore()
const { cart, hasAddCart } = storeToRefs(useCartStore())
const auth = useAuthStore()
const { authModal, authModalType, user } = storeToRefs(auth)
const isLogin = ref(user.value !== null)

const courseDetail = ref<CourseDetail | null>(null)
const courseCartItem = ref<CourseCartItem | any>({})
const courseID = Number(route.params.id)
const isOwnedCourse = ref(false)

const getData = () => {
  GetCourseRequest(courseID)
    .then((res) => {
      courseDetail.value = res.data
      //console.log('courseDetail', courseDetail.value)
      courseDetail.value?.data.inquiries.forEach((item) => {
        item.isResponse = false
        item.responseValue = ''
      })
      if (courseDetail.value?.data.course != undefined) {
        courseCartItem.value = {
          id: courseDetail.value?.data.course.id.toString(),
          image_path: courseDetail.value?.data.course.image_path,
          title: courseDetail.value?.data.course.title,
          provider: courseDetail.value?.data.course.provider,
          category: courseDetail.value?.data.course.category,
          type: courseDetail.value?.data.course.type,
          avgRating: +courseDetail.value!.data.rating.avgRating,
          originPrice: courseDetail.value?.data.course.originPrice,
          price: courseDetail.value?.data.course.price
        }
      }

      courseDetail.value?.data.chapters.forEach((item) => {
        item.isShow = false
      })

      courseDetail.value?.data.faqs.forEach((item) => {
        item.isShow = false
      })

      const isPublish = courseDetail.value?.data.course.isPublish
      if (isPublish === false) {
        Swal.fire({
          icon: 'error',
          title: '無此課程'
        }).then(function () {
          router.push({ path: '/courses' })
        })
      }
    })
    .catch((err) => {
      showError(err)
    })
}

const checkHasCourse = () => {
  let data = { id: courseID }
  CheckUserHasCourseRequest(data)
    .then((res) => {
      isOwnedCourse.value = res.data.isOwned
    })
    .catch((error) => {
      console.log(error)
    })
}

const enterOtherPage = (page: string) => {
  let path = ''
  if (page === 'learn') {
    path = `/learn/${courseID}`
  } else if (page === 'paymentSelection') {
    addImmediateCourseItem(courseCartItem.value)
    path = `/shoppingCart/paymentSelection`
  }
  router.push({
    path: path
  })
}

//#region 書籤 需整理
const openAuthModal = (type = 'login') => {
  authModal.value = true
  authModalType.value = type
}

const tagList = ref([])
const getTagList = () => {
  GetCourseTagRequest()
    .then((res) => {
      if (res.data.status === true) {
        tagList.value = res.data.data.split(',')
      } else {
        tagList.value = []
      }
    })
    .catch((err) => {
      showError(err)
    })
}

const handleCourseTag = (courseID: number) => {
  if (isLogin.value === false) {
    openAuthModal()
  } else {
    let method = judgeTags(courseID) ? 'delete' : 'post'
    UseCourseTagRequest(method, courseID)
      .then((res) => {
        getTagList()
      })
      .catch((err) => {
        showError(err)
      })
  }
}

const judgeTags = (courseID: number) => {
  return tagList.value.some((tag) => Number(tag) === courseID)
}
//#endregion

// #region Cart
const handleCartAction = () => {
  if (isLogin.value === false) {
    openAuthModal()
  } else {
    addCartItem(courseCartItem.value)
    getCartInfo()
  }
}

const getCartInfo = () => {
  let courseCart = localStorage.getItem('sweetTimeCart')
  if (courseCart !== null) {
    cart.value = JSON.parse(courseCart)
    courseAddedCheck(courseID.toString())
  }
}
// #endregion
const tabs = [
  { name: '課程介紹', comp: IntroduceView, style: '' },
  { name: '課程大綱', comp: OutlineView, style: '' },
  { name: '課前問答', comp: QAView, style: '' },
  { name: '常見問題', comp: CommonProblemView, style: '' },
  { name: '課程評價', comp: ReviewView, style: '' }
]

const currentTab = shallowRef(tabs[0].comp)

const changeTabView = (name: string) => {
  tabs.forEach((item) => {
    if (item.name === name) {
      currentTab.value = item.comp
    }
  })
}

const inquiryReplyAction = (id: string) => {
  courseDetail.value?.data.inquiries.forEach((item) => {
    if (item.id === id) {
      item.isResponse = true
    }
  })
}

const checkLogin = () => {
  if (user.value !== null) {
    isLogin.value = true
    getTagList()
    getCartInfo()
    checkHasCourse()
  } else isLogin.value = false
}

const getcourseTags = computed(() => {
  return (tags: string) => {
    return tags?.split(',')
  }
})

watch(user, () => {
  checkLogin()
})

onMounted(() => {
  getData()
  checkLogin()
})
</script>

<style lang="scss" scoped>
.bg-paleYellow {
  background-color: #fffaec;
}
</style>
