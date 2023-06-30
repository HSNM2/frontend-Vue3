<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

import { useStatusStore } from './stores/status.js'

const status = useStatusStore()
const { isLoading } = storeToRefs(status)
</script>

<template>
  <VLoading v-model:active="isLoading" :is-full-page="true" />
  <div class="flex h-screen flex-col">
    <div class="fixed top-0 z-50 w-full bg-white shadow shadow-neutral-150">
      <TheHeader />
    </div>
    <div class="mt-[76px] flex-1 md:mt-[64px] lg:mt-[72px]">
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped></style>
