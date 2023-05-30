<template>
  <main>
    <div class="bg-paleYellow">
      <div class="md:container">
        <div class="grid grid-cols-12 px-3 py-6 lg:px-0 lg:py-[52px]">
          <div class="col-span-12 lg:col-span-6 lg:gap-x-6">
            <p class="pb-1 text-base text-neutral-800">王小明</p>
            <h2 class="pb-5 text-heading-3xl font-bold text-primary-6">
              法式馬卡龍的製作與口感掌控
            </h2>
            <p class="pb-3 text-qa-title text-primary-6">無錯誤製作法：從材料到步驟一次搞定</p>
            <div class="flex gap-x-2 pb-3">
              <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">＃擠花技巧</p>
              <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">＃烤製方法</p>
            </div>
            <div class="flex items-center lg:pb-3">
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star_border </span>
              <span class="text-sm text-neutral-600">(10則評價)</span>
            </div>

            <p class="hidden pb-5 text-2xl font-bold text-primary-4 md:block">NT$23,000</p>
            <div class="flex items-center gap-x-5 pb-6">
              <button type="button" class="btn-primary hidden md:block">立即購買</button>
              <span class="material-icons hidden cursor-pointer text-primary-6 md:block">
                shopping_cart
              </span>
              <span class="material-icons cursor-pointer text-primary-6"> share </span>
              <span class="material-icons cursor-pointer text-primary-6"> bookmark_border </span>
              <!-- <span class="material-icons text-primary-6 cursor-pointer"> bookmark </span> -->
            </div>
          </div>

          <!-- 影片先用圖片代替 -->
          <div class="col-span-12 lg:col-span-6">
            <div class="grid grid-cols-4">
              <div class="col-span-4">
                <img class="w-100" src="https://picsum.photos/636/295" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md:container">
      <div class="py-6 lg:py-[52px]">
        <div class="relative mx-[12.5px] py-3">
          <div
            class="flex justify-around gap-x-[19px] pb-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-[''] lg:justify-start"
          >
            <CourseTabs :tabs="tabs" @changeTabView="changeTabView"> </CourseTabs>
          </div>
        </div>
      </div>
      <component :is="currentTab" :isLogin="isLogin"></component>
    </div>
  </main>
  <teleport to="body">
    <div class="sticky bottom-0 z-10 w-full md:hidden">
      <div class="flex items-center justify-between gap-x-5 bg-secondary-1 px-3 py-[15px]">
        <p class="text-2xl font-bold text-primary-4">NT$23,000</p>
        <span class="material-icons cursor-pointer text-primary-6"> shopping_cart </span>
        <button type="button" class="btn-primary w-full px-2">立即購買</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { shallowRef, ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import CourseTabs from '@/components/CourseTabs.vue'
import IntroduceView from '@/views/courseDtl/IntroduceView.vue'
import OutlineView from '@/views/courseDtl/OutlineView.vue'
import QAView from '@/views/courseDtl/QAView.vue'
import CommonProblemView from '@/views/courseDtl/CommonProblemView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const isLogin = ref(false)

const checkLogin = () => {
  if (user.value !== null) isLogin.value = true
  else isLogin.value = false
}

watch(user, () => {
  checkLogin()
})

onMounted(() => {
  checkLogin()
})

const tabs = [
  { name: '課程介紹', comp: IntroduceView, style: '' },
  { name: '課程大綱', comp: OutlineView, style: '' },
  { name: '課前問答', comp: QAView, style: '' },
  { name: '常見問題', comp: CommonProblemView, style: '' },
  { name: '課程評價', comp: ReviewView, style: '' }
]

const currentTab = shallowRef(tabs[0].comp)

const changeTabView = (name: string) => {
  tabs.forEach((item) => {
    if (item.name === name) {
      currentTab.value = item.comp
    }
  })
}
</script>

<style lang="scss" scoped>
.bg-paleYellow {
  background-color: #fffaec;
}
</style>
