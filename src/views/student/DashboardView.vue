<template>
  <main class="bg-primary-1 py-8">
    <div class="container">
      <div class="grid grid-cols-12 gap-6">
        <aside class="col-span-3 flex flex-col items-center bg-neutral-50 py-6">
          <div class="relative">
            <img src="https://fakeimg.pl/100x100/B7B7B7/" class="mx-auto rounded-full" />
            <label
              id="profilePhoto"
              class="absolute bottom-0 bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary-4 text-white"
            >
              <span class="material-icons text-sm">photo_camera</span>
              <input class="hidden" type="file" name="profile-photo" id="profilePhoto" />
            </label>
          </div>
          <span class="py-6 text-center">會員名字</span>
          <nav class="w-full border-t py-2">
            <router-link
              v-for="link in sidebarMenuLinks"
              :key="link.to"
              class="flex items-center justify-center p-4 text-neutral-600 hover:text-primary-4"
              :class="{ 'text-primary-4': $route.path.startsWith(link.to) }"
              :to="link.to"
            >
              <span class="material-icons me-2"> {{ link.icon }}</span>
              {{ link.name }}</router-link
            >
          </nav>
        </aside>
        <div class="col-span-9 bg-primary-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const sidebarMenuLinks = ref([
  { name: '我的學習', icon: 'computer', to: '/student/courses' },
  { name: '我的收藏', icon: 'bookmark', to: '/student/tags' },
  { name: '訂單記錄', icon: 'description', to: '/student/orders' },
  { name: '會員資料', icon: 'person', to: '/student/profile' }
])
</script>
