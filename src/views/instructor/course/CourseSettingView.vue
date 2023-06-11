<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">進階設定</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <ul>
      <li
        class="flex cursor-pointer items-center rounded bg-neutral-150 p-4"
        @click="showDeleteCourseModal = true"
      >
        <i class="material-icons me-3 rounded text-3xl text-red-400">delete_forever</i>
        <div class="inline-block">
          <span>刪除課程</span>
          <br />
          <span class="text-sm text-neutral-500">永久刪除所有課程內容，包含學員名單等紀錄</span>
        </div>
      </li>
    </ul>
  </div>

  <!--刪除課程 Modal-->
  <CommonModal v-model="showDeleteCourseModal">
    <template v-slot:title>確定刪除</template>
    <p class="mb-8 flex items-center justify-center text-red-400">
      <i class="material-icons me-2">info</i>
      <span class="text-lg">注意：這個動作無法復原</span>
    </p>
    <button class="btn-primary mx-auto block w-fit" @click="handleDeleteCourse()">確認</button>
  </CommonModal>
</template>

<script lang="ts" setup>
import CommonModal from '../../../components/CommonModal.vue'
import { ref } from 'vue'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useErrorHandler from '@/composables/useErrorHandler'
import { useStatusStore } from '@/stores/status'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const instructor = useInstructorStore()
const { deleteCourse } = instructor
const { course } = storeToRefs(instructor)

const showDeleteCourseModal = ref(false)
function handleDeleteCourse() {
  updateLoading(true)
  deleteCourse({ id: +route.params.courseId })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      }).then(() => {
        course.value = null
        router.push('/instructor/courses')
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
