<template>
  <main>
    <div class="container my-20">
      <h2 class="mt-6 text-heading-3xl font-bold text-primary-5">探索課程</h2>
      <div class="w-100 flex justify-end">
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">蛋捲</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">雪酪</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">餅乾</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">冰品</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">鬆餅</span>
        <select class="border-2 border-solid border-neutral-200 outline-none">
          <option v-for="item in selectCoursesList" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="my-12">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <template v-for="item in courseList?.data" :key="item.id">
            <div class="relative">
              <span
                class="material-icons absolute right-2 top-2 z-10 cursor-pointer text-2xl text-primary-3"
                @click="handleCourseTag(item.id)"
              >
                {{ judgeTags(item.id) ? 'bookmark' : 'bookmark_border' }}
              </span>
              <router-link :to="`/course/${item.id}`">
                <div class="cursor-pointer hover:shadow hover:shadow-md hover:shadow-neutral-150">
                  <div class="overflow-hidden">
                    <img
                      class="block h-48 w-full object-cover duration-150 hover:scale-110"
                      :src="item.image_path"
                      alt=""
                    />
                  </div>
                  <div class="h-48 border border-t-0 border-solid border-neutral-150 p-3">
                    <div class="flex h-full flex-col justify-between">
                      <h3 class="text-lg font-bold text-primary-6">
                        {{ item.title }}
                      </h3>
                      <div>
                        <span class="text-sm text-neutral-800">{{ item.provider }}</span>
                        <div class="flex items-center">
                          <span class="material-icons pr-2 text-base"> watch_later </span>
                          <span class="text-sm text-neutral-800">{{ item.totalTime }}</span>
                        </div>
                        <div class="flex items-center">
                          <span class="material-icons pr-2 text-base"> person </span>
                          <span class="text-sm text-neutral-800">{{ item.buyers }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <template v-for="(star, starIndex) in 5" :key="starIndex">
                              <span class="material-icons text-lg text-primary-3">
                                {{ getStar(item.rating.avgRating, starIndex) }}
                              </span>
                            </template>
                            <span class="text-sm text-neutral-600">{{
                              `(${item.rating.countRating})`
                            }}</span>
                          </div>
                          <span class="text-lg font-bold text-primary-4"
                            >NT${{ item.originPrice }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-4 col-start-5 m-auto flex items-center">
          <div class="border" :class="currentPage - 1 <= 0 ? 'text-neutral-400' : ''">
            <span class="cursor-pointer px-2" @click="setPage(currentPage - 1)">&lt;</span>
          </div>
          <ul class="flex cursor-pointer items-center">
            <li v-for="page in courseList?.totalPages" :key="page">
              <div class="border" :class="page === currentPage ? 'bg-primary-4 text-white' : ''">
                <span class="px-2" @click="setPage(page)">{{ page }}</span>
              </div>
            </li>
          </ul>
          <div
            class="border"
            :class="currentPage + 1 >= courseList?.totalPages ? 'text-neutral-400' : ''"
          >
            <span class="cursor-pointer px-2" @click="setPage(currentPage + 1)">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { GetCoursesListRequest, GetCourseTagRequest, UseCourseTagRequest } from '@/models/course'
import useErrorHandler from '@/composables/useErrorHandler'

interface CourseList {
  page: number
  totalPages: number
  success: boolean
  data: Course[]
}

interface Course {
  id: number
  title: string
  subTittle: string
  image_path: string
  price: number
  originPrice: number
  link: string
  provider: string
  tag: string
  buyers: number
  totalTime: number
  courseStatus: string // 待修改
  type: string
  category: string // 待修改
  rating: {
    avgRating: number
    countRating: number
  }
}

const { showError } = useErrorHandler()

const auth = useAuthStore()
const { authModal, authModalType, user } = storeToRefs(auth)
const isLogin = ref(user.value !== null)

const selectCoursesList = [
  { value: '', label: '全部課程' },
  { value: 'rate', label: '最高評價' },
  { value: 'people', label: '最多人數' },
  { value: 'price', label: '最低價格' }
]

const courseList = ref<CourseList>({ page: 1, totalPages: 1, success: false, data: [] })
const currentPage = ref(1)

const getDataList = () => {
  let limit = 20
  let query = `page=${currentPage.value}&limit=${limit}`

  GetCoursesListRequest(query)
    .then((res) => {
      courseList.value = res.data
    })
    .catch((err) => {
      showError(err)
    })
}

//#region tag需整理
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
    let method = judgeTags(courseID) === true ? 'delete' : 'post'
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

//#region 星星
const getStar = (score: number, index: number) => {
  if (index + 1 <= score) {
    return 'star'
  } else {
    return 'star_border'
  }
}
//#endregion

const setPage = (page: number) => {
  if (page <= 0 || page >= courseList.value.totalPages) return
  currentPage.value = page
  getDataList()
}

const checkLogin = () => {
  if (user.value !== null) {
    isLogin.value = true
    getTagList()
  } else isLogin.value = false
}

watch(user, () => {
  checkLogin()
})

onMounted(() => {
  getDataList()
  checkLogin()
})
</script>
