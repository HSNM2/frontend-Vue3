<template>
  <footer class="bg-primary-5">
    <div class="container pb-4 pt-7">
      <div class="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
        <div>
          <div class="mx-auto mb-6 h-19 w-44 bg-logo-alt bg-contain bg-center bg-no-repeat"></div>
          <div class="flex justify-center gap-x-4">
            <div class="group">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-4 group-hover:bg-neutral-50 group-active:bg-neutral-600"
              >
                <i
                  class="fab fa-facebook text-xl text-neutral-50 group-hover:text-primary-6 group-active:text-neutral-50"
                ></i>
              </div>
            </div>
            <div class="group">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-4 group-hover:bg-neutral-50 group-active:bg-neutral-600"
              >
                <i
                  class="fab fa-instagram text-xl text-neutral-50 group-hover:text-primary-6 group-active:text-neutral-50"
                ></i>
              </div>
            </div>
            <div class="group">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-4 group-hover:bg-neutral-50 group-active:bg-neutral-600"
              >
                <i
                  class="fab fa-youtube text-xl text-neutral-50 group-hover:text-primary-6 group-active:text-neutral-50"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-2">
          <p class="text-center font-bold text-neutral-50">關於我們</p>
          <RouterLink to="/about" class="text-center text-neutral-50">品牌介紹</RouterLink>
        </div>
        <div class="flex flex-col gap-y-2">
          <p class="text-center font-bold text-neutral-50">商品類型</p>
          <RouterLink to="/courses" class="text-center text-neutral-50">線上課程</RouterLink>
        </div>
        <div class="flex flex-col gap-y-2">
          <p class="text-center font-bold text-neutral-50">幫助</p>
          <RouterLink to="/createCourseInfo" class="text-center text-neutral-50"
            >線上開課教學</RouterLink
          >
          <RouterLink to="/" class="text-center text-neutral-50">常見問答</RouterLink>
          <RouterLink to="/" class="text-center text-neutral-50">聯絡我們</RouterLink>
        </div>
        <div class="flex flex-col gap-y-2">
          <p class="text-center font-bold text-neutral-50">條款與政策</p>
          <RouterLink to="/" class="text-center text-neutral-50">平台會員規範及申訴管道</RouterLink>
          <RouterLink to="/" class="text-center text-neutral-50">優惠使用規則</RouterLink>
          <RouterLink to="/" class="text-center text-neutral-50">隱私權政策</RouterLink>
          <RouterLink to="/" class="text-center text-neutral-50">服務條款</RouterLink>
        </div>
      </div>
    </div>
    <div class="bg-primary-4 py-3">
      <p class="text-center text-sm text-neutral-50">
        Tiramisu © 2023-2053 All Rights Reserved
        <span class="ps-5">version: {{ version }}</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const version = ref(VITE_APP_VERSION)
</script>
