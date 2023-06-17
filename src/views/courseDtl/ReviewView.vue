<template>
  <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
    <div
      class="col-span-12"
      :class="$route.name === 'course' ? 'lg:col-span-3 lg:col-start-10' : ''"
    >
      <div class="rounded-2.5xl border border-neutral-200 px-[38px] py-5 lg:px-4">
        <div class="flex items-center justify-center gap-x-1.5">
          <span class="material-icons text-4xl text-primary-3"> star </span>
          <p class="text-xl font-bold">{{ ratingDataList.avgRating }}</p>
          <p class="text-base text-neutral-600">/5.0({{ ratingDataList.countRating }}則評價)</p>
        </div>
        <div class="my-4">
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-base text-primary-3">
                  {{ getStar('5', starIndex) }}
                </span>
              </template>
            </div>
            <ProgressBar
              :currentVal="progressValForFive"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-base text-primary-3">
                  {{ getStar('4', starIndex) }}
                </span>
              </template>
            </div>
            <ProgressBar
              :currentVal="progressValForFour"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-base text-primary-3">
                  {{ getStar('3', starIndex) }}
                </span>
              </template>
            </div>
            <ProgressBar
              :currentVal="progressValForThree"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-base text-primary-3">
                  {{ getStar('2', starIndex) }}
                </span>
              </template>
            </div>
            <ProgressBar
              :currentVal="progressValForTwo"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <template v-for="(star, starIndex) in 5" :key="starIndex">
                <span class="material-icons text-base text-primary-3">
                  {{ getStar('1', starIndex) }}
                </span>
              </template>
            </div>
            <ProgressBar
              :currentVal="progressValForOne"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
        </div>
        <button
          v-if="(isLogin === true && isOwnedCourse === true) || $route.name === 'learn'"
          type="button"
          class="btn-primary mx-auto block px-4"
          @click="isShowModal = true"
        >
          對課程有心得？ 開始評價
        </button>
      </div>
    </div>

    <div
      class="col-span-12"
      :class="$route.name === 'course' ? 'lg:col-span-9 lg:row-start-1' : ''"
    >
      <template v-for="(item, index) in ratingDataList.ratings" :key="index">
        <div class="mb-4 rounded-2.5xl border border-secondary-2 p-5">
          <div
            class="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0"
          >
            <div class="flex items-center gap-x-4">
              <img class="h-10 w-10 rounded-full" :src="getAvatar(item.imagePath)" alt="" />
              <p class="">{{ item.nickName === '' ? item.name : item.nickName }}</p>
            </div>
            <div class="flex items-center justify-between md:gap-x-4">
              <div class="flex items-center">
                <template v-for="(star, starIndex) in 5" :key="starIndex">
                  <span class="material-icons text-lg text-primary-3">
                    {{ getStar(item.score, starIndex) }}
                  </span>
                </template>
              </div>
              <p class="text-sm text-primary-4">{{ item.date.slice(0, 10) }}</p>
            </div>
          </div>
          <div class="mt-4 md:ml-14">
            <p>
              {{ item.content }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
  <ReviewModal
    v-if="isShowModal"
    :tempRating="rating"
    @save-action="saveAction"
    @close-modal="isShowModal = false"
  ></ReviewModal>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import ProgressBar from '@/components/ProgressBar.vue'
import ReviewModal from '@/components/ReviewModal.vue'
import { RatingRequest, GetRatingsRequest } from '@/models/course'
import useErrorHandler from '@/composables/useErrorHandler'

interface Rating {
  name: string
  score: string
  nickName: string
  imagePath: string
  date: string
  content: string
}

interface RatingDataList {
  ratings: Rating[]
  avgRating: string
  countRating: number
  star1Count: number
  star2Count: number
  star3Count: number
  star4Count: number
  star5Count: number
}

const route = useRoute()

const { showError } = useErrorHandler()

const emit = defineEmits(['update-is-response', 'get-data', 'update-video-path'])
const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  },
  isOwnedCourse: {
    type: Boolean,
    required: false
  },
  user: {
    type: Object
  },
  courseDetail: {
    type: Object,
    required: true
  }
})

const ratingDataList = ref<RatingDataList | any>({})

//#region 進度條
const getProgressVal = (count: number) => {
  return (count / ratingDataList.value.countRating) * 100
}
const minVal = ref(0)
const maxVal = ref(100)
const progressValForFive = ref(0)
const progressValForFour = ref(0)
const progressValForThree = ref(0)
const progressValForTwo = ref(0)
const progressValForOne = ref(0)
const progressBarStyle = { bg: 'bg-neutral-150', progress: 'bg-neutral-500', height: 'h-1' }
//#endregion 進度條
const isShowModal = ref(false)
const courseID = Number(route.params.id)
const rating = ref({ content: '', score: 5 })

const getRatingInfo = () => {
  GetRatingsRequest(courseID)
    .then((res) => {
      ratingDataList.value = res.data
      progressValForFive.value = getProgressVal(ratingDataList.value.star5Count)
      progressValForFour.value = getProgressVal(ratingDataList.value.star4Count)
      progressValForThree.value = getProgressVal(ratingDataList.value.star3Count)
      progressValForTwo.value = getProgressVal(ratingDataList.value.star2Count)
      progressValForOne.value = getProgressVal(ratingDataList.value.star1Count)
    })
    .catch((err) => {
      showError(err)
    })
}

const isRating = ref(false)
const getUserRatingRecord = () => {
  if (props.isLogin === true) {
    RatingRequest('get', courseID)
      .then((res) => {
        if (res.data.message !== '使用者尚未評價該課程') {
          isRating.value = true
          rating.value = res.data.data
          rating.value.score = Number(rating.value.score)
        }
      })
      .catch((err) => {
        showError(err)
      })
  }
}

const saveAction = (rating: Object) => {
  let method = 'post'
  if (isRating.value === true) method = 'patch'
  RatingRequest(method, courseID, rating)
    .then((res) => {
      isShowModal.value = false
      getRatingInfo()
      getUserRatingRecord()
      emit('get-data')
    })
    .catch((err) => {
      showError(err)
    })
}

//#region 星星
const getStar = (score: string, index: number) => {
  let rate = Number(score)
  if (index + 1 <= rate) {
    return 'star'
  } else {
    return 'star_border'
  }
}
//#endregion

//#region 大頭照
const getAvatar = (imagePath: string) => {
  let str = imagePath.slice(-4)
  if (str === 'null') {
    return 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
  } else {
    return imagePath
  }
}
//#endregion
onMounted(() => {
  getRatingInfo()
  getUserRatingRecord()
})
</script>
<style lang=""></style>
