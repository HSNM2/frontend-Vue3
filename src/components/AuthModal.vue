<template>
  <div
    @click="handleBackdropClick"
    :class="{ hidden: !authModal }"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full rounded bg-white p-6 shadow">
        <div class="text-end">
          <span @click="authModal = false" class="material-icons cursor-pointer text-black"
            >close</span
          >
        </div>
        <!--登入表單-->
        <VForm
          v-show="authModalType === 'login'"
          ref="loginForm"
          v-slot="{ meta }"
          @submit="onLoginSubmit()"
        >
          <div class="mb-4 flex items-end justify-between">
            <h2 class="text-lg text-neutral-800">登入</h2>
            <a
              href="/"
              class="text-xs text-neutral-600 underline"
              @click.prevent="authModalType = 'register'"
              >不是會員？註冊</a
            >
          </div>
          <div class="mb-6">
            <VField
              name="email"
              rules="email|required"
              v-model="email"
              v-slot="{ field, errors, meta }"
            >
              <input
                type="email"
                class="form-control"
                placeholder="信箱"
                v-bind="field"
                autofocus
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="email" />
            </VField>
          </div>
          <div class="mb-6">
            <VField
              name="password"
              rules="alpha_num|required|min:8"
              v-model="password"
              label="密碼"
              v-slot="{ field, errors, meta }"
            >
              <input
                type="password"
                class="form-control"
                v-bind="field"
                placeholder="密碼"
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="password" />
            </VField>
          </div>
          <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
            確認
          </button>
        </VForm>
        <!--註冊表單-->
        <VForm
          v-show="authModalType === 'register'"
          ref="registerForm"
          v-slot="{ meta }"
          @submit="onRegisterSubmit()"
        >
          <div class="mb-4 flex items-end justify-between">
            <h2 class="text-lg text-neutral-800">註冊</h2>
            <a
              href="/"
              class="text-xs text-neutral-600 underline"
              @click.prevent="authModalType = 'login'"
              >已經是會員?登入</a
            >
          </div>
          <div class="mb-6">
            <VField
              name="email"
              rules="email|required"
              v-model="email"
              v-slot="{ field, errors, meta }"
            >
              <input
                type="email"
                class="form-control"
                placeholder="信箱"
                v-bind="field"
                autofocus
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="email" />
            </VField>
          </div>
          <div class="mb-6">
            <VField
              name="password"
              rules="alpha_num|required|min:8"
              v-model="password"
              label="密碼"
              v-slot="{ field, errors, meta }"
            >
              <input
                type="password"
                class="form-control"
                v-bind="field"
                placeholder="密碼"
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="password" />
            </VField>
          </div>
          <div class="mb-6">
            <VField
              name="confirmPassword"
              rules="confirmed:@password"
              v-model="confirmPassword"
              label="確認密碼"
              v-slot="{ field, errors, meta }"
            >
              <input
                type="password"
                autocomplete="new-password"
                class="form-control"
                v-bind="field"
                placeholder="確認密碼"
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="confirmPassword" />
            </VField>
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
const { login, register } = auth
const { authModal, authModalType } = storeToRefs(auth)

// DOM
const modalContent = ref<HTMLInputElement | null>(null)
const loginForm = ref<FormContext | null>(null)
const registerForm = ref<FormContext | null>(null)

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

watch([authModal, authModalType], ([newAuthModal, newAuthModalType]) => {
  // 切換登入註冊表單 或 打開 authModal
  if (newAuthModal || newAuthModalType) {
    reset()
    nextTick(() => {
      loginForm.value?.resetForm()
      registerForm.value?.resetForm()
    })
  }
})

function reset() {
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}

function onLoginSubmit() {
  updateLoading(true)
  login({
    email: email.value,
    password: password.value
  })
    .then(() => {
      reset()
      authModal.value = false
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

function onRegisterSubmit() {
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
      authModal.value = false
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
    authModal.value = false
  }
}
</script>
