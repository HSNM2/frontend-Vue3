<template>
  <div class="container py-6">
    <div class="mb-6">
      <h3 class="mb-2">button 樣式</h3>
      <button class="btn-primary">btn-primary</button>
    </div>
    <div class="mb-6">
      <h3 class="mb-2">form 樣式</h3>
      <VForm>
        <div class="mb-6">
          <label for="name" class="form-label">名稱 <span class="text-rose-500">*</span></label>
          <VField name="name" type="text" rules="required" label="名稱" v-slot="{ field, errors }">
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
          <VField
            name="username"
            type="text"
            rules="required"
            label="帳號"
            v-slot="{ field, errors }"
          >
            <input
              id="name"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
              placeholder="帳號"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="username" />
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
