<template>
  <main>
    <div class="container">
      <div class="mt-6 md:mt-[52px]">
        <div class="flex justify-between gap-x-4 md:items-center">
          <div>
            <p class="text-base text-neutral-800">王小明</p>
            <h2 class="text-heading-3xl text-primary-6">法式馬卡龍的製作與口感掌控</h2>
          </div>
          <div class="md:hidden">
            <button class="btn-back-round">
              <img class="m-auto block" src="/image/undo.png" alt="" />
            </button>
          </div>

          <div class="hidden md:block">
            <button class="btn-back flex items-center gap-x-2">
              <img class="" src="/image/undo.png" alt="" />
              返回
            </button>
          </div>
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
                <ProgressBar
                  :currentVal="progressVal"
                  :minVal="minVal"
                  :maxVal="maxVal"
                  :style="progressBarStyle"
                  v-slot="{ percent }"
                >
                  {{ percent + '%' }}
                </ProgressBar>

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
import ProgressBar from '@/components/ProgressBar.vue'
import CourseTabs from '@/components/CourseTabs.vue'
import ChapterView from '@/views/courseDtl/ChapterView.vue'
import DiscussView from '@/views/courseDtl/DiscussView.vue'
import ReviewView from '@/views/courseDtl/ReviewView.vue'

const minVal = ref(0)
const maxVal = ref(100)
const progressVal = ref(15)
const progressBarStyle = { bg: 'bg-neutral-100', progress: 'bg-secondary-2', height: 'h-2' }

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
