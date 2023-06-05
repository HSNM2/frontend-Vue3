<template>
  <div class="mb-4 rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">{{ chapter && chapter.title }}</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <VForm ref="lessonForm" v-slot="{ meta }" @submit="onSubmit">
      <div class="mb-6">
        <label for="lesson" class="form-label">單元名稱</label>
        <VField
          v-model.trim="lessonTitle"
          name="lessonTitle"
          rules="required"
          label="單元名稱"
          v-slot="{ field, errors, meta }"
        >
          <input
            type="text"
            id="lesson"
            class="form-control"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="lessonTitle" />
        </VField>
      </div>
      <div class="mb-6">
        <label for="" class="form-label">單元內容</label>
        <div class="rounded border">
          <nav class="flex border-b px-6 pt-2">
            <a
              href="#"
              class="px-4 py-2"
              :class="{ 'border-b-2 border-primary-4': selectedLessonType === 'file' }"
              @click.prevent="selectedLessonType = 'file'"
              >上傳檔案</a
            >
            <a
              href="#"
              class="px-4 py-2"
              @click.prevent="selectedLessonType = 'mediaUrl'"
              :class="{ 'border-b-2 border-primary-4': selectedLessonType === 'mediaUrl' }"
              >嵌入影片網址</a
            >
          </nav>
          <div class="p-6">
            <div v-if="selectedLessonType === 'file'">
              <div v-if="lessonVideoUrl" class="h-96 w-full">
                <VideoPlayer
                  :src="lessonVideoUrl"
                  controls
                  class="h-full w-full"
                  :playbackRates="[0.5, 1, 1.5, 2]"
                  preload="auto"
                ></VideoPlayer>
              </div>
              <template v-else>
                <div v-if="lessonFile" class="flex items-center">
                  <span>{{ lessonFile.name }}</span>
                  <span
                    class="ms-auto flex cursor-pointer items-center text-red-400"
                    @click="removeLessonFile"
                  >
                    <i class="material-icons me-1">delete_forever</i>移除</span
                  >
                </div>
                <VField v-else rules="required|ext:mp4,mov" name="file" v-slot="{ handleBlur }">
                  <label for="lessonFile">
                    <span
                      class="block h-96 rounded border border-dashed hover:border-primary-4"
                      :class="[isDragging ? 'border-primary-4' : '']"
                      @dragover.prevent="isDragging = true"
                      @dragleave.prevent="isDragging = false"
                      @drop.prevent="onChangeFile"
                    >
                      <span class="flex h-full flex-col items-center justify-center">
                        <i class="material-icons text-4xl">file_upload</i>
                        <span class="mb-2 block text-2xl">將檔案拖曳至此或點擊此處選擇檔案</span>
                        <span class="block text-neutral-600">
                          檔案格式限定為
                          .JPG、.PNG、MP4、MP3、AVI、DOC、DOCX、XLSX、XLS、PPT、PPTX、PDF, RAR 以及
                          ZIP
                        </span>
                      </span>
                    </span>
                    <input
                      id="lessonFile"
                      type="file"
                      class="absolute hidden"
                      @change="handleChange"
                      @blur="handleBlur"
                    />
                  </label>
                </VField>
              </template>
            </div>
            <div v-if="selectedLessonType === 'mediaUrl'">
              <div class="mb-6 border-b pb-6">
                <label for="url" class="form-label">網址</label>
                <VField
                  name="url"
                  type="text"
                  rules="required"
                  v-model.trim="lessonMediaUrl"
                  label="網址"
                  v-slot="{ field, errors }"
                >
                  <input
                    id="url"
                    class="form-control"
                    v-bind="field"
                    placeholder="https://vimeo.com/... 或是 https://youtube.com/..."
                    :class="{ invalid: !!errors.length }"
                  />
                  <span class="text-xs text-neutral-400">支援Vimeo以及Youtube連結</span>
                </VField>
                <ErrorMessage class="invalid-feedback" name="url" />
              </div>
              <button class="ms-auto block w-fit">新增</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <button class="me-5" type="submit" :disabled="!meta.valid">
          {{ lesson ? '更新' : '新增' }}
        </button>
        <button class="text-neutral-500" @click.prevent="cancel()">取消</button>
        <button v-if="lesson" class="ms-auto text-red-500" @click.prevent="deleteLesson">
          刪除
        </button>
      </div>
    </VForm>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import useErrorHandler from '@/composables/useErrorHandler'
import { useStatusStore } from '@/stores/status'
import Swal from 'sweetalert2'
import type { FormContext } from 'vee-validate'
import { VideoPlayer } from '@videojs-player/vue'

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const instructor = useInstructorStore()
const { getCourseChapter, getCourseLesson, addCourseLesson, editCourseLesson, deleteCourseLesson } =
  instructor
const { chapter, lesson } = storeToRefs(instructor)

const lessonForm = ref<FormContext | null>(null)

const isDragging = ref(false)

const lessonTitle = ref('')
const lessonVideoUrl = ref<string>('')

const selectedLessonType = ref('file') // file, mediaUrl
const lessonFile = ref<File | null>(null)
const lessonMediaUrl = ref('')

onMounted(() => {
  updateLoading(true)
  lesson.value = null
  getCourseChapter({ courseId: +route.params.courseId, chapterId: +route.params.chapterId })
    .then(() => {
      if (route.params.lessonId) {
        return getLesson()
      }
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
})

function cancel() {
  router.push(`/instructor/course/${route.params.courseId}`)
}

function getLesson() {
  return getCourseLesson({
    courseId: +route.params.courseId,
    chapterId: +route.params.chapterId,
    lessonId: +route.params.lessonId
  }).then(() => {
    if (lesson.value) {
      lessonTitle.value = lesson.value.title
      lessonVideoUrl.value = lesson.value.videoPath

      nextTick(() => {
        lessonForm.value?.resetForm({
          values: {
            lessonTitle: lessonTitle.value
          }
        })
        lessonForm.value?.validateField('lessonTitle')
      })
    }
  })
}

function deleteLesson() {
  Swal.fire({
    icon: 'warning',
    title: '確定刪除嗎？',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      updateLoading(true)
      deleteCourseLesson({
        courseId: +route.params.courseId,
        chapterId: +route.params.chapterId,
        lessonId: +route.params.lessonId
      })
        .then(() => {
          updateLoading(false)
          router.push(`/instructor/course/${route.params.courseId}`)
        })
        .finally(() => {
          updateLoading(false)
        })
    }
  })
}

// 檔案上傳
function onChangeFile(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files[0]) {
    lessonFile.value = e.dataTransfer.files[0]
  }
}

function handleChange(e: Event) {
  const files: FileList | null = (e.target as HTMLInputElement).files
  if (files && files.length !== 0) {
    lessonFile.value = files[0]
  }
}

function removeLessonFile() {
  lessonFile.value = null
}

function onSubmit() {
  updateLoading(true)

  const formData = new FormData()
  formData.append('title', lessonTitle.value)
  if (lessonFile.value) {
    formData.append('video', lessonFile.value)
  }

  if (route.params.lessonId) {
    editCourseLesson({
      courseId: +route.params.courseId,
      chapterId: +route.params.chapterId,
      lessonId: +route.params.lessonId,
      data: formData
    })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: res.data.data.message
        })
        return getLesson()
      })
      .catch((err) => {
        showError(err)
      })
      .finally(() => {
        updateLoading(false)
      })
  } else {
    addCourseLesson({
      courseId: +route.params.courseId,
      chapterId: +route.params.chapterId,
      data: formData
    })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: res.data.data.message
        })
        updateLoading(false)
        router.push(`/instructor/course/${route.params.courseId}`)
      })
      .catch((err) => {
        showError(err)
      })
      .finally(() => {
        updateLoading(false)
      })
  }
}
</script>
