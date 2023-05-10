<template>
  <h1 class="mb-6 bg-neutral-50 px-8 py-4">會員資料</h1>
  <div class="bg-neutral-50 p-8">
    <VForm ref="profileForm" class="grid grid-cols-2 gap-6" v-slot="{ meta }" @submit="onSubmit">
      <div>
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
      <div>
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
      <div>
        <label for="gender" class="form-label">性別*</label>
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
      <div class="col-span-2 text-end">
        <button type="submit" class="btn-primary" :disabled="!meta.valid">提交</button>
      </div>
    </VForm>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useStatusStore } from '@/stores/status'
import useErrorHandler from '../../composables/useErrorHandler'
import { FormContext } from 'vee-validate'

const { updateLoading } = useStatusStore()
const { showError } = useErrorHandler()

const profileForm = ref<FormContext | null>(null)

const name = ref('')
const nickName = ref('')
const gender = ref('M')

function reset() {
  name.value = ''
  nickName.value = ''
  gender.value = 'M'

  nextTick(() => {
    profileForm.value?.resetForm()
  })
}

onMounted(() => {
  reset()
})

function onSubmit() {
  updateLoading(true)

  axios
    .patch('/api/user/profile', {
      name: name.value,
      nickName: nickName.value,
      gender: gender.value
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      })
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}
</script>
