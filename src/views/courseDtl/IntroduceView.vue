<template>
  <div class="px-3 pb-16">
    <div class="mb-7">
      <h4 class="relative mb-4 ps-3 text-xl font-bold">
        <span
          class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
        ></span>
        關於課程
      </h4>
      <div>
        <div class="mb-2 flex items-center">
          <span class="material-icons text-lg"> watch_later </span>
          <p class="mr-4">課程時長</p>
          <p class="">{{ courseDetail.data.course.totalTime }}</p>
        </div>
        <div class="mb-2 flex items-center">
          <span class="material-icons text-lg"> group </span>
          <p class="mr-4">課程學員</p>
          <p class="">{{ courseDetail.data.course.buyers }}</p>
        </div>
        <div class="flex items-center">
          <span class="material-icons text-lg"> remove_red_eye </span>
          <p class="mr-4">觀看期限</p>
          <p class="">無期限</p>
        </div>
      </div>
    </div>
    <div>
      <h4 class="relative mb-4 ps-3 text-xl font-bold">
        <span
          class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
        ></span>
        關於簡介
      </h4>

      <div class="prose max-w-none" v-html="courseDetail.data.course.description"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update-is-response', 'get-data'])
const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  courseDetail: {
    type: Object,
    required: true
  }
})
</script>
<style lang=""></style>
