import Swal from 'sweetalert2'
import type { AxiosError } from 'axios'
import axios from 'axios'

export default function useErrorHandler() {
  function showError(err: AxiosError) {
    if (axios.isAxiosError(err)) {
      return Swal.fire({
        icon: 'error',
        title: err.response?.data?.message || '發生錯誤'
      })
    }
    return Swal.fire({
      icon: 'error',
      title: '發生錯誤'
    })
  }

  return {
    showError
  }
}
