<template>
  <main>
    <div class="container">
      <div class="mt-6 md:mt-[52px]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-base text-neutral-800">王小明</p>
            <h2 class="text-heading-3xl text-primary-6">法式馬卡龍的製作與口感掌控</h2>
          </div>
          <button type="button" class="btn-back-round md:hidden">
            <span class="material-icons"> undo </span>
          </button>
          <button type="button" class="btn-back hidden md:block">返回</button>
        </div>

        <div class="my-6 grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-8">
            <div>
              <!-- 影片先用圖片代替 -->
              <img class="w-100" src="https://picsum.photos/856/472" alt="" />
            </div>

            <div class="mt-6 border border-neutral-200 p-3">
              <div class="flex items-center gap-x-4">
                <span>目前進度</span>
                <div class="h-1 flex-1 rounded bg-neutral-100"></div>
                <span>15%</span>
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
              <div class="relative pb-6 pt-[52px]">
                <div
                  class="flex justify-around gap-x-[19px] pb-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-[''] lg:justify-start"
                >
                  <CourseTabs :tabs="tabs" @changeTabView="changeTabView" ref="tabsCompRef">
                  </CourseTabs>
                </div>
              </div>

              <component :is="currentTab"></component>
            </div>
          </div>

          <div class="hidden lg:col-start-9 lg:col-end-13 lg:block">
            <ChapterView></ChapterView>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { shallowRef, ref, onMounted } from 'vue'
import CourseTabs from '@/components/CourseTabs.vue'
import ChapterView from '@/views/courseDtl/ChapterView.vue'
import DiscussView from '@/views/courseDtl/DiscussView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'

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

onMounted(() => {
  changeTabView('課程討論')
})
</script>