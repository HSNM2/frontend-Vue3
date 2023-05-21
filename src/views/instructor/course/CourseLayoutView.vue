<template>
  <main ref="main" class="flex items-stretch bg-neutral-100">
    <!--左側選單-->
    <aside class="w-72 bg-neutral-50">
      <div class="p-6 pt-2">
        <RouterLink to="/instructor/courses" class="mb-4 flex items-center text-xs text-neutral-600"
          ><i class="material-icons me-1 text-xs">arrow_back_ios_new</i>課程列表</RouterLink
        >
        <h2 class="text-lg font-bold text-neutral-800">產品設計實戰：用Figma打造絕佳UI</h2>
      </div>
      <ul class="border-t p-6">
        <li class="mb-8">
          <span class="text-sm text-neutral-600">內容</span>
          <router-link to="/instructor/course/123123" class="block">章節管理</router-link>
        </li>
        <li class="mb-8">
          <span class="text-sm text-neutral-600">學員</span>
          <router-link to="/instructor/course/1112222/students" class="mb-8 block"
            >學員列表</router-link
          >
        </li>
        <li>
          <span class="text-sm text-neutral-600">設定</span>
          <router-link to="/instructor/course/1112222/info" class="mb-1 block"
            >課程資訊</router-link
          >
          <router-link to="/" class="mb-1 block">常見問題</router-link>
          <router-link to="/" class="block">進階設定</router-link>
        </li>
      </ul>
    </aside>
    <!--主內容-->
    <div class="flex-1 bg-neutral-100 p-8">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const main = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (main.value) {
      main.value.style.minHeight = `calc(100vh - ${
        (document.querySelector('header') as HTMLElement).offsetHeight
      }px - ${(document.querySelector('footer') as HTMLElement).offsetHeight}px)`
    }
  })
})
</script>
