<template>
  <div class="px-3 pb-16">
    <h4 class="relative mb-4 ps-3 text-xl font-bold">
      <span
        class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
      ></span>
      課程大綱
    </h4>
    <ul>
      <li v-for="chapter in chaptersData?.chapters" :key="chapter.id">
        <div class="mb-4">
          <div
            class="flex cursor-pointer items-center justify-between gap-x-1 bg-primary-3/50 px-2"
            @click="chapter.isShow = !chapter.isShow"
          >
            <div class="flex items-center">
              <span class="material-icons text-2xl"> list </span>
              <p class="text-lg font-bold">{{ chapter.title }}</p>
            </div>
            <span class="material-icons" :class="chapter.isShow ? '' : 'rotate-180'">
              expand_more
            </span>
          </div>
          <transition name="slide">
            <template v-if="chapter.isShow">
              <div class="px-2 py-4">
                <template v-for="lesson in chapter.lessons" :key="lesson.id">
                  <div class="flex items-center py-2">
                    <p>{{ lesson.title }}</p>
                  </div>
                </template>
              </div>
            </template>
          </transition>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { GetCourseChapterRequest } from '@/models/course'

interface ChaptersResponse {
  status: number
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
}

const props = defineProps({
  courseDetail: {
    type: Object,
    required: true
  },
  courseID: {
    type: Number,
    required: true
  }
})

const chaptersData = ref<ChaptersResponse | null>(null)

const getChapter = () => {
  GetCourseChapterRequest(props.courseID)
    .then((res) => {
      chaptersData.value = res.data
      chaptersData.value?.chapters.forEach((item) => {
        item.isShow = false
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getChapter()
})
</script>
<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  transform: translateY(-10%);
}

.slide-leave-to {
  transform: translateY(-10%);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
