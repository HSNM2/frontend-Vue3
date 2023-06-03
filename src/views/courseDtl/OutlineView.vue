<template>
  <div class="px-3 pb-16">
    <h4 class="relative mb-4 ps-3 text-xl font-bold">
      <span
        class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
      ></span>
      課程大綱
    </h4>
    <ul>
      <li v-for="chapter in courseDetail.data.chapters" :key="chapter.id">
        <div class="mb-4">
          <div class="flex items-center justify-between gap-x-1 bg-primary-3/50 px-2">
            <div class="flex items-center">
              <span class="material-icons text-2xl"> list </span>
              <p class="text-lg font-bold">{{ chapter.title }}</p>
            </div>
            <span class="material-icons"> expand_less </span>
          </div>
          <div class="px-2 py-4">
            <template v-for="lesson in chapter.lessons" :key="lesson.id">
              <div class="flex items-center py-2">
                <span class="material-icons text-lg"> play_arrow </span>
                <p>{{ lesson.title }}</p>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  courseDetail: {
    type: Object,
    required: true
  }
})
</script>
<style lang=""></style>
