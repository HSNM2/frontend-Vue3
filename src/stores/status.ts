import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('statusStore', () => {
  const isLoading = ref(false)

  function changeLoadingStatus(status: boolean) {
    isLoading.value = status
  }

  return {
    isLoading,

    changeLoadingStatus
  }
})
