<template>
  <div
    v-if="courseProviderAllowModal"
    @click="handleBackdropClick"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full rounded-md bg-white p-6 shadow">
        <div class="text-end">
          <span
            @click="courseProviderAllowModal = false"
            class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <div class="">
          <h2 class="mb-6 text-center text-2xl font-bold text-primary-5">開課說明</h2>
          <p class="">於本網站提供課程需注意下列事項，並請於確認後按鈕同意：</p>
          <button type="button" class="btn-primary block w-full text-center" @click="onRequest">
            我了解並同意，請幫我開通功能
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useErrorHandler from '../composables/useErrorHandler.js'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/status'
import { useAuthStore } from '@/stores/auth'

const { showError } = useErrorHandler()
const { updateLoading } = useStatusStore()

const auth = useAuthStore()
const { courseProviderAllow } = auth
const { courseProviderAllowModal } = storeToRefs(auth)

const modalContent = ref<HTMLInputElement | null>(null)

function onRequest() {
  updateLoading(true)

  courseProviderAllow({
    identityType: 1
  })
    .then(() => {
      courseProviderAllowModal.value = false
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

function handleBackdropClick(event: Event) {
  if (modalContent.value && !modalContent.value.contains(event.target as Node)) {
    courseProviderAllowModal.value = false
  }
}
</script>
