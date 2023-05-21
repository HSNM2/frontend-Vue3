<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">課程資訊</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <VForm ref="form" v-slot="{ meta }" @submit="onSubmit()">
      <!--封面圖片-->
      <div class="mb-6">
        <label for="link" class="form-label">封面圖片</label>
        <div class="h-96 rounded border border-dashed">
          <div class="flex h-full flex-col items-center justify-center">
            <i class="material-icons text-4xl">file_upload</i>
            <div class="mb-2 text-2xl">將檔案拖曳至此或點擊此處選擇檔案</div>
          </div>
        </div>
      </div>
      <!--介紹影片-->
      <div class="mb-6">
        <label for="link" class="form-label">介紹影片</label>
        <VField
          name="link"
          rules="required"
          label="介紹影片"
          v-model="link"
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
          v-model="name"
          v-slot="{ field, errors, meta }"
        >
          <input
            id="name"
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
          v-model="subTitle"
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
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <span class="form-text">列出本課程的學習重點</span>
      </div>
      <!--價格-->
      <label class="form-label mb-2 font-bold">價格</label>
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div class="flex-1">
          <label for="price" class="form-label">銷售價格</label>
          <VField
            name="price"
            rules="required|integer"
            label="銷售價格"
            v-model="price"
            v-slot="{ field, errors, meta }"
          >
            <div class="flex">
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
            v-model="originPrice"
            v-slot="{ field, errors, meta }"
          >
            <div class="flex">
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

      <button type="submit" class="me-3 inline-block" :disabled="!meta.valid">更新</button>
      <button class="inline-block">取消</button>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Bold, Code, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { Link, LinkImage } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Font } from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { ImageInsert } from '@ckeditor/ckeditor5-image'
import { List } from '@ckeditor/ckeditor5-list'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'

const tag = ref('') // 標籤 input

const name = ref('') // 課程名稱
const subTitle = ref('') // 課程副標題
const description = ref('') // 課程簡介
const price = ref(0) // 銷售價格
const originPrice = ref(0) // 原價
const tags = ref(['擠花技巧', '烤製方式']) // 標籤
const image_path = ref('') // 封面圖片
const link = ref('') // 介紹影片

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
const editorData = ref('')

function removeTag(idx: number) {
  tags.value = tags.value.filter((_, tagIdx) => tagIdx !== idx)
}

function addTag() {
  if (tag.value) {
    tags.value.push(tag.value)
    tag.value = ''
  }
}

function onSubmit() {}
</script>
