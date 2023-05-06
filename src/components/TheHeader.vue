<template>
  <header class="h-auto">
    <div class="container mx-auto flex h-full items-center justify-between py-2">
      <RouterLink to="/">
        <div class="h-11 w-25 bg-logo bg-contain bg-center bg-no-repeat"></div>
      </RouterLink>
      <nav>
        <div class="flex items-center md:hidden">
          <span class="material-icons pr-1 text-3xl text-primary-5"> shopping_cart </span>
          <span class="material-icons text-4xl text-primary-5"> menu </span>
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
import { useAuthStore } from '../stores/auth'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'
import { onMounted } from 'vue'

const auth = useAuthStore()
const { user, token } = auth
const { loginModal, registerModal } = storeToRefs(auth)

onMounted(() => {})
</script>
