<script setup lang="ts">
import { RouterView } from 'vue-router'

import TheHeader from './components/TheHeader.vue'

import statusStore from './stores/status'
import { storeToRefs } from 'pinia'

const status = statusStore()
const { isLoading } = storeToRefs(status)
</script>

<template>
  <VLoading v-model:active="isLoading" :is-full-page="true" />

  <TheHeader />

  <RouterView />
</template>

<style scoped></style>
