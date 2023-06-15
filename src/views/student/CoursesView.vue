<template>
  <h1 class="mb-6 bg-neutral-50 px-8 py-4 text-lg font-semibold text-neutral-800">我的學習</h1>
  <div class="bg-neutral-50 p-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <template v-for="item in courseList?.data" :key="item.id">
        <div class="relative">
          <router-link :to="`/learn/${item.id}`">
            <div class="cursor-pointer hover:shadow hover:shadow-md hover:shadow-neutral-150">
              <div class="overflow-hidden">
                <img
                  class="block h-48 w-full object-cover duration-150 hover:scale-110"
                  :src="item.image_path"
                  alt=""
                />
              </div>
              <div class="h-48 border border-t-0 border-solid border-neutral-150 p-3">
                <div class="flex h-full flex-col justify-between">
                  <h3 class="line-clamp-2 text-lg font-bold text-primary-6">
                    {{ item.title }}
                  </h3>
                  <div>
                    <div class="flex flex-wrap items-center">
                      <p class="pe-1 text-sm text-neutral-800">學習進度:</p>
                      <ProgressBar
                        :currentVal="progressVal"
                        :minVal="minVal"
                        :maxVal="maxVal"
                        :style="progressBarStyle"
                        v-slot="{ percent }"
                      >
                        <span class="ps-1 text-xs">{{ percent + '%' }}</span>
                      </ProgressBar>
                    </div>
                    <div class="flex flex-wrap">
                      <p class="pe-1 text-sm text-neutral-800">單元進度:</p>
                      <p class="text-sm text-neutral-800">0完成/10個章節</p>
                    </div>
                    <div class="flex flex-wrap">
                      <p class="pe-1 text-sm text-neutral-800">講師:</p>
                      <p class="text-sm text-neutral-800">{{ item.provider }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <p class="pe-1 text-sm text-neutral-800">您的評分:</p>
                        <template v-for="(star, starIndex) in 5" :key="starIndex">
                          <span
                            class="material-icons text-base text-primary-3"
                            @click.prevent="openReviewModal"
                          >
                            {{ getStar(item.rating.avgRating, starIndex) }}
                          </span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </div>
    <div class="mt-8">
      <div class="flex items-center justify-end">
        <div class="border" :class="currentPage - 1 <= 0 ? 'text-neutral-400' : ''">
          <span class="cursor-pointer px-2" @click="setPage(currentPage - 1)">&lt;</span>
        </div>
        <ul class="flex cursor-pointer items-center">
          <li v-for="page in courseList?.totalPages" :key="page">
            <div class="border" :class="page === currentPage ? 'bg-primary-4 text-white' : ''">
              <span class="px-2" @click="setPage(page)">{{ page }}</span>
            </div>
          </li>
        </ul>
        <div
          class="border"
          :class="currentPage + 1 >= courseList?.totalPages ? 'text-neutral-400' : ''"
        >
          <span class="cursor-pointer px-2" @click="setPage(currentPage + 1)">&gt;</span>
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

const minVal = ref(0)
const maxVal = ref(100)
const progressVal = ref(15)
const progressBarStyle = {
  bg: 'bg-neutral-150',
  progress: 'bg-neutral-500',
  height: 'h-1'
}
const isShowModal = ref(false)
const openReviewModal = () => {
  isShowModal.value = true
}

const courseList = {
  data: [
    {
      id: 2,
      title: '馬卡龍風味研究室馬卡龍風味研究室馬卡龍風味研究室馬卡龍風味研究室馬卡龍風味研究室',
      subTittle: '挑戰法式甜點之最--馬卡龍',
      image_path: 'http://localhost:3002/static/coverPhoto/coverPhoto-1686669005094-826756121.jpg',
      price: 3499,
      originPrice: 3999,
      link: null,
      provider: 'amy',
      tag: '甜點,馬卡龍,法式',
      buyers: 0,
      totalTime: 0,
      courseStatus: '1',
      type: '法國麵包',
      category: '麵包',
      rating: {
        avgRating: 0,
        countRating: 0
      }
    },
    {
      id: 2,
      title: '馬卡龍風味研究室',
      subTittle: '挑戰法式甜點之最--馬卡龍',
      image_path: 'http://localhost:3002/static/coverPhoto/coverPhoto-1686669005094-826756121.jpg',
      price: 3499,
      originPrice: 3999,
      link: null,
      provider: 'amy',
      tag: '甜點,馬卡龍,法式',
      buyers: 0,
      totalTime: 0,
      courseStatus: '1',
      type: '法國麵包',
      category: '麵包',
      rating: {
        avgRating: 0,
        countRating: 0
      }
    },
    {
      id: 2,
      title: '馬卡龍風味研究室',
      subTittle: '挑戰法式甜點之最--馬卡龍',
      image_path: 'http://localhost:3002/static/coverPhoto/coverPhoto-1686669005094-826756121.jpg',
      price: 3499,
      originPrice: 3999,
      link: null,
      provider: 'amy',
      tag: '甜點,馬卡龍,法式',
      buyers: 0,
      totalTime: 0,
      courseStatus: '1',
      type: '法國麵包',
      category: '麵包',
      rating: {
        avgRating: 0,
        countRating: 0
      }
    },
    {
      id: 2,
      title: '馬卡龍風味研究室',
      subTittle: '挑戰法式甜點之最--馬卡龍',
      image_path: 'http://localhost:3002/static/coverPhoto/coverPhoto-1686669005094-826756121.jpg',
      price: 3499,
      originPrice: 3999,
      link: null,
      provider: 'amy',
      tag: '甜點,馬卡龍,法式',
      buyers: 0,
      totalTime: 0,
      courseStatus: '1',
      type: '法國麵包',
      category: '麵包',
      rating: {
        avgRating: 0,
        countRating: 0
      }
    },
    {
      id: 2,
      title: '馬卡龍風味研究室',
      subTittle: '挑戰法式甜點之最--馬卡龍',
      image_path: 'http://localhost:3002/static/coverPhoto/coverPhoto-1686669005094-826756121.jpg',
      price: 3499,
      originPrice: 3999,
      link: null,
      provider: 'amy',
      tag: '甜點,馬卡龍,法式',
      buyers: 0,
      totalTime: 0,
      courseStatus: '1',
      type: '法國麵包',
      category: '麵包',
      rating: {
        avgRating: 0,
        countRating: 0
      }
    }
  ],
  page: 1,
  totalPages: 1
}

const currentPage = ref(1)
const setPage = (page: number) => {
  if (page <= 0 || page >= courseList.totalPages) return
  currentPage.value = page
}

//#region 星星
const getStar = (score: number, index: number) => {
  if (index + 1 <= score) {
    return 'star'
  } else {
    return 'star_border'
  }
}
//#endregion
</script>
