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
  identity: string
  identityType: number
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const identity = ref<User | null>(null)

  // 登入註冊 Modal
  const authModal = ref(false)
  const authModalType = ref('login') // 表單切換：login | register
  const courseProviderAllowModal = ref(false)

  function login(payload: { email: string; password: string }) {
    return axios.post('/api/user/login', payload).then(() => getUser())
  }

  function register(payload: { email: string; password: string; confirmPassword: string }) {
    return axios.post('/api/user/register', payload)
  }

  function courseProviderAllow(payload: { identityType: number }) {
    return axios.post('/api/user/identity', payload).then(() => getUser())
  }

  function logout() {
    return axios.post('/api/user/logout').then((res) => {
      user.value = null
      return res
    })
  }

  function getUser() {
    return axios.get('/api/user/profile').then((res) => {
      user.value = { ...res.data.data }
      return res
    })
  }

  function getIdentity() {
    return axios.get('/api/user/identity').then((res) => {
      identity.value = { ...res.data.data }
      return res
    })
  }

  return {
    user,

    authModal,
    authModalType,
    courseProviderAllowModal,

    login,
    register,
    courseProviderAllow,
    logout,
    getUser
  }
})
