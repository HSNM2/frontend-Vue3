<template>
  <main>
    <div class="container mb-20">
      <h2 class="mt-6 text-heading-3xl font-bold text-primary-5">探索課程</h2>
      <div class="w-100 flex justify-end">
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">蛋捲</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">雪酪</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">餅乾</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">冰品</span>
        <span class="mx-2 rounded-md bg-primary-2 px-0.5">鬆餅</span>
        <select class="border-2 border-solid border-neutral-200 outline-none">
          <option v-for="item in selectCoursesList" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="my-5">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <template v-for="(item, index) in mockData" :key="index">
            <router-link to="/course/1">
              <div class="cursor-pointer hover:shadow hover:shadow-md hover:shadow-neutral-150">
                <div class="overflow-hidden">
                  <img
                    class="w-full duration-150 hover:scale-110"
                    src="https://picsum.photos/300/180"
                    alt=""
                  />
                </div>
                <div class="border border-t-0 border-solid border-neutral-150 p-3">
                  <h3 class="mb-4 text-lg font-bold text-primary-6">
                    從入門到高級，從蛋糕到法式甜點，全方位掌握甜點製作
                  </h3>
                  <span class="text-sm text-neutral-800">王小明</span>
                  <div class="flex items-center">
                    <span class="material-icons pr-2 text-base"> watch_later </span>
                    <span class="text-sm text-neutral-800">5小時20分</span>
                  </div>
                  <div class="flex items-center">
                    <span class="material-icons pr-2 text-base"> person </span>
                    <span class="text-sm text-neutral-800">200人</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span class="material-icons text-lg text-primary-3"> star </span>
                      <span class="material-icons text-lg text-primary-3"> star </span>
                      <span class="material-icons text-lg text-primary-3"> star </span>
                      <span class="material-icons text-lg text-primary-3"> star </span>
                      <span class="material-icons text-lg text-primary-3"> star_border </span>
                      <span class="text-sm text-neutral-600">(10)</span>
                    </div>

                    <span class="text-lg font-bold text-primary-4">NT$3,666</span>
                  </div>
                </div>
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-4 col-start-5 m-auto flex items-center">
          <span class="cursor-pointer px-2">&lt;</span>
          <ul class="flex cursor-pointer items-center">
            <li><span class="px-2">1</span></li>
          </ul>
          <span class="cursor-pointer px-2">&gt;</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mockData = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

const selectCoursesList = [
  { value: '', label: '全部課程' },
  { value: 'rate', label: '最高評價' },
  { value: 'people', label: '最多人數' },
  { value: 'price', label: '最低價格' }
]
</script>
