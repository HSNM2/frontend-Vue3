<template>
  <div
    v-if="loginModal"
    @click="handleBackdropClick"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full rounded-md bg-white p-6 shadow">
        <div class="text-end">
          <span @click="loginModal = false" class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <VForm ref="loginForm" v-slot="{ meta }" @submit="onSubmit">
          <h2 class="mb-6 text-center text-2xl font-bold text-primary-5">歡迎回來！</h2>
          <div class="mb-6">
            <VField
              class="w-full rounded-lg border py-2 pl-2 text-lg"
              id="usernameInput"
              name="email"
              type="email"
              rules="email|required"
              v-model="email"
              placeholder="請輸入信箱"
              autocomplete="username"
            />
            <ErrorMessage class="mb-3 text-red-800" name="email" />
          </div>
          <div class="mb-3">
            <p class="mb-1">密碼</p>
            <VField
              class="w-full rounded-lg border py-2 pl-2 text-lg"
              name="password"
              type="password"
              rules="alpha_num|required|min:8"
              placeholder="請輸入密碼"
              v-model="password"
              label="密碼"
              autocomplete="current-password"
            />
            <ErrorMessage class="mb-3 text-red-800" name="password" />
          </div>
          <div class="mb-8 flex items-center justify-between">
            <div>
              <input type="checkbox" id="keep-login" class="mr-2" />
              <label for="keep-login">維持登入狀態</label>
            </div>
            <button class="text-neutral-700 underline">忘記密碼?</button>
          </div>
          <button
            type="submit"
            class="btn-primary block w-full text-center"
            :disabled="!meta.valid"
          >
            登入
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import useErrorHandler from '../composables/useErrorHandler.js'
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { FormContext } from 'vee-validate'
import { useStatusStore } from '@/stores/status'
import { useAuthStore } from '@/stores/auth'

const { showError } = useErrorHandler()
const { updateLoading } = useStatusStore()

const auth = useAuthStore()
const { login, getUser } = auth
const { loginModal } = storeToRefs(auth)

const modalContent = ref<HTMLInputElement | null>(null)
const loginForm = ref<FormContext | null>(null)
// const usernameInput = ref<HTMLElement | null>(null)

watch(loginModal, (newVal) => {
  if (newVal) {
    reset()
    nextTick(() => {
      loginForm.value?.resetForm()
    })
  }
})

const email = ref('')
const password = ref('')

function reset() {
  email.value = ''
  password.value = ''
}

function onSubmit() {
  updateLoading(true)

  login({
    email: email.value,
    password: password.value
  })
    .then(() => {
      reset()
      loginModal.value = false
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
    loginModal.value = false
  }
}

// watch(usernameInput, () => {
//   usernameInput.value?.focus()
// })
</script>
