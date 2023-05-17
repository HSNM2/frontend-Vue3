<template>
  <main class="flex items-stretch bg-neutral-100">
    <!--左側選單-->
    <aside class="w-72 bg-neutral-50 p-6">
      <span class="text-sm text-neutral-600">產品</span>
      <router-link to="/instructor/courses" class="mb-8 block">課程</router-link>
      <span class="text-sm text-neutral-600">營運</span>
      <router-link to="/" class="block">人員</router-link>
    </aside>
    <!--主內容-->
    <div class="flex-1 bg-neutral-100 p-8">
      <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
        <h1>課程列表</h1>
        <button class="btn-primary" @click="showAddCourseModal = true">新增課程</button>
      </div>
      <div class="rounded bg-neutral-50 p-6">
        <ul class="">
          <li class="mb-4 flex flex-col rounded bg-neutral-100 p-6 md:flex-row md:items-center">
            <div class="mb-2 flex items-center md:mb-0">
              <div class="me-2 h-2 w-2 rounded-full bg-amber-400"></div>
              <span class="text-sm md:w-20">尚未發布</span>
              <RouterLink
                class="material-icons ms-auto cursor-pointer text-primary-5 md:hidden"
                to="/instructor/course/1123333"
                >settings</RouterLink
              >
            </div>
            <img
              src="https://fakeimg.pl/125x80"
              alt=""
              class="mb-2 h-full w-auto md:mb-0 md:me-4"
            />
            <span class="text-sm md:me-4 md:text-base">產品設計實戰：用Figma打造絕佳UI</span>
            <RouterLink
              class="material-icons ms-auto hidden cursor-pointer text-primary-5 md:block"
              to="/instructor/course/1123333"
              >settings</RouterLink
            >
          </li>
          <li class="mb-4 flex flex-col rounded bg-neutral-100 p-6 md:flex-row md:items-center">
            <div class="mb-2 flex items-center md:mb-0">
              <div class="me-2 h-2 w-2 rounded-full bg-amber-400"></div>
              <span class="text-sm md:w-20">尚未發布</span>
              <RouterLink
                class="material-icons ms-auto cursor-pointer text-primary-5 md:hidden"
                to="/instructor/course/1123333"
                >settings</RouterLink
              >
            </div>
            <img
              src="https://fakeimg.pl/125x80"
              alt=""
              class="mb-2 h-full w-auto md:mb-0 md:me-4"
            />
            <span class="text-sm md:me-4 md:text-base">產品設計實戰：用Figma打造絕佳UI</span>
            <RouterLink
              class="material-icons ms-auto hidden cursor-pointer text-primary-5 md:block"
              to="/instructor/course/1123333"
              >settings</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>

    <!--新增課程 Modal-->
    <CommonModal v-model="showAddCourseModal">
      <template v-slot:title>新增課程</template>
      <VForm ref="loginForm" v-slot="{ meta }" @submit="addCourse">
        <div class="mb-6">
          <VField
            name="course"
            type="text"
            rules="required"
            v-model="course"
            v-slot="{ field, errors }"
            label="課程"
          >
            <input
              id="course"
              class="form-control"
              placeholder="輸入課程名稱"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="course" />
        </div>
        <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
          新增
        </button>
      </VForm>
    </CommonModal>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import CommonModal from '../../components/CommonModal.vue'

const showAddCourseModal = ref(false)

const course = ref('')

function addCourse() {}
</script>
