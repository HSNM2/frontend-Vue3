<template>
  <div class="mb-4 rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">{{ chapter && chapter.title }}</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <div class="mb-6">
      <label for="lesson" class="form-label">單元名稱</label>
      <VField
        v-model.trim="lessonTitle"
        name="lesson"
        type="text"
        rules="required"
        label="單元名稱"
        v-slot="{ field, errors }"
      >
        <input
          id="lesson"
          class="form-control"
          v-bind="field"
          :class="{ invalid: !!errors.length }"
        />
      </VField>
      <ErrorMessage class="invalid-feedback" name="lesson" />
    </div>
    <div class="mb-6">
      <label for="" class="form-label">單元內容</label>
      <div class="rounded border">
        <nav class="flex border-b px-6 pt-2">
          <a
            href="#"
            class="px-4 py-2"
            :class="{ 'border-b-2 border-primary-4': selectedChapterType === 'file' }"
            @click.prevent="selectedChapterType = 'file'"
            >上傳檔案</a
          >
          <a
            href="#"
            class="px-4 py-2"
            @click.prevent="selectedChapterType = 'videoUrl'"
            :class="{ 'border-b-2 border-primary-4': selectedChapterType === 'videoUrl' }"
            >嵌入影片網址</a
          >
        </nav>
        <div class="p-6">
          <div v-if="selectedChapterType === 'file'" class="h-96 rounded border border-dashed">
            <VField
              rules="ext:mp4,mov"
              name="file"
              v-slot="{ handleChange, handleBlur }"
              @drag="dragFile"
              @dragover="ondragover"
            >
              <label for="lessonFile">
                <span class="block flex h-full flex-col items-center justify-center">
                  <i class="material-icons text-4xl">file_upload</i>
                  <span class="mb-2 block text-2xl">將檔案拖曳至此或點擊此處選擇檔案</span>
                  <span class="block text-neutral-600">
                    檔案格式限定為 .JPG、.PNG、MP4、MP3、AVI、DOC、DOCX、XLSX、XLS、PPT、PPTX、PDF,
                    RAR 以及 ZIP
                  </span>
                </span>
              </label>
              <input
                id="lessonFile"
                type="file"
                class="absolute hidden"
                @change="handleChange"
                @blur="handleBlur"
              />
            </VField>
          </div>
          <div v-if="selectedChapterType === 'videoUrl'">
            <div class="mb-6 border-b pb-6">
              <label for="url" class="form-label">網址</label>
              <VField
                name="url"
                type="text"
                rules="required"
                v-model.trim="url"
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
      <button class="me-4">更新</button>
      <button class="text-neutral-500" @click="cancel()">取消</button>
      <button class="ms-auto text-red-500">刪除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import useErrorHandler from '@/composables/useErrorHandler'
import { useStatusStore } from '@/stores/status'

const route = useRoute()
const router = useRouter()

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const instructor = useInstructorStore()
const { getCourseChapter } = instructor
const { chapter } = storeToRefs(instructor)

const lessonTitle = ref('')

const selectedChapterType = ref('file') // file, videoUrl
const videoUrl = ref('')
const url = ref('')

onMounted(() => {
  updateLoading(true)
  getCourseChapter({ courseId: +route.params.courseId, chapterId: +route.params.chapterId })
    .then(() => {})
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })

  if (route.params.lessonId) {
    lessonTitle.value = '單元1：餅乾麵糰製作'
  } else {
    lessonTitle.value = ''
  }
})

function cancel() {
  router.back()
}

function dragFile() {
  console.log('drag')
}

function ondragover() {
  console.log('dragover')
}
</script>
