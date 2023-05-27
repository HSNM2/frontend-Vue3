<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">章節管理</h1>
    <button class="btn-primary" @click="showAddChapterModal = true">新增章節</button>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <draggable
      v-if="chapters.length !== 0"
      class="dragArea"
      :list="chapters"
      item-key="id"
      handle=".js-draggable"
      :group="{ name: 'g1' }"
    >
      <template #item="{ element: chapter, index: chapterIdx }">
        <div class="relative mb-8 rounded border bg-neutral-50">
          <div class="group flex h-14 items-center pe-12 ps-4">
            <i class="material-icons js-draggable me-2 cursor-row-resize">sort</i>
            <template v-if="!chapter.isEdit">
              <span class="me-4">{{ chapter.title }}</span>
              <i
                class="material-icons me-4 hidden cursor-pointer text-red-400 group-hover:block"
                @click="deleteChapter(chapter.id)"
                >delete_outline</i
              >
              <i
                class="material-icons hidden cursor-pointer text-neutral-400 group-hover:block"
                @click="showEditChapterTitle(chapterIdx)"
                >edit</i
              >
            </template>
            <template v-else>
              <input
                v-model.trim="edit"
                id="url"
                class="form-control me-4 max-w-sm"
                :class="{ invalid: !edit }"
                @keyup.enter="!!edit && editChapterTitle(chapterIdx)"
              />
              <button class="me-4" :disabled="edit === ''" @click="editChapterTitle(chapterIdx)">
                確定
              </button>
              <button @click="cancelEditChapterTitle(chapterIdx)">取消</button>
            </template>
            <button class="btn-secondary ms-auto" @click="addLesson(chapter.id)">新增單元</button>
          </div>
          <!--展開按鈕-->
          <template v-if="chapter.lessons.length !== 0">
            <input
              checked
              type="checkbox"
              class="peer absolute right-4 top-4 z-10 h-6 w-6 cursor-pointer opacity-0"
            />
            <span
              class="material-icons absolute right-4 top-4 rotate-0 transition-transform transition-transform duration-300 peer-checked:rotate-180"
              >keyboard_arrow_down</span
            >
          </template>
          <draggable
            :key="chapter.id"
            class="max-h-0 overflow-hidden bg-neutral-100 transition-all duration-300 peer-checked:max-h-full"
            tag="ul"
            :group="{ name: 'g2' }"
            :list="chapter.lessons"
            item-key="id"
            handle=".js-draggable"
          >
            <template #item="{ element: lesson, index: lessonIdx }">
              <li class="border">
                <div
                  @click="editLesson(chapter.id, lesson.id)"
                  class="flex cursor-pointer items-center p-4"
                >
                  <i class="material-icons js-draggable me-2 cursor-row-resize">sort</i>
                  <span class="me-3">{{ lesson.title }}</span>
                  <span
                    :class="[lesson.is_publish ? 'text-emerald-700' : 'text-neutral-600']"
                    class="rounded-full border bg-neutral-50 px-4 py-1 text-sm"
                    >{{ lesson.is_publish ? '已發布' : '未發布' }}</span
                  >
                  <i class="material-icons me-4 ms-auto cursor-pointer text-neutral-800"
                    >visibility</i
                  >
                  <i
                    :class="[lesson.is_publish ? 'text-emerald-700' : 'text-neutral-600']"
                    class="material-icons cursor-pointer"
                    >check_circle_outline</i
                  >
                </div>
              </li>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
    <div v-else>尚無章節</div>
  </div>

  <!--新增章節 Modal-->
  <CommonModal v-model="showAddChapterModal">
    <template v-slot:title>新增章節</template>
    <VForm ref="addChapterForm" v-slot="{ meta }" @submit="addChapter">
      <div class="mb-6">
        <VField
          name="chapter"
          type="text"
          rules="required"
          v-model="chapterTitle"
          v-slot="{ field, errors, meta }"
          label="章節"
        >
          <input
            id="chapter"
            class="form-control"
            placeholder="輸入章節標題"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="chapter" />
        </VField>
      </div>
      <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
        新增
      </button>
    </VForm>
  </CommonModal>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import type { FormContext } from 'vee-validate'
import draggable from 'vuedraggable'
import CommonModal from '../../../components/CommonModal.vue'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/status'
import useErrorHandler from '@/composables/useErrorHandler'

const router = useRouter()
const route = useRoute()

const { updateLoading } = useStatusStore()
const { showError } = useErrorHandler()

const instructor = useInstructorStore()
const { getCourseChapters, addCourseChapter, deleteCourseChapter, editCourseChapterTitle } =
  instructor
const { chapters, course } = storeToRefs(instructor)

onMounted(() => {
  updateLoading(true)
  getCourseChapters({ courseId: +route.params.courseId })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
})

//
// 章節
//
function deleteChapter(chapterId: number) {
  Swal.fire({
    icon: 'warning',
    title: '確定刪除嗎？',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      updateLoading(true)
      deleteCourseChapter({ courseId: +route.params.courseId, chapterId })
        .then(() => {})
        .catch((err) => {
          showError(err)
        })
        .finally(() => {
          updateLoading(false)
        })
    }
  })
}

const edit = ref('')

function showEditChapterTitle(chapterIdx: number) {
  chapters.value = chapters.value.map((chapter) => ({
    ...chapter,
    isEdit: false
  }))
  edit.value = chapters.value[chapterIdx].title
  chapters.value[chapterIdx].isEdit = true
}

function editChapterTitle(chapterIdx: number) {
  updateLoading(true)
  editCourseChapterTitle({
    courseId: +route.params.courseId,
    chapterId: chapters.value[chapterIdx].id,
    chapterTitle: edit.value
  })
    .then(() => {
      chapters.value[chapterIdx].title = edit.value
      chapters.value[chapterIdx].isEdit = false
      edit.value = ''
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

function cancelEditChapterTitle(chapterIdx: number) {
  chapters.value[chapterIdx].isEdit = false
  edit.value = ''
}

//
// 新增章節 modal
//
const showAddChapterModal = ref(false)
const addChapterForm = ref<FormContext | null>(null)

const chapterTitle = ref('') // 新增章節

watch(showAddChapterModal, () => {
  chapterTitle.value = ''
  nextTick(() => {
    addChapterForm.value?.resetForm()
  })
})

function addChapter() {
  updateLoading(false)
  addCourseChapter({ courseId: +route.params.courseId, chapterTitle: chapterTitle.value })
    .then(() => {
      chapterTitle.value = ''
      showAddChapterModal.value = false
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

//
// 單元
//
function addLesson(chapterId: number) {
  router.push(`/instructor/course/${+route.params.courseId}/chapter/${chapterId}/lesson`)
}

function editLesson(chapterId: number, lessonId: number) {
  router.push(
    `/instructor/course/${+route.params.courseId}/chapter/${chapterId}/lesson/${lessonId}`
  )
}
</script>
