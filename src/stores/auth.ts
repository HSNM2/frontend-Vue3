import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

interface User {
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const token = ref<string>(Cookies.get('access_token') || '')
  const user = ref<User | null>(null)

  // loginModal & registerModal 的開關
  const loginModal = ref(false)
  const registerModal = ref(false)

  function removeToken() {
    token.value = ''
    user.value = null
    Cookies.remove('access_token')
  }

  function login(payload: { email: string; password: string }) {
    return axios.post('/api/user/login', payload).then((res) => {
      console.log(res)
      return res
    })
  }

  function register(payload: { email: string; password: string; confirmPassword: string }) {
    return axios.post(apiUrl + '/api/user/register', payload)
  }

  function logout() {
    return axios.post(apiUrl + '/api/user/logout').then((res) => {
      removeToken()
    })
  }

  return {
    token,
    user,

    loginModal,
    registerModal,

    login,
    register,
    logout
  }
})
