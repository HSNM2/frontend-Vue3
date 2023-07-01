<template>
  <div class="relative flex h-full flex-col">
    <h1 class="mb-6 bg-neutral-50 px-8 py-4 text-lg font-semibold text-neutral-800">會員資料</h1>
    <div class="flex-1 bg-neutral-50 p-8">
      <VForm ref="profileForm" class="grid grid-cols-2 gap-8" v-slot="{ meta }" @submit="onSubmit">
        <div class="col-span-2 lg:col-span-1">
          <label for="name" class="form-label">姓名 <span class="text-rose-500">*</span></label>
          <VField
            name="name"
            rules="required"
            type="text"
            v-model.trim="name"
            label="姓名"
            v-slot="{ field, errors }"
          >
            <input
              id="name"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="name" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <label for="nickName" class="form-label">暱稱 <span class="text-rose-500">*</span></label>
          <VField
            name="nickName"
            type="text"
            rules="required"
            v-model.trim="nickName"
            label="暱稱"
            v-slot="{ field, errors }"
          >
            <input
              id="nickName"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="nickName" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <label for="gender" class="form-label">性別 <span class="text-rose-500">*</span></label>
          <VField
            id="gender"
            class="form-control"
            name="gender"
            rules="required"
            v-model="gender"
            label="性別"
            as="select"
          >
            <option value="M">男</option>
            <option value="F">女</option>
          </VField>
          <ErrorMessage class="mb-3 text-red-800" name="gender" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <label for="birthday" class="form-label">生日 <span class="text-rose-500">*</span></label>
          <VDatePicker
            :color="'orange'"
            v-model="birthday"
            :popover="{ visibility: 'click' }"
            :masks="{
              input: 'YYYY-MM-DD'
            }"
            :isRequired="true"
            :max-date="new Date()"
          >
            <template #default="{ inputValue, inputEvents }">
              <div class="relative">
                <span
                  class="material-icons absolute left-3 top-1/2 z-10 -translate-y-2/4 text-neutral-800"
                  >calendar_today</span
                >
                <input :value="inputValue" v-on="inputEvents" class="form-control pl-11" />
              </div>
            </template>
          </VDatePicker>
        </div>
        <div class="col-span-2 lg:col-span-1">
          <label for="phone" class="form-label"
            >聯絡電話 <span class="text-rose-500">*</span></label
          >
          <VField
            name="phone"
            type="text"
            rules="required|numeric|length:10"
            v-model.trim="phone"
            label="聯絡電話"
            v-slot="{ field, errors }"
          >
            <input
              id="phone"
              class="form-control"
              v-bind="field"
              placeholder="請以09為開頭"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="phone" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <label for="email" class="form-label"
            >聯絡信箱 <span class="text-rose-500">*</span></label
          >
          <VField
            name="email"
            type="text"
            rules="required|email"
            v-model.trim="email"
            label="聯絡信箱"
            v-slot="{ field, errors }"
          >
            <input
              disabled
              id="nickName"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="email" />
        </div>
        <div class="col-span-2">
          <label for="address" class="form-label">地址</label>
          <VField
            name="address"
            type="text"
            v-model.trim="address"
            label="地址"
            v-slot="{ field, errors }"
          >
            <input
              id="address"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="address" />
        </div>
        <div class="col-span-2 text-end">
          <button type="submit" class="btn-primary" :disabled="!meta.valid">提交</button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { useStatusStore } from '@/stores/status'
import { useAuthStore } from '@/stores/auth'
import useErrorHandler from '../../composables/useErrorHandler'
import type { FormContext } from 'vee-validate'
import { storeToRefs } from 'pinia'

import { UserRequest } from '@/models/auth'

const { updateLoading } = useStatusStore()
const auth = useAuthStore()
const { getUser } = auth
const { user } = storeToRefs(auth)

const { showError } = useErrorHandler()

const profileForm = ref<FormContext | null>(null)

const name = ref('')
const nickName = ref('')
const gender = ref('M')
const birthday = ref(
  new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
)
const phone = ref('')
const email = ref('')
const address = ref('')

function reset() {
  name.value = user.value?.name || ''
  nickName.value = user.value?.nickName || ''
  gender.value = user.value?.gender || 'M'
  birthday.value = new Date(
    user.value?.birthday ||
      (new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
  )
  phone.value = user.value?.phone || ''
  email.value = user.value?.email || ''
  address.value = user.value?.address || ''
}

onMounted(() => {
  reset()
})

function onSubmit() {
  updateLoading(true)

  UserRequest('patch', {
    name: name.value,
    nickName: nickName.value,
    gender: gender.value,
    birthday: birthday.value,
    phone: phone.value,
    // email: email.value,
    address: address.value
  })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      })

      return getUser()
    })
    .then(() => {
      reset()
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}
</script>
