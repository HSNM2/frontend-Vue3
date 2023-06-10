<template>
  <ul class="mb-10 flex flex-col gap-y-2">
    <li v-for="chapter in courseDetail.chapters" :key="chapter.id">
      <div
        class="flex justify-between rounded-[10px] border border-primary-3 p-4 shadow shadow-primary-3"
      >
        <h6 class="font-bold">{{ chapter.title }}</h6>
        <span class="material-icons"> expand_less </span>
      </div>
      <ul class="flex flex-col gap-y-6 px-2 py-3">
        <li v-for="lesson in chapter.lessons" :key="lesson.id">
          <div class="flex justify-between">
            <div class="flex gap-x-2">
              <!-- <span class="material-icons text-primary-5"> play_arrow </span> -->
              <p
                class="font-bold text-primary-5"
                @click="videoPlayerHandler(lesson.videoPath, chapter.id, lesson.id)"
              >
                {{ lesson.title }}
              </p>
            </div>
            <p class="text-primary-5">5:30</p>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps({
  courseDetail: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update-video-path', 'test'])

const videoPlayerHandler = (videoPath: string, chapterID: number, lessonID: number) => {
  emit('update-video-path', videoPath, chapterID, lessonID)
}
</script>
<style lang=""></style>
