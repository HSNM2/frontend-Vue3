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

  <TheHeader />

  <RouterView />

  <TheFooter />
</template>

<style scoped></style>
