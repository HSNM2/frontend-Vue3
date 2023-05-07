import Swal from 'sweetalert2'
import type { AxiosError } from 'axios'

export default function useErrorHandler() {
  function showError(err: AxiosError) {
    return Swal.fire({
      icon: 'error',
      title: err.response?.data?.message || '發生錯誤'
    })
  }

  return {
    showError
  }
}
