import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface User {
  name: string
  nickName: string
  gender: string
  birthday: Date
  phone: string
  email: string
  address: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // loginModal & registerModal 的開關
  const loginModal = ref(false)
  const registerModal = ref(false)

  function login(payload: { email: string; password: string }) {
    return axios.post('/api/user/login', payload).then(() => getUser())
  }

  function register(payload: { email: string; password: string; confirmPassword: string }) {
    return axios.post('/api/user/register', payload)
  }

  function logout() {
    return axios.post('/api/user/logout').then((res) => {
      user.value = null
      return res
    })
  }

  function getUser() {
    return axios.get('/api/user/profile').then((res) => {
      user.value = { ...res.data.data, phone: '0944337722' }
      return res
    })
  }

  return {
    user,

    loginModal,
    registerModal,

    login,
    register,
    logout,
    getUser
  }
})
