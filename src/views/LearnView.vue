<template>
  <main>
    <div class="container">
      <div class="mt-6 md:mt-[52px]">
        <div class="flex justify-between gap-x-4 md:items-center">
          <div>
            <p class="text-base text-neutral-800">王小明</p>
            <h2 class="text-heading-3xl text-primary-6">法式馬卡龍的製作與口感掌控</h2>
          </div>
          <div class="md:hidden">
            <button class="btn-back-round">
              <img class="m-auto block" src="/image/undo.png" alt="" />
            </button>
          </div>

          <div class="hidden md:block">
            <button class="btn-back flex items-center gap-x-2">
              <img class="" src="/image/undo.png" alt="" />
              返回
            </button>
          </div>
        </div>

        <div class="my-6 grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-8" v-if="isPlayerReady">
            <video-player
              class="video-player"
              poster="https://picsum.photos/856/472"
              crossorigin="anonymous"
              playsinline
              controls
              :volume="0.6"
              :playback-rates="[0.7, 1.0, 1.5, 2.0]"
              :fluid="true"
              :durationDisplay="true"
              :options="playerOptions"
              @mounted="handleMounted"
              @ready="handleEvent($event, 'ready')"
              @play="handleEvent($event, 'play')"
              @pause="handleEvent($event, 'pause')"
              @ended="handleEvent($event, 'ended')"
              @loadeddata="handleEvent($event, 'loadeddata')"
              @waiting="handleEvent($event, 'waiting')"
              @playing="handleEvent($event, 'playing')"
              @canplay="handleEvent($event, 'canplay')"
              @canplaythrough="handleEvent($event, 'canplaythrough')"
              @timeupdate="handleEvent(player?.currentTime(), 'timeupdate')"
            />
            <!-- <video-player
              ref="videoPlayer"
              class="video-player"
              :options="playerOptions"
              :playsinline="true"
              @mounted="handleMounted"
              @ready="handleEvent($event, 'ready')"
              @play="handleEvent($event, 'play')"
              @pause="handleEvent($event, 'pause')"
              @ended="handleEvent($event, 'ended')"
              @loadeddata="handleEvent($event, 'loadeddata')"
              @waiting="handleEvent($event, 'waiting')"
              @playing="handleEvent($event, 'playing')"
              @canplay="handleEvent($event, 'canplay')"
              @canplaythrough="handleEvent($event, 'canplaythrough')"
              @timeupdate="handleEvent(player?.currentTime(), 'timeupdate')"
            /> -->

            <div class="mt-6 border border-neutral-200 p-3">
              <div class="flex items-center gap-x-4">
                <span>目前進度</span>
                <ProgressBar
                  :currentVal="progressVal"
                  :minVal="minVal"
                  :maxVal="maxVal"
                  :style="progressBarStyle"
                  v-slot="{ percent }"
                >
                  {{ percent + '%' }}
                </ProgressBar>

                <button
                  type="button"
                  class="hidden rounded-2xl border border-secondary-2 px-6 py-1 lg:block"
                  @click="scrollToTabs('課程討論')"
                >
                  <span class="material-icons pr-1 text-base text-secondary-2">
                    import_contacts
                  </span>
                  課程討論
                </button>
                <button
                  type="button"
                  class="hidden rounded-2xl border border-primary-3 px-6 py-1 lg:block"
                  @click="scrollToTabs('課程評價')"
                >
                  <span class="material-icons pr-1 text-base text-primary-3"> star </span>
                  課程評價
                </button>
              </div>
            </div>

            <div ref="tabsElement">
              <div class="relative mb-4 pb-3 pt-[52px]">
                <div
                  class="flex justify-around gap-x-[19px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-[''] lg:justify-start"
                >
                  <CourseTabs :tabs="tabs" @changeTabView="changeTabView" ref="tabsCompRef">
                  </CourseTabs>
                </div>
              </div>

              <component
                :is="currentTab"
                :courseDetail="courseDetail?.data"
                @update-video-path="updateVideoPath"
              ></component>
            </div>
          </div>

          <div class="hidden lg:col-start-9 lg:col-end-13 lg:block">
            <ChapterView v-if="courseDetail" :courseDetail="courseDetail?.data"></ChapterView>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { shallowRef, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import ProgressBar from '@/components/ProgressBar.vue'
import CourseTabs from '@/components/CourseTabs.vue'
import ChapterView from '@/views/courseDtl/ChapterView.vue'
import DiscussView from '@/views/courseDtl/DiscussView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'
import useErrorHandler from '@/composables/useErrorHandler'

import { GetCourseRequest } from '@/models/course'

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

const { showError } = useErrorHandler()

const courseDetail = ref<CourseDetail | null>(null)
const courseID = Number(route.params.id)

const getData = () => {
  GetCourseRequest(courseID)
    .then((res) => {
      courseDetail.value = res.data
      console.log('courseDetail', courseDetail.value)
    })
    .catch((err) => {
      showError(err)
    })
}

//#region 影片
const isPlayerReady = ref(false)
const player = shallowRef()

const handleMounted = (payload: any) => {
  player.value = payload.player
  console.log('Basic player mounted', payload)
}

const handleEvent = (log: object, action: string) => {
  console.log(`Basic player event  ${action}`, log)
}

const playerOptions = ref({
  sources: [
    {
      type: 'video/mp4',
      src: ''
    }
  ],
  fluid: true,
  controls: true
})

const updateVideoPath = (videoPath: string) => {
  playerOptions.value.sources[0].src = videoPath
  console.log(playerOptions.value.sources[0].src)
}

watch(courseDetail, (newValue) => {
  if (newValue?.data.chapters[0].lessons[0].videoPath) {
    isPlayerReady.value = true
    playerOptions.value.sources[0].src = newValue?.data.chapters[0].lessons[0].videoPath
  }
})

//#endregion

const minVal = ref(0)
const maxVal = ref(100)
const progressVal = ref(15)
const progressBarStyle = { bg: 'bg-neutral-100', progress: 'bg-secondary-2', height: 'h-2' }

//#region
const tabs = [
  { name: '課程內容', comp: ChapterView, style: 'lg:hidden' },
  { name: '課程討論', comp: DiscussView, style: '' },
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
  tabs.forEach((item) => {
    if (item.name === name) {
      currentTab.value = item.comp
    }
  })
}
//#endregion

onMounted(() => {
  changeTabView('課程討論')
  getData()
})
</script>

<style lang="scss" scoped></style>
