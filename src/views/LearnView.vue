<template>
  <main>
    <div class="container">
      <div class="mt-6 md:mt-[52px]">
        <div class="grid grid-cols-12">
          <div class="col-span-12 lg:col-span-8">
            <!-- <p class="text-base text-neutral-800">王小明</p> -->
            <div class="flex items-start justify-between gap-x-2">
              <h2 class="text-heading-3xl text-primary-6">
                {{ courseDetail?.data[0].title }}
              </h2>
              <div class="lg:hidden">
                <router-link :to="`/course/${$route.params.id}`">
                  <button type="button" class="btn-back-round">
                    <img class="m-auto block" src="/image/undo.png" alt="" />
                  </button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden lg:col-span-4 lg:block">
            <router-link :to="`/course/${$route.params.id}`">
              <button type="button" class="btn-back ms-auto flex w-36 items-center gap-x-2">
                <img class="" src="/image/undo.png" alt="" />
                返回
              </button>
            </router-link>
          </div>
        </div>

        <div class="my-6 grid grid-cols-12 gap-6">
          <div class="relative col-span-12 lg:col-span-8" v-if="isPlayerReady">
            <div class="relative">
              <VLoading v-model:active="isLoading" :is-full-page="false" />
              <video-player
                ref="videoPlayer"
                class="video-player h-48 w-full md:h-96"
                :options="playerOptions"
                :playsinline="true"
                crossorigin="anonymous"
                @mounted="handleMounted"
                @ready="playerReadied"
                @play="handleEvent($event, 'play')"
                @pause="handlePause($event, 'pause')"
                @ended="handleEvent($event, 'ended')"
                @loadeddata="handleEvent($event, 'loadeddata')"
                @waiting="handleEvent($event, 'waiting')"
                @playing="handleEvent($event, 'playing')"
                @canplay="handleEvent($event, 'canplay')"
                @canplaythrough="handleEvent($event, 'canplaythrough')"
                @timeupdate="handleTime(player?.currentTime(), player?.currentSrc(), 'timeupdate')"
              />
            </div>

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
                :isLogin="true"
                :user="user ? user : {}"
                :courseDetail="courseDetail?.data[0]"
                @update-video-path="updateVideoPath"
              ></component>
            </div>
          </div>

          <div class="hidden lg:col-start-9 lg:col-end-13 lg:block lg:h-full">
            <ChapterView
              v-if="courseDetail"
              :courseDetail="courseDetail?.data[0]"
              @update-video-path="updateVideoPath"
            ></ChapterView>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { shallowRef, ref, triggerRef, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import Swal from 'sweetalert2'

import { useAuthStore } from '@/stores/auth'
import { useStatusStore } from '@/stores/status'
import ProgressBar from '@/components/ProgressBar.vue'
import CourseTabs from '@/components/CourseTabs.vue'
import ChapterView from '@/views/courseDtl/ChapterView.vue'
import DiscussView from '@/views/courseDtl/DiscussView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'
import useErrorHandler from '@/composables/useErrorHandler'

import {
  GetCourseIsExistRequest,
  GetUserCourseRequest,
  CheckUserHasCourseRequest
} from '@/models/course'

interface CourseDetail {
  status: boolean
  data: CourseData[]
}

interface CourseData {
  id: number
  title: string
  chapters: Chapter[]
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
  isPlay: boolean
}

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()

const status = useStatusStore()
const { updateLoading } = status
const auth = useAuthStore()
const { user } = storeToRefs(auth)

const isLoading = ref(false)
const courseDetail = ref<CourseDetail | null>(null)
const courseID = Number(route.params.id)
const minVal = ref(0)
const maxVal = ref(100)
const progressVal = ref(0)
const progressBarStyle = { bg: 'bg-neutral-100', progress: 'bg-secondary-2', height: 'h-2' }

const getCourseIsExist = () => {
  const data = { courseId: courseID }
  GetCourseIsExistRequest(data)
    .then((res) => {
      if (res.data.isPublish === true) {
        checkHasCourse()
      } else {
        return Swal.fire({
          icon: 'error',
          title: '未有此課程'
        }).finally(function () {
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
      if (res.data.isOwned === false) {
        Swal.fire({
          icon: 'error',
          title: '尚未購買此課程'
        }).then(function () {
          router.push({ path: `/course/${courseID}` })
        })
      } else {
        getData()
      }
    })
    .catch((err) => {
      showError(err)
    })
}

const getData = () => {
  updateLoading(true)
  GetUserCourseRequest(courseID)
    .then((res) => {
      courseDetail.value = res.data
      courseDetail.value?.data[0].chapters.forEach((chapter) => {
        chapter.isShow = false
        chapter.lessons.forEach((lesson) => {
          lesson.isPlay = false
        })
      })
      setTimeout(() => {
        updateLoading(false)
      }, 500)
    })
    .catch((err) => {
      showError(err)
    })
}

//#region 影片
const isPlayerReady = ref(false)
const player = shallowRef()
const durations = ref(0)

const handleMounted = (payload: any) => {
  player.value = payload.player
  //console.log('Basic player mounted', payload)
}

const handleEvent = (log: object, action: string) => {
  //console.log(`Basic player event  ${action}`, log)
}

const handlePause = (log: object, action: string) => {
  //console.log(log)
  //console.log(`Basic player event  ${action}`, log)
}

const handleTime = (time: number, src: string, action: string) => {
  durations.value = time
  // player?.currentSrc()
  //console.log(` ${action}`, time, src)
}

const playerReadied = (player: object) => {
  //console.log(player)
  //player.currentTime(durations.value)
}

const playerOptions = shallowRef({
  crossorigin: 'anonymous',
  sources: [
    {
      duration: 24,
      type: 'video/mp4',
      src: ''
    }
  ],
  fluid: true,
  controls: true,
  //poster: 'https://picsum.photos/856/472'
  controlBar: {
    timeDivider: true, // 当前时间和持续时间的分隔符
    durationDisplay: true, // 显示持续时间
    remainingTimeDisplay: false // 是否显示剩余时间功能
    //fullscreenToggle: true // 是否显示全屏按钮
  }
})

const updateVideoPath = (videoPath: string, chapterID: number, lessonID: number) => {
  isPlayerReady.value = false
  isLoading.value = true
  playerOptions.value.sources[0].src = videoPath
  triggerRef(playerOptions)
  courseDetail.value?.data[0].chapters.forEach((chapter) => {
    if (chapter.id === chapterID) {
      chapter.lessons.forEach((lesson) => {
        if (lesson.id === lessonID) {
          lesson.isPlay = true
        } else {
          lesson.isPlay = false
        }
      })
    } else {
      chapter.lessons.forEach((lesson) => {
        lesson.isPlay = false
      })
    }
  })
}

watch(courseDetail, (newValue) => {
  if (newValue?.data[0].chapters[0]?.lessons[0].videoPath) {
    isPlayerReady.value = true
    const videoPath = newValue?.data[0].chapters[0].lessons[0].videoPath
    playerOptions.value.sources[0].src = videoPath
  }
})

watch(playerOptions, (newValue) => {
  nextTick(() => {
    isPlayerReady.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  })
})

//#endregion 影片

//#region tabs
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
//#endregion tabs

onMounted(() => {
  changeTabView('課程討論')
  getCourseIsExist()
})
</script>

<style lang="scss" scoped></style>
