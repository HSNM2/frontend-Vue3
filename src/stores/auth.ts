import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export default defineStore('statusStore', () => {
  const user = ref(null)

  function login() {}

  function signUp() {}

  return {
    login,
    signUp
  }
})
