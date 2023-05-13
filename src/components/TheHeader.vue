<template>
  <header class="h-auto">
    <div class="container mx-auto flex h-full items-center justify-between py-2 lg:py-3">
      <RouterLink to="/">
        <div class="h-11 w-25 bg-logo bg-contain bg-center bg-no-repeat lg:h-12 lg:w-27"></div>
      </RouterLink>
      <nav class="md:w-full">
        <div class="flex items-center md:hidden">
          <span class="material-icons pr-1 text-3xl text-primary-5"> shopping_cart </span>
          <span class="material-icons text-4xl text-primary-5"> menu </span>
        </div>
        <div class="hidden md:flex md:items-center md:justify-between">
          <button class="ml-14 flex items-center">
            <p class="mr-3 text-primary-5">探索</p>
            <span class="material-icons text-primary-5"> expand_more </span>
          </button>
          <div class="flex items-center gap-x-4">
            <span class="material-icons pr-1 text-3xl text-neutral-600"> search </span>
            <template v-if="!user">
              <span class="material-icons pr-1 text-3xl text-neutral-600"> shopping_cart </span>
              <button @click="loginModal = true" class="btn-primary">登入</button>
              <button @click="registerModal = true" class="btn-secondary">註冊</button>
            </template>
            <template v-else>
              <button class="btn-primary">我的學習</button>
              <span class="material-icons pr-1 text-3xl text-neutral-600"> shopping_cart </span>
              <div class="group relative">
                <img src="https://fakeimg.pl/40/" class="cursor-pointer rounded-full" alt="頭像" />
                <div
                  class="absolute right-0 top-full z-10 hidden w-72 pt-2 hover:block group-hover:block"
                >
                  <div class="rounded border bg-neutral-50">
                    <div class="flex items-center p-4 pb-2">
                      <img src="https://fakeimg.pl/60/" class="rounded-full" alt="頭像" />
                      <div class="pl-2">
                        <span class="block font-bold">{{ user.name }}</span>
                        <span class="block text-sm text-neutral-600">{{ user.email }}</span>
                      </div>
                    </div>
                    <hr class="my-2" />
                    <nav class="text-neutral-800">
                      <router-link to="/student/profile" class="block px-4 py-2"
                        >會員資料</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的學習</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的購物車</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的收藏</router-link
                      >
                      <hr class="my-2" />
                      <a href="/" @click.prevent="handleLogout" class="block px-4 py-2 pb-4"
                        >登出</a
                      >
                    </nav>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- <RouterLink to="/course">探索</RouterLink> -->
      </nav>
      <!-- <div v-if="user">
        <span class="material-icons ms-auto"> search </span>
        <button class="p-3">我的學習</button>
        <span class="primary-2 material-icons"> shopping_cart </span>
      </div>
      <div v-else>
        <span class="primary-2 material-icons ms-auto"> shopping_cart </span>
        <button class="p-3" @click="loginModal = true">登入</button>
        <button class="p-3" @click="registerModal = true">註冊</button>
      </div> -->
    </div>
    <!-- side pop-up menu -->
    <div class="absolute top-0 z-10 hidden h-screen w-full bg-neutral-600 pl-24">
      <div class="container h-screen w-full bg-neutral-50 pt-3">
        <div class="flex justify-end">
          <span class="material-icons text-4xl text-primary-5"> close </span>
        </div>
        <div class="mx-auto mb-3.5 h-12 w-27 bg-logo bg-contain bg-center bg-no-repeat"></div>
        <div class="relative mb-6">
          <input
            class="w-full rounded-3xl border border-neutral-200 pr-8 text-heading-3xl"
            type="text"
            name=""
            id=""
          />
          <span class="material-icons absolute right-3 top-0.5 text-xl text-primary-5">
            search
          </span>
        </div>
        <div class="mb-4">
          <div
            class="flex items-center justify-center border-b border-b-neutral-100 py-4 text-center text-primary-6"
          >
            <span>探索</span>
            <span class="material-icons">expand_more</span>
          </div>
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >線上開課教學</RouterLink
          >
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >常見問答</RouterLink
          >
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >聯絡我們</RouterLink
          >
        </div>
        <div class="flex justify-between">
          <button class="btn-primary">登入</button>
          <button class="btn-secondary">註冊</button>
        </div>
      </div>
    </div>
  </header>
  <LoginModal />
  <RegisterModal />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useStatusStore } from '@/stores/status'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'
import { useRouter } from 'vue-router'
import useErrorHandler from '../composables/useErrorHandler'

const router = useRouter()
const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const auth = useAuthStore()
const { logout } = auth
const { loginModal, registerModal, user } = storeToRefs(auth)

function handleLogout() {
  updateLoading(true)
  logout()
    .then(() => {
      router.push('/')
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}
</script>
