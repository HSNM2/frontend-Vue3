<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">章節管理</h1>
    <button class="btn-primary" @click="showAddChapterModal = true">新增章節</button>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <ul>
      <li class="relative mb-6 rounded border bg-neutral-50">
        <div class="group flex h-14 items-center pe-12 ps-4">
          <i class="material-icons me-2">sort</i>
          <template v-if="!isEdit">
            <span class="me-4">第一章：產品設計的核心觀念</span>
            <i
              class="material-icons me-4 hidden cursor-pointer text-red-400 group-hover:block"
              @click="deleteChapter(1)"
              >delete_outline</i
            >
            <i
              class="material-icons hidden cursor-pointer text-neutral-400 group-hover:block"
              @click="isEdit = true"
              >edit</i
            >
          </template>
          <template v-else>
            <input
              v-model.trim="edit"
              id="url"
              class="form-control me-4 max-w-sm"
              :class="{ invalid: !edit }"
              @keyup.enter="!!edit && editSubmit()"
            />
            <button class="me-4" :disabled="edit === ''" @click="editSubmit()">確定</button>
            <button @click="isEdit = false">取消</button>
          </template>
          <button class="btn-secondary z-20 ms-auto">新增單元</button>
        </div>
        <input
          checked
          type="checkbox"
          class="peer absolute right-4 top-4 z-10 h-6 w-6 cursor-pointer opacity-0"
        />
        <span
          class="material-icons absolute right-4 top-4 rotate-0 transition-transform transition-transform duration-300 peer-checked:rotate-180"
          >keyboard_arrow_down</span
        >
        <ul
          class="max-h-0 overflow-hidden bg-neutral-100 transition-all duration-300 peer-checked:max-h-full"
        >
          <li class="border">
            <RouterLink
              to="/instructor/course/123456789/chapter/33333/lesson/44444"
              class="flex items-center p-4"
            >
              <i class="material-icons me-2">sort</i>
              <span class="me-3">單元1：產品設計的核心觀念</span>
              <span class="rounded-full border bg-neutral-50 px-4 py-1 text-sm text-emerald-700"
                >已發布</span
              >
              <i class="material-icons me-4 ms-auto cursor-pointer text-neutral-800">visibility</i>
              <i class="material-icons cursor-pointer text-emerald-700" title="已發布"
                >check_circle_outline</i
              >
            </RouterLink>
          </li>
          <li class="flex items-center border p-4">
            <i class="material-icons me-2">sort</i>
            <span class="me-3">單元2：UI/UX設計師理念</span>
            <span class="rounded-full border bg-neutral-50 px-4 py-1 text-sm text-neutral-600"
              >草稿</span
            >
            <i class="material-icons me-4 ms-auto cursor-pointer text-neutral-800">visibility</i>
            <i class="material-icons cursor-pointer text-neutral-800" title="發布"
              >check_circle_outline</i
            >
          </li>
        </ul>
      </li>
    </ul>

    <draggable
      v-model="chapters"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
  </div>

  <!--新增章節 Modal-->
  <CommonModal v-model="showAddChapterModal">
    <template v-slot:title>新增章節</template>
    <VForm ref="loginForm" v-slot="{ meta }" @submit="addChapter">
      <div class="mb-6">
        <VField
          name="chapter"
          type="text"
          rules="required"
          v-model="chapter"
          v-slot="{ field, errors }"
          label="章節"
        >
          <input
            id="chapter"
            class="form-control"
            placeholder="輸入章節標題"
            v-bind="field"
            :class="{ invalid: !!errors.length }"
          />
        </VField>
        <ErrorMessage class="invalid-feedback" name="chapter" />
      </div>
      <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
        新增
      </button>
    </VForm>
  </CommonModal>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import CommonModal from '../../../components/CommonModal.vue'
import draggable from 'vuedraggable'

const drag = ref(false)
const showAddChapterModal = ref(false)
const chapters = ref([{ name: '1' }, { name: '2' }, { name: '3' }])
const chapter = ref('')
const edit = ref('第一章：產品設計的核心觀念')
const isEdit = ref(false)

function editSubmit() {
  console.log('edit success')
  isEdit.value = false
}

function addChapter() {
  console.log('addChapter')
}

function deleteChapter(idx: number) {
  Swal.fire({
    icon: 'warning',
    title: '確定刪除嗎？',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('確定刪除', idx)
    }
  })
}

onMounted(() => {
  nextTick(() => {
    ;(document.querySelector('main') as HTMLElement).style.minHeight = `calc(100vh - ${
      (document.querySelector('header') as HTMLElement).offsetHeight
    }px - ${(document.querySelector('footer') as HTMLElement).offsetHeight}px)`
  })
})
</script>
