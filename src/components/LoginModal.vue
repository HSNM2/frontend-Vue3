<template>
  <div
    v-if="loginModal"
    @click="handleBackdropClick"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full bg-white p-6 shadow">
        <div class="text-end">
          <span @click="loginModal = false" class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <VForm ref="loginForm" v-slot="{ meta }" @submit="onSubmit">
          <h2 class="mb-6">登入</h2>
          <div class="mb-6">
            <VField
              class="w-full border"
              name="email"
              type="email"
              rules="email|required"
              v-model="email"
              placeholder="信箱"
            />
            <ErrorMessage class="mb-3 text-red-800" name="email" />
          </div>
          <div class="mb-6">
            <VField
              class="w-full border"
              name="password"
              type="password"
              rules="alpha_num|required|min:8"
              placeholder="密碼"
              v-model="password"
              label="密碼"
            />
            <ErrorMessage class="mb-3 text-red-800" name="password" />
          </div>
          <button type="submit" class="block w-full p-4 text-center" :disabled="!meta.valid">
            登入
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { FormContext } from 'vee-validate'
import statusStore from '../stores/status'
import authStore from '../stores/auth'

const { updateLoading } = statusStore()
const auth = authStore()
const { login } = auth
const { loginModal } = storeToRefs(auth)

const modalContent = ref<HTMLInputElement | null>(null)
const loginForm = ref<FormContext | null>(null)

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
      Swal.fire({
        icon: 'success',
        title: '登入成功'
      })
      reset()
      loginModal.value = false
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: '登入失敗'
      })
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
</script>
