import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatusStore = defineStore('status', () => {
  const isLoading = ref(false)

  function updateLoading(status: boolean) {
    isLoading.value = status
  }

  return {
    isLoading,

    updateLoading
  }
})
