<template>
  <div
    v-if="loginModal"
    @click="handleBackdropClick"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full rounded bg-white p-6 shadow">
        <div class="text-end">
          <span @click="loginModal = false" class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <VForm ref="loginForm" v-slot="{ meta }" @submit="onSubmit">
          <h2 class="mb-6 text-center text-lg text-neutral-800">登入</h2>
          <div class="mb-6">
            <VField
              name="email"
              type="email"
              rules="email|required"
              v-model="email"
              v-slot="{ field, errors }"
            >
              <input
                id="email"
                class="form-control"
                placeholder="信箱"
                v-bind="field"
                :class="{ invalid: !!errors.length }"
              />
            </VField>
            <ErrorMessage class="invalid-feedback" name="email" />
          </div>
          <div class="mb-6">
            <VField
              name="password"
              type="password"
              rules="alpha_num|required|min:8"
              v-model="password"
              label="密碼"
              v-slot="{ field, errors }"
            >
              <input
                id="password"
                class="form-control"
                v-bind="field"
                placeholder="密碼"
                :class="{ invalid: !!errors.length }"
              />
            </VField>
            <ErrorMessage class="invalid-feedback" name="password" />
          </div>
          <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
            確認
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
</script>
