import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

interface User {
  name: string
}

export default defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const token = ref(Cookies.get('authToken') || '')
  const user = ref<User | null>(null)

  // loginModal & registerModal 的開關
  const loginModal = ref(false)
  const registerModal = ref(false)

  function removeToken() {
    token.value = ''
    user.value = null
    Cookies.remove('authToken')
  }

  function login(payload: { email: string; password: string }) {
    return axios.post(apiUrl + '/user/login', payload).then((res) => {
      Cookies.set('authToken', 'value', { expires: 7 })
    })
  }

  function register(payload: { email: string; password: string; confirmPassword: string }) {
    return axios.post(apiUrl + '/user/register', payload).then((res) => {})
  }

  function logout() {
    return axios.post(apiUrl + '/user/logout').then((res) => {
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
