<template>
  <div
    v-if="registerModal"
    @click="handleBackdropClick"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full bg-white p-6 shadow">
        <div class="text-end">
          <span @click="registerModal = false" class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <VForm ref="registerForm" v-slot="{ meta }" @submit="onSubmit">
          <h2 class="mb-6">註冊</h2>
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
          <div class="mb-6">
            <VField
              class="w-full border"
              name="confirmPassword"
              type="password"
              rules="confirmed:@password"
              placeholder="確認密碼"
              v-model="confirmPassword"
              label="確認密碼"
            />
            <ErrorMessage class="mb-3 text-red-800" name="confirmPassword" />
          </div>
          <button type="submit" class="block w-full p-4 text-center" :disabled="!meta.valid">
            註冊
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import useErrorHandler from '../composables/useErrorHandler'
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/status'
import { useAuthStore } from '@/stores/auth'
import type { FormContext } from 'vee-validate'

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()

const auth = useAuthStore()
const { register } = auth
const { registerModal } = storeToRefs(auth)

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const modalContent = ref<HTMLInputElement | null>(null)
const registerForm = ref<FormContext | null>(null)

watch(registerModal, (newVal) => {
  if (newVal) {
    reset()
    nextTick(() => {
      registerForm.value?.resetForm()
    })
  }
})

function reset() {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}

function onSubmit() {
  updateLoading(true)

  register({
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      })
      reset()
      registerModal.value = false
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
    registerModal.value = false
  }
}
</script>
