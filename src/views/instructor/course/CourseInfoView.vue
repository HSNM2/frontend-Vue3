<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">課程資訊</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <VForm ref="form" v-slot="{}" @submit="onSubmit()">
      <!--封面圖片-->
      <div class="mb-6">
        <label for="link" class="form-label">封面圖片</label>
        <div class="group relative h-96 rounded border border-dashed hover:border-primary-4">
          <template v-if="coverImage">
            <img :src="coverImage" alt="cover" class="mx-auto h-full w-auto object-contain" />
            <div
              v-if="showProgressBar"
              class="absolute bottom-0 left-0 h-2.5 w-full bg-gray-200 dark:bg-gray-300"
            >
              <div
                class="h-2.5 bg-blue-600 transition-all duration-700 dark:bg-primary-5"
                :style="`width: ${uploadProcessPercent}%`"
              ></div>
            </div>
            <div
              v-else
              class="absolute bottom-0 left-0 flex h-0 w-full items-center justify-center overflow-hidden rounded-b bg-black/60 transition-all duration-100 group-hover:h-11"
            >
              <a href="#" class="me-8 text-neutral-100" @click.prevent="deleteCover">刪除</a>
              <label
                for="coverImageFile"
                class="cursor-pointer rounded border px-3 text-neutral-100"
              >
                更換
              </label>
            </div>
          </template>
          <label for="coverImageFile" class="w-full" :class="{ hidden: coverImage }">
            <span
              class="block h-96 rounded border border-dashed hover:border-primary-4"
              :class="[isDragging ? 'border-primary-4' : '']"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onChangeFile"
            >
              <span class="flex h-full flex-col items-center justify-center">
                <i class="material-icons text-4xl">file_upload</i>
                <span class="mb-2 block text-2xl">將檔案拖曳至此或點擊此處選擇圖片</span>
              </span>
            </span>
            <input
              id="coverImageFile"
              type="file"
              accept=".png, .jpg"
              class="absolute hidden"
              @change="handleChange"
            />
          </label>
        </div>
      </div>
      <!--介紹影片-->
      <div class="mb-6">
        <label for="link" class="form-label">介紹影片</label>
        <VField
          name="link"
          rules="required"
          label="介紹影片"
          v-model="course!.link"
          v-slot="{ field, errors, meta }"
        >
          <input
            id="link"
            type="text"
            class="form-control"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="link" />
          <span v-if="!errors.length" class="form-text"
            >嵌入影片網址，支援 Vimeo 以及 Youtube 連結</span
          >
        </VField>
      </div>
      <!--課程名稱-->
      <div class="mb-6">
        <label for="name" class="form-label">課程名稱</label>
        <VField
          name="name"
          rules="required"
          label="課程名稱"
          v-model="course!.title"
          v-slot="{ field, errors, meta }"
        >
          <input
            id="title"
            type="text"
            class="form-control"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="name" />
          <span v-if="!errors.length" class="form-text"
            >一個吸睛且簡單的課程名稱可以幫助你吸引更多學生</span
          >
        </VField>
      </div>
      <!--課程副標題-->
      <div class="mb-6">
        <label for="subTitle" class="form-label">課程副標題</label>
        <VField
          name="subTitle"
          rules="required"
          label="課程副標題"
          v-model="course!.subTitle"
          v-slot="{ field, errors, meta }"
        >
          <input
            id="subTitle"
            type="text"
            class="form-control"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="subTitle" />
          <span v-if="!errors.length" class="form-text"
            >顯示在課程名稱下方，你可以替課程增加額外的說明，精神口號或標語</span
          >
        </VField>
      </div>
      <!--標籤-->
      <div class="mb-6">
        <label for="tag" class="form-label">標籤</label>
        <input
          id="tag"
          type="text"
          class="form-control"
          v-model.trim="tag"
          @keyup.enter="addTag()"
        />
        <span class="form-text">新增5個跟課程相似的分類，讓喜愛類別的學習者能找到你的影片</span>
        <ul class="flex flex-wrap gap-3 pt-2">
          <li
            v-for="(tag, idx) in tags"
            :key="idx"
            class="inline-flex items-center rounded-2.5xl bg-secondary-2 px-3 py-1"
          >
            <span class="me-2 text-sm">＃{{ tag }}</span>
            <i
              class="material-icons cursor-pointer text-sm text-neutral-800 hover:text-neutral-900"
              @click="removeTag(idx)"
              >close</i
            >
          </li>
        </ul>
      </div>
      <!--課程簡介-->
      <div class="mb-6">
        <label for="description" class="form-label">課程簡介</label>
        <div class="prose max-w-none">
          <ckeditor
            :editor="editor"
            v-model="course!.description"
            :config="editorConfig"
          ></ckeditor>
        </div>
        <span class="form-text">列出本課程的學習重點</span>
      </div>
      <!--課程分類-->
      <label class="form-label mb-2 font-bold">課程分類</label>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div class="flex-1">
          <label for="category" class="form-label">課程類型</label>
          <VField
            name="category"
            rules="required"
            label="課程類型"
            v-model="course!.category"
            v-slot="{ field, errors, meta }"
          >
            <div class="flex">
              <select
                id="category"
                class="form-control rounded-s-none pe-7 text-right"
                v-bind="field"
                :class="{ invalid: meta.validated && !!errors.length }"
              >
                <option value="麵包" selected>麵包</option>
              </select>
            </div>
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="price" />
          </VField>
        </div>
        <div class="flex-1">
          <label for="type" class="form-label">細節種類</label>
          <VField
            name="type"
            rules="required"
            label="細節種類"
            v-model="course!.type"
            v-slot="{ field, errors, meta }"
          >
            <div class="flex">
              <select
                id="type"
                class="form-control rounded-s-none pe-7 text-right"
                v-bind="field"
                :class="{ invalid: meta.validated && !!errors.length }"
              >
                <option value="法國麵包" selected>法國麵包</option>
              </select>
            </div>
          </VField>
        </div>
      </div>
      <!--課程公開模式-->
      <label class="form-label mb-2 font-bold">課程公開模式</label>
      <VField
        name="courseStatus"
        rules="required"
        label="課程公開模式"
        v-model="course!.courseStatus"
        v-slot="{ field, errors, meta }"
      >
        <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div class="flex flex-1 gap-x-6">
            <div class="border-1 flex w-1/2 rounded border p-3" @click="course!.courseStatus = '1'">
              <div class="p-1">
                <input
                  id="courseStatus"
                  type="radio"
                  value="false"
                  class="form-control h-4 w-4"
                  v-bind="field"
                  :class="{ invalid: meta.validated && !!errors.length }"
                  :checked="course!.courseStatus == '1'"
                />
              </div>
              <div>
                <span class="block font-bold">付費課程</span>
                <span class="text-sm">可設定售價與優惠條件的付費型內容。</span>
              </div>
            </div>
            <div class="border-1 flex w-1/2 rounded border p-3" @click="course!.courseStatus = '2'">
              <div class="p-1">
                <input
                  id="courseStatus"
                  type="radio"
                  value="false"
                  class="form-control h-4 w-4"
                  v-bind="field"
                  :class="{ invalid: meta.validated && !!errors.length }"
                  :checked="course!.courseStatus == '2'"
                />
              </div>
              <div>
                <span class="block font-bold">公開課程</span>
                <span class="text-sm">任何人無需登入即可觀看完整內容，內容全部免費。</span>
              </div>
            </div>
          </div>
        </div>
      </VField>
      <!--價格-->
      <label class="form-label mb-2 font-bold">價格</label>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div class="flex-1">
          <label for="price" class="form-label">銷售價格</label>
          <VField
            name="price"
            rules="required|integer"
            label="銷售價格"
            v-model="course!.price"
            v-slot="{ field, errors, meta }"
          >
            <div class="relative flex">
              <span
                class="m-auto h-full w-10 rounded-l border border-r-0 border-neutral-400 bg-neutral-200 py-1.5 text-center"
              >
                $
              </span>
              <input
                id="price"
                type="text"
                class="form-control rounded-s-none pe-7 text-right"
                v-bind="field"
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <span class="absolute right-2 top-1/2 -translate-y-1/2 transform">元</span>
            </div>
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="price" />
          </VField>
        </div>
        <div class="flex-1">
          <label for="price" class="form-label">原價</label>
          <VField
            name="originPrice"
            rules="required|integer"
            label="原價"
            v-model="course!.originPrice"
            v-slot="{ field, errors, meta }"
          >
            <div class="relative flex">
              <span
                class="m-auto h-full w-10 rounded-l border border-r-0 border-neutral-400 bg-neutral-200 py-1.5 text-center"
              >
                $
              </span>
              <input
                id="originPrice"
                type="text"
                class="form-control rounded-s-none pe-7 text-right"
                v-bind="field"
                :class="{ invalid: meta.validated && !!errors.length }"
              />
              <span class="absolute right-2 top-1/2 -translate-y-1/2 transform">元</span>
            </div>
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="originPrice" />
            <span v-if="!errors.length" class="form-text"
              >若想同時顯示原價及銷售價,請將原價設定高於銷售價,銷售價將顯示為「優惠價」;若只想顯示銷售價,請將原價設定為0</span
            >
          </VField>
        </div>
      </div>

      <button type="button" class="me-3 inline-block" @click="onSubmit">更新</button>
      <!-- :disabled="!meta.valid" -->
      <button class="inline-block">取消</button>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInstructorStore } from '@/stores/instructor'
import useErrorHandler from '@/composables/useErrorHandler'
import { useStatusStore } from '@/stores/status'
import Swal from 'sweetalert2'

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Bold, Code, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { Link } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Font } from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { ImageInsert } from '@ckeditor/ckeditor5-image'
import { List } from '@ckeditor/ckeditor5-list'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { storeToRefs } from 'pinia'

const instructor = useInstructorStore()
const route = useRoute()

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const { course, getCourse, editCourseInfo, uploadCourseCover, deleteCourseCover } = instructor
const { uploadProcessPercent } = storeToRefs(instructor)

const isDragging = ref(false)

const tag = ref<string>('')
const tags = ref<string[]>([]) // 標籤

const coverImage = ref('') // 課程已有的封面
const coverImageFile = ref<File | null>(null) // 上傳用課程封面
const showProgressBar = ref(false)

const editor = ClassicEditor
const editorConfig = {
  plugins: [
    Essentials,
    Font,
    Alignment,
    Heading,
    Strikethrough,
    Underline,
    Bold,
    Code,
    Italic,
    Link,
    Paragraph,
    ImageInsert,
    List,
    HorizontalLine,
    BlockQuote
  ],
  toolbar: {
    items: [
      'undo',
      'redo',
      'heading',
      'alignment',
      'fontColor',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'bulletedList',
      'numberedList',
      'link',
      'insertImage',
      'blockQuote',
      'horizontalLine'
    ]
  }
}

function courseInfoProcess() {
  getCourse({ id: +route.params.courseId }).then((res) => {
    tagHandle()
    if (course?.description == null) {
      course!.description = ''
    }
    coverImage.value = res?.image_path || ''
  })
}

// 檔案上傳
function onChangeFile(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files[0]) {
    coverImageFile.value = e.dataTransfer.files[0]
    uploadCover()
  }
}

function handleChange(e: Event) {
  const files: FileList | null = (e.target as HTMLInputElement).files
  if (files && files.length !== 0) {
    coverImageFile.value = files[0]
    uploadCover()
  }
}

function uploadCover() {
  const formData = new FormData()
  formData.append('courseId', route.params.courseId.toString())
  if (coverImageFile.value) {
    formData.append('coverPhoto', coverImageFile.value)
  }
  showProgressBar.value = true

  uploadCourseCover(formData)
    .then((res) => {
      coverImage.value = res.data.data.imagePath
      coverImageFile.value = null
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      showProgressBar.value = false
    })
}

function deleteCover() {
  updateLoading(true)
  deleteCourseCover(+route.params.courseId)
    .then(() => {
      coverImage.value = ''
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

function tagHandle() {
  if (typeof course!.tag == 'string') {
    tags.value = course!.tag.split(',')
  } else {
    return
  }
}

function removeTag(idx: number) {
  tags.value = tags.value.filter((_, tagIdx) => tagIdx !== idx)
}

function addTag() {
  if (tag.value) {
    tags.value.push(tag.value)
    tag.value = ''
  }
}

function onSubmit() {
  course!.tag = tags.value
  editCourseInfo({ id: +route.params.courseId, data: course! }).then((res) => {
    if (res.data.status == true) {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      })
      courseInfoProcess()
    }
  })
}

onMounted(() => {
  courseInfoProcess()
})
</script>
