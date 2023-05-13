<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

import { useStatusStore } from './stores/status.js'
import { useAuthStore } from './stores/auth.js'

const status = useStatusStore()
const { isLoading } = storeToRefs(status)

const auth = useAuthStore()
const { getUser } = auth

getUser().catch(() => {})
</script>

<template>
  <VLoading v-model:active="isLoading" :is-full-page="true" />

  <TheHeader />

  <RouterView />

  <TheFooter />
</template>

<style scoped></style>
