<template>
  <div class="px-3 pb-16">
    <div class="mb-16">
      <template v-for="(faqs, index) in courseDetail.data.faqs" :key="index">
        <h4 class="relative mb-4 ps-3 text-xl font-bold">
          <span
            class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
          ></span>
          {{ faqs.title }}
        </h4>
        <ul class="flex flex-col gap-y-3">
          <li v-for="faq in faqs.questions" :key="faq.id">
            <div class="flex items-center justify-between gap-x-1 bg-primary-3/50 p-2">
              <p class="text-lg font-bold">
                {{ faq.title }}
              </p>
              <span class="material-icons"> expand_less </span>
            </div>
            <div class="p-6">
              <p>{{ faq.content }}</p>
            </div>
          </li>
        </ul>
      </template>
    </div>
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
