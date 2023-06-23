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
                v-for="(tag, index) in getCourseTagsText(courseDetail.data.course.tag)"
                :key="index"
              >
                <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">
                  {{ `#${tag}` }}
                </p>
              </template>
            </div>
            <div class="flex items-center lg:pb-3">
              <template v-if="ratingData">
                <template v-for="(star, starIndex) in 5" :key="starIndex">
                  <span class="material-icons text-lg text-primary-3">
                    {{ getStar(ratingData.rating.avgRating, starIndex) }}
                  </span>
                </template>
                <span class="text-sm text-neutral-600">
                  {{ `(${ratingData.rating.countRating})` }}
                </span>
              </template>
            </div>
            <div class="hidden pb-5 md:block">
              <div class="flex items-center gap-x-2">
                <p class="text-2xl font-bold text-primary-4">
                  NT${{ courseDetail.data.course.price }}
                </p>
                <p class="text-sm font-bold text-neutral-400 line-through">
                  NT${{ courseDetail.data.course.originPrice }}
                </p>
              </div>
            </div>
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
                @click="enterOtherPage('orderConfirmation')"
              >
                已加入購物車
              </button>
              <span class="material-icons cursor-pointer text-primary-6"> share </span>
              <span
                class="material-icons cursor-pointer text-2xl text-primary-6"
                @click="courseTagAction(courseDetail.data.course.id)"
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

    <div ref="tabsElement">
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
          :courseID="courseID"
          @get-data="getData"
        ></component>
      </div>
    </div>
    <div class="fixed bottom-0 z-10 w-full md:hidden">
      <div class="flex items-center justify-between gap-x-5 bg-secondary-1 px-3 py-[15px]">
        <div class="flex items-center gap-x-2">
          <p class="text-2xl font-bold text-primary-4">NT${{ courseDetail.data.course.price }}</p>
          <p class="text-sm font-bold text-neutral-400 line-through">
            NT${{ courseDetail.data.course.originPrice }}
          </p>
        </div>
        <template v-if="hasAddCart === false">
          <template v-if="isOwnedCourse === false">
            <button
              type="button"
              class="btn-primary w-full px-2"
              @click="enterOtherPage('paymentSelection')"
            >
              立即購買
            </button>
            <span class="material-icons cursor-pointer text-primary-6" @click="handleCartAction()">
              shopping_cart
            </span>
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
        <button
          v-else
          type="button"
          class="btn-primary w-full px-2"
          @click="enterOtherPage('orderConfirmation')"
        >
          已加入購物車
        </button>
      </div>
    </div>
  </main>
  <AuthModal />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { shallowRef, ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { useStatusStore } from '@/stores/status'
import { useCartStore } from '@/stores/cart'
import { useTagStore } from '@/stores/tag'
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
  GetCourseRatingRequest,
  UseCourseTagRequest,
  GetCourseTagRequest,
  CheckUserHasCourseRequest
} from '@/models/course'

interface Course {
  id: number
  price: number
  originPrice: number
  title: string
  tag: string
  image_path: string
  link: string | null
  subTitle: string
  description: string
  courseStatus: string
  type: string
  category: string
  provider: string
  buyers: null
  totalTime: null
  isPublish: boolean
  teacherId: string
  createdAt: string
  updatedAt: string
}

interface Rating {
  avgRating: string
  countRating: number
  ratings: RatingEntry[]
  star1Count: number
  star2Count: number
  star3Count: number
  star4Count: number
  star5Count: number
}

interface RatingEntry {
  name: string
  score: string
  nickName: string
  imagePath: string
  date: string
  content: string
}

interface CourseResponse {
  status: boolean
  message: string
  data: {
    course: Course
  }
}

interface RatingResponse {
  status: number
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

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()
const { addCartItem, courseAddedCheck, addImmediateCourseItem } = useCartStore()
const { cart, hasAddCart, isImmediateCheckout } = storeToRefs(useCartStore())
const status = useStatusStore()
const { updateLoading } = status
const auth = useAuthStore()
const { authModal, authModalType, user } = storeToRefs(auth)
const isLogin = ref(user.value !== null)

const tag = useTagStore()
const { tagList } = storeToRefs(tag)
const { getTagList, handleCourseTag, judgeTags } = tag

const courseDetail = ref<CourseResponse | null>(null)
const ratingData = ref<RatingResponse | null>(null)
const courseCartItem = ref<CourseCartItem | any>({})
const courseID = Number(route.params.id)
const isOwnedCourse = ref(false)

const getData = () => {
  updateLoading(true)
  GetCourseRequest(courseID)
    .then((res) => {
      getRating()
      courseDetail.value = res.data
      if (courseDetail.value?.data.course != undefined) {
        courseCartItem.value = {
          id: courseDetail.value?.data.course.id.toString(),
          image_path: courseDetail.value?.data.course.image_path,
          title: courseDetail.value?.data.course.title,
          provider: courseDetail.value?.data.course.provider,
          category: courseDetail.value?.data.course.category,
          type: courseDetail.value?.data.course.type,
          originPrice: courseDetail.value?.data.course.originPrice,
          price: courseDetail.value?.data.course.price
        }
      }
      setTimeout(() => {
        updateLoading(false)
      }, 500)
    })
    .catch((err) => {
      updateLoading(false)
      showError(err).finally(function () {
        router.push({ path: '/courses' })
      })
    })
}

const getRating = () => {
  GetCourseRatingRequest(courseID)
    .then((res) => {
      ratingData.value = res.data
      if (courseDetail.value?.data.course != undefined) {
        courseCartItem.value.avgRating = +ratingData.value!.rating.avgRating
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
    .catch((err) => {
      showError(err)
    })
}

const enterOtherPage = (page: string) => {
  if (page === 'paymentSelection' && isLogin.value === false) {
    openAuthModal()
  } else {
    let path = ''
    if (page === 'learn') {
      path = `/learn/${courseID}`
    } else if (page === 'paymentSelection') {
      isImmediateCheckout.value = true
      addImmediateCourseItem(courseCartItem.value)
      path = `/shoppingCart/paymentSelection`
    } else if (page === 'orderConfirmation') {
      path = `/shoppingCart/orderConfirmation`
    }
    router.push({
      path: path
    })
  }
}

const openAuthModal = (type = 'login') => {
  authModal.value = true
  authModalType.value = type
}

const courseTagAction = (courseID: number) => {
  if (isLogin.value === false) {
    openAuthModal()
  } else {
    handleCourseTag(courseID)
  }
}

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
const tabsElement = ref<null | HTMLDivElement>(null)
const tabsCompRef: Ref<null | typeof CourseTabs> = ref(null)
const scrollToTabs = (tabName: string) => {
  if (tabsElement.value) {
    tabsElement.value.scrollIntoView({ behavior: 'smooth' })
    tabsCompRef.value?.changeTabAction(tabName)
  }
}

const changeTabView = (name: string) => {
  updateLoading(true)
  tabs.forEach((item) => {
    if (item.name === name) {
      currentTab.value = item.comp
      scrollToTabs(name)
      setTimeout(() => {
        updateLoading(false)
      }, 500)
    }
  })
}

const checkLogin = () => {
  if (user.value !== null) {
    isLogin.value = true
    getTagList()
    getCartInfo()
    checkHasCourse()
  } else {
    isLogin.value = false
    tagList.value = []
  }
}

const getCourseTagsText = computed(() => {
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
