<template>
  <ul class="mb-10 flex h-80 flex-col gap-y-2 overflow-y-auto lg:min-h-full">
    <li v-for="chapter in courseDetail?.chapters" :key="chapter.id">
      <div
        class="flex cursor-pointer justify-between rounded-[10px] border border-primary-3 p-4 shadow shadow-primary-3"
        @click="chapter.isShow = !chapter.isShow"
      >
        <h6 class="font-bold">{{ chapter.title }}</h6>
        <span class="material-icons" :class="chapter.isShow ? '' : 'rotate-180'">
          expand_more
        </span>
      </div>

      <transition name="slide">
        <template v-if="chapter.isShow">
          <ul class="flex flex-col gap-y-6 px-2 py-3">
            <li v-for="lesson in chapter.lessons" :key="lesson.id">
              <div class="flex justify-between">
                <div class="flex cursor-pointer gap-x-2">
                  <span class="material-icons text-primary-5" v-show="lesson.isPlay === true">
                    play_arrow
                  </span>
                  <p
                    class="text-primary-5"
                    :class="lesson.isPlay === true ? 'font-bold' : ''"
                    @click="videoPlayerHandler(lesson.videoPath, chapter.id, lesson.id)"
                  >
                    {{ lesson.title }}
                  </p>
                </div>
                <!-- <p class="text-primary-5">5:30</p> -->
              </div>
            </li>
          </ul>
        </template>
      </transition>
    </li>
  </ul>
</template>
<script setup lang="ts">
const emit = defineEmits(['update-video-path'])
const props = defineProps({
  user: {
    type: Object
  },
  courseDetail: {
    type: Object,
    required: true
  }
})

const videoPlayerHandler = (videoPath: string, chapterID: number, lessonID: number) => {
  emit('update-video-path', videoPath, chapterID, lessonID)
}
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
