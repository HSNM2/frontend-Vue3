<template>
  <div class="px-3 pb-16">
    <template v-for="(faqs, index) in faqsData?.faqs" :key="index">
      <h4 class="relative mb-4 ps-3 text-xl font-bold">
        <span
          class="absolute left-0 top-1 before:block before:h-7 before:w-1 before:bg-neutral-900 before:content-['']"
        ></span>
        {{ faqs.title }}
      </h4>
      <ul class="mb-4 flex flex-col gap-y-3">
        <li v-for="faq in faqs.questions" :key="faq.id">
          <div
            class="flex cursor-pointer items-center justify-between gap-x-1 bg-primary-3/50 p-2"
            @click="faq.isShow = !faq.isShow"
          >
            <p class="text-lg font-bold">
              {{ faq.title }}
            </p>
            <span class="material-icons" :class="faq.isShow ? '' : 'rotate-180'">
              expand_more
            </span>
          </div>
          <transition name="slide">
            <template v-if="faq.isShow">
              <div class="p-6">
                <p>{{ faq.content }}</p>
              </div>
            </template>
          </transition>
        </li>
      </ul>
    </template>
  </div>
</template>
<script setup lang="ts">
interface FaqsResponse {
  status: number
  faqs: Faq[]
}

interface Faq {
  id: number
  title: string
  questions: Question[]
}

interface Question {
  id: number
  title: string
  content: string
  publish: boolean
  isShow: boolean
}

import { ref, onMounted } from 'vue'

import { GetCourseFaqRequest } from '@/models/course'

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

const faqsData = ref<FaqsResponse | null>(null)

const getFaq = () => {
  GetCourseFaqRequest(props.courseID)
    .then((res) => {
      faqsData.value = res.data
      faqsData.value?.faqs.forEach((item) => {
        item.questions.forEach((question) => {
          question.isShow = false
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getFaq()
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
