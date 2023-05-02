<template>
  <header class="h-[72px]">
    <div class="container mx-auto flex h-full items-center justify-between">
      <div class="me-3">logo</div>
      <nav>
        <RouterLink to="/course">探索</RouterLink>
      </nav>
      <template v-if="user">
        <span class="material-icons ms-auto"> search </span>
        <button class="p-3">我的學習</button>
        <span class="material-icons"> shopping_cart </span>
      </template>
      <template v-else>
        <span class="material-icons ms-auto"> shopping_cart </span>
        <button class="p-3" @click="loginModal = true">登入</button>
        <button class="p-3" @click="registerModal = true">註冊</button>
      </template>
    </div>
  </header>
  <LoginModal />
  <RegisterModal />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import authStore from '../stores/auth'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const auth = authStore()
const { user } = auth
const { loginModal, registerModal } = storeToRefs(auth)
</script>
