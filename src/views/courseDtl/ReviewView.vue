<template>
  <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
    <div
      class="col-span-12"
      :class="$route.name === 'course' ? 'lg:col-span-3 lg:col-start-10' : ''"
    >
      <div class="rounded-2.5xl border border-neutral-200 px-[38px] py-5 lg:px-4">
        <div class="flex items-center justify-center gap-x-1.5">
          <span class="material-icons text-4xl text-primary-3"> star </span>
          <p class="text-xl font-bold">4.5</p>
          <p class="text-base text-neutral-600">/ 5.0(10則評價)</p>
        </div>
        <div class="my-4">
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
            </div>
            <ProgressBar
              :currentVal="progressVal"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <ProgressBar
              :currentVal="progressVal"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <ProgressBar
              :currentVal="progressVal"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <ProgressBar
              :currentVal="progressVal"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <ProgressBar
              :currentVal="progressVal"
              :minVal="minVal"
              :maxVal="maxVal"
              :style="progressBarStyle"
            ></ProgressBar>
          </div>
        </div>
        <button
          v-if="isLogin === true"
          type="button"
          class="btn-primary mx-auto block px-4"
          @click="reviewAction()"
        >
          對課程有心得？ 開始評價
        </button>
      </div>
    </div>

    <div
      class="col-span-12"
      :class="$route.name === 'course' ? 'lg:col-span-9 lg:row-start-1' : ''"
    >
      <div class="mb-4 rounded-2.5xl border border-secondary-2 p-5">
        <div
          class="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0"
        >
          <div class="flex items-center gap-x-4">
            <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
            <p class="">漂亮阿姨</p>
          </div>
          <div class="flex items-center justify-between md:gap-x-4">
            <div class="flex items-center">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <p class="text-sm text-primary-4">2023/02/07 10:04</p>
          </div>
        </div>
        <div class="mt-4 md:ml-14">
          <p>
            這個法式馬卡龍的教學真的超棒的！講解詳細，步驟清晰易懂，而且影片拍攝也非常專業，謝謝這個網站提供這麼棒的課程！
          </p>
        </div>
      </div>
      <div class="mb-4 rounded-2.5xl border border-secondary-2 p-5">
        <div
          class="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0"
        >
          <div class="flex items-center gap-x-4">
            <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
            <p class="">漂亮阿姨</p>
          </div>
          <div class="flex items-center justify-between md:gap-x-4">
            <div class="flex items-center">
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star </span>
              <span class="material-icons text-base text-primary-3"> star_border </span>
            </div>
            <p class="text-sm text-primary-4">2023/02/07 10:04</p>
          </div>
        </div>
        <div class="mt-4 md:ml-14">
          <p>
            這個法式馬卡龍的教學真的超棒的！講解詳細，步驟清晰易懂，而且影片拍攝也非常專業，謝謝這個網站提供這麼棒的課程！
          </p>
        </div>
      </div>
    </div>
  </div>
  <ReviewModal v-if="isShowModal" @close-modal="isShowModal = false"></ReviewModal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import ReviewModal from '@/components/ReviewModal.vue'
const props = defineProps({
  isLogin: { type: Boolean },
  user: {
    type: Object,
    required: true
  },
  courseDetail: {
    type: Object,
    required: true
  }
})

const minVal = ref(0)
const maxVal = ref(100)
const progressVal = ref(80)
const progressBarStyle = { bg: 'bg-neutral-150', progress: 'bg-neutral-500', height: 'h-1' }

const isShowModal = ref(false)
const reviewAction = () => {
  isShowModal.value = true
  // 點選後判斷是否登入
  // 未登入 => 登入視窗 ； 登入 => 判斷是否有買此課程
  // 登入後判斷是否已買課程
  // 未買，不顯示此案紐 ； 已買，顯示評價modal
}
</script>
<style lang=""></style>
