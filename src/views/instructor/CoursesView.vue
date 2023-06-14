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
        <h1 class="font-bold text-neutral-800">課程列表</h1>
        <button class="btn-primary" @click="showAddCourseModal = true">新增課程</button>
      </div>
      <div class="rounded bg-neutral-50 p-6">
        <div v-if="courses.length === 0">尚未有課程</div>
        <ul v-else class="">
          <li
            class="mb-4 flex flex-col rounded bg-neutral-100 p-6 md:flex-row md:items-center"
            v-for="course in courses"
            :key="course.id"
          >
            <div class="mb-2 flex items-center md:mb-0">
              <div
                class="me-2 h-2 w-2 rounded-full"
                :class="[course.isPublish ? 'bg-success-50' : 'bg-warning-50']"
              ></div>
              <span class="text-sm md:w-20">{{ course.isPublish ? '已發布' : '尚未發布' }}</span>
              <RouterLink
                class="material-icons ms-auto cursor-pointer text-primary-5 md:hidden"
                :to="`/instructor/course/${course.id}`"
                >settings</RouterLink
              >
            </div>
            <img
              :src="course.image_path || 'https://fakeimg.pl/156x88?text=cover'"
              alt="cover"
              class="mb-2 h-22 w-39 object-contain md:mb-0 md:me-4"
            />
            <span class="text-sm md:me-4 md:text-base">{{ course.title }}</span>
            <RouterLink
              class="material-icons ms-auto hidden cursor-pointer text-primary-5 md:block"
              :to="`/instructor/course/${course.id}`"
              >settings</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>

    <!--新增課程 Modal-->
    <CommonModal v-model="showAddCourseModal">
      <template v-slot:title>新增課程</template>
      <VForm ref="addCourseForm" v-slot="{ meta }" @submit="handleAddCourse">
        <div class="mb-6">
          <VField
            name="course"
            type="text"
            rules="required"
            v-model="courseTitle"
            v-slot="{ field, errors, meta }"
            label="課程名稱"
          >
            <input
              id="course"
              class="form-control"
              placeholder="輸入課程名稱"
              v-bind="field"
              :class="{ invalid: meta.validated && !!errors.length }"
            />
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="course" />
          </VField>
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
import { nextTick, onMounted, ref, watch } from 'vue'
import CommonModal from '../../components/CommonModal.vue'
import useSetMinMainHeight from '@/composables/useSetMinMainHeight'
import useErrorHandler from '@/composables/useErrorHandler'
import { useInstructorStore } from '@/stores/instructor'
import { useStatusStore } from '@/stores/status'
import { storeToRefs } from 'pinia'
import type { FormContext } from 'vee-validate'

useSetMinMainHeight()

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()

const instructor = useInstructorStore()
const { getCourses, addCourse } = instructor
const { courses } = storeToRefs(instructor)

onMounted(() => {
  updateLoading(true)
  getCourses()
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
})

const addCourseForm = ref<FormContext | null>(null)
const showAddCourseModal = ref(false)
const courseTitle = ref('')

watch(showAddCourseModal, () => {
  nextTick(() => {
    courseTitle.value = ''
    addCourseForm.value?.resetForm()
  })
})

function handleAddCourse() {
  updateLoading(true)
  addCourse({ title: courseTitle.value })
    .then(() => {
      courseTitle.value = ''
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
      showAddCourseModal.value = false
    })
}
</script>
