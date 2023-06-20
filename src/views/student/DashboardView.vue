<template>
  <main class="h-full bg-neutral-100 py-8">
    <div class="h-full px-4 lg:container">
      <div class="grid h-full grid-cols-12 gap-6">
        <aside class="col-span-3 flex flex-col items-center bg-neutral-50 py-6">
          <div class="relative">
            <img
              :src="
                user?.avatarImagePath
                  ? user?.avatarImagePath
                  : 'https://fakeimg.pl/100x100/B7B7B7/?text=用戶'
              "
              class="mx-auto h-25 w-25 rounded-full object-cover"
            />
            <label
              id="profilePhoto"
              class="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary-4 text-white"
            >
              <span class="material-icons text-sm">photo_camera</span>
              <input
                class="hidden"
                type="file"
                name="avatar"
                id="profilePhoto"
                @change.prevent="avatarPicChange"
              />
            </label>
          </div>
          <span class="py-6 text-center">{{ user ? user.name : '' }}</span>
          <nav class="w-full border-t py-2">
            <router-link
              v-for="link in sidebarMenuLinks"
              :key="link.to"
              class="flex items-center justify-center p-4 text-neutral-600 hover:text-primary-4"
              :to="link.to"
            >
              <span class="material-icons me-2"> {{ link.icon }}</span>
              {{ link.name }}</router-link
            >
          </nav>
        </aside>
        <div class="col-span-9 bg-neutral-100">
          <router-view v-if="user"></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

import { AvatarPicRequest } from '@/models/auth'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const { getUser } = auth

const avatarPic = ref<FormData | null>(new FormData())

const sidebarMenuLinks = ref([
  { name: '我的學習', icon: 'computer', to: '/student/courses' },
  { name: '我的收藏', icon: 'bookmark', to: '/student/tags' },
  { name: '訂單記錄', icon: 'description', to: '/student/orders' },
  { name: '會員資料', icon: 'person', to: '/student/profile' }
])

function avatarPicChange(e: Event) {
  const files: FileList | null = (e.target as HTMLInputElement).files
  if (!files) return
  avatarPic.value?.append('avatar', files[0])

  AvatarPicRequest(avatarPic.value).then(() => {
    getUser()
  })
}
</script>
