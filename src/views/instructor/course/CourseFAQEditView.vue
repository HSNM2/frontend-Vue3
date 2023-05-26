<template>
  <div v-if="!faqs" class="mb-4 rounded bg-neutral-50 px-12 py-8">
    <h2 class="mb-6 text-3xl font-bold text-neutral-900">建立常見問題</h2>
    <p class="mb-6">提供常見問題列表，這將會是提升服務體驗及轉換率的好方法</p>
    <button class="btn-primary" @click="showAddFAQCategoryModal = true">新增問題類別</button>
  </div>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">常見問題管理</h1>
    <button class="btn-primary" @click="showAddFAQCategoryModal = true">新增問題類別</button>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <draggable
      class="dragArea"
      :list="faqs"
      item-key="id"
      handle=".js-draggable"
      :group="{ name: 'g1' }"
    >
      <template #item="{ element: faq }">
        <div class="relative mb-8 rounded border bg-neutral-50">
          <div class="group flex h-14 items-center pe-12 ps-4">
            <i class="material-icons js-draggable me-2 cursor-row-resize">sort</i>
            <template v-if="categoryEditedIdx == faq.id">
              <input
                v-model.trim="categoryEditedContent"
                id="url"
                class="form-control me-4 max-w-sm"
                :class="{ invalid: !edit }"
                @keyup.enter="!!edit && editSubmit()"
              />
              <button class="me-4" :disabled="edit === ''" @click="editSubmit()">確定</button>
              <button @click="categoryEditedIdx = null">取消</button>
            </template>
            <template v-else>
              <span class="me-4">{{ faq.title }}</span>
              <i
                class="material-icons me-4 hidden cursor-pointer text-red-400 group-hover:block"
                @click="deleteFAQCategory(faq.id)"
                >delete_outline</i
              >
              <i
                class="material-icons hidden cursor-pointer text-neutral-400 group-hover:block"
                @click="editCategoryInputHandle(faq.id, faq.title)"
                >edit</i
              >
            </template>

            <button class="btn-secondary ms-auto" @click="addQuestionHandle(faq.id, faq.questions)">
              新增問題內容
            </button>
          </div>
          <input
            checked
            type="checkbox"
            class="peer absolute right-4 top-4 z-10 h-6 w-6 cursor-pointer opacity-0"
          />
          <span
            class="material-icons absolute right-4 top-4 rotate-0 transition-transform duration-300 peer-checked:rotate-180"
            >keyboard_arrow_down</span
          >
          <draggable
            :key="faq.questions.id"
            class="max-h-0 overflow-hidden bg-neutral-100 transition-all duration-300 peer-checked:max-h-full"
            tag="ul"
            :group="{ name: 'g2' }"
            :list="faq.questions"
            item-key="id"
            handle=".js-draggable"
          >
            <template #item="{ element: question }">
              <li class="border">
                <div class="flex items-center justify-between p-4">
                  <div class="flex items-center">
                    <i class="material-icons js-draggable me-2 cursor-row-resize">sort</i>
                    <span class="me-3">{{ question.content }}</span
                    ><span
                      :class="[question.is_publish ? 'text-emerald-700' : 'text-neutral-600']"
                      class="max-h-8 min-w-19 rounded-full border bg-neutral-50 px-4 py-1 text-sm"
                      >{{ question.is_publish ? '已發布' : '未發布' }}</span
                    >
                  </div>
                  <div class="flex items-center">
                    <i
                      class="material-icons cursor-pointer pr-4 text-neutral-400"
                      @click="editQuestionModalHandle(question.id, question.content)"
                      >edit</i
                    >
                    <i
                      :class="[question.is_publish ? 'text-emerald-700' : 'text-neutral-600']"
                      class="material-icons cursor-pointer"
                      @click="question.is_publish = !question.is_publish"
                      >check_circle_outline</i
                    >
                  </div>
                </div>
              </li>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>

  <!--新增問題類別 Modal-->
  <CommonModal v-model="showAddFAQCategoryModal">
    <template v-slot:title>新增問題類別</template>
    <VForm ref="addFAQCategoryForm" v-slot="{ meta }" @submit="addFAQCategory">
      <div class="mb-6">
        <VField
          name="FAQCategory"
          type="text"
          rules="required"
          v-model="FAQCategory"
          v-slot="{ field, errors, meta }"
          label="問題類別"
        >
          <input
            id="FAQCategory"
            class="form-control"
            placeholder="輸入問題類別"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          />
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="FAQCategory" />
        </VField>
      </div>
      <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
        新增
      </button>
    </VForm>
  </CommonModal>

  <!--新增問題內容 Modal-->
  <CommonModal v-model="showAddQuestionModal">
    <template v-slot:title>新增問題內容</template>
    <VForm ref="addQuestionForm" v-slot="{ meta }" @submit="addQuestion">
      <div class="mb-6">
        <VField
          name="question"
          type="text"
          rules="required"
          v-model="question"
          v-slot="{ field, errors, meta }"
          label="問題內容"
        >
          <textarea
            id="question"
            class="form-control"
            placeholder="輸入問題內容"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          ></textarea>
          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="question" />
        </VField>
      </div>
      <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
        新增
      </button>
    </VForm>
  </CommonModal>

  <CommonModal v-model="showEditQuestionModal">
    <template v-slot:title>編輯問題內容</template>
    <VForm ref="editQuestionForm" v-slot="{ meta }" @submit="editQuestion">
      <div class="mb-6">
        <VField
          name="questionEdited"
          type="text"
          rules="required"
          v-model="questionEditedContent"
          v-slot="{ field, errors, meta }"
          label="編輯問題內容"
        >
          <textarea
            id="questionEdited"
            class="form-control"
            placeholder="輸入問題內容"
            v-bind="field"
            :class="{ invalid: meta.validated && !!errors.length }"
          ></textarea>

          <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="question" />
        </VField>
      </div>
      <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
        編輯
      </button>
    </VForm>
  </CommonModal>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'
import type { FormContext } from 'vee-validate'
import draggable from 'vuedraggable'
import CommonModal from '../../../components/CommonModal.vue'

const faqs = ref([
  {
    id: '1',
    title: '課程相關',
    questions: [
      {
        id: '1-1',
        content: '請問這個課程價值 10,000 元，但是網路上評價兩極，請問我該買嗎？',
        is_publish: true
      },
      {
        id: '1-2',
        content: '我剛上小學只有 6 歲，請問我適合來上課嗎？',
        is_publish: false
      },
      {
        id: '1-3',
        content: '假如我家網路不好，只有 3G，影片還能流暢播放嗎？',
        is_publish: false
      }
    ]
  },
  {
    id: '2',
    title: '退貨機制',
    questions: [
      {
        id: '2-1',
        content: '如果不小心下單錯誤，請問該如何退款？',
        is_publish: true
      },
      {
        id: '2-2',
        content: '信用卡多扣 1,200 元，請問該怎麼辦？',
        is_publish: false
      }
    ]
  }
])

const edit = ref('')
const isEdit = ref(false)

// 新增類別 modal
const showAddFAQCategoryModal = ref(false)
const addFAQCategoryForm = ref<FormContext | null>(null)

const FAQCategory = ref('') // 新增類別

watch(showAddFAQCategoryModal, () => {
  FAQCategory.value = ''
  nextTick(() => {
    addFAQCategoryForm.value?.resetForm()
  })
})

function addFAQCategory() {
  faqs.value.push({
    id: FAQCategory.value.length.toString(),
    title: FAQCategory.value,
    questions: []
  })
  showAddFAQCategoryModal.value = false
}

function editSubmit() {
  console.log('edit success')
  isEdit.value = false
}

// 新增類別 modal
const showAddQuestionModal = ref(false)
const addQuestionForm = ref<FormContext | null>(null)

const question = ref('') // 新增問題
const questionList = ref<any | null>(null)
const questionListId = ref<any | null>(null)

watch(showAddQuestionModal, () => {
  question.value = ''
  nextTick(() => {
    addQuestionForm.value?.resetForm()
  })
})

function addQuestionHandle(id: any, list: any) {
  questionListId.value = id
  questionList.value = list
  showAddQuestionModal.value = true
}

function addQuestion() {
  questionList.value.push({
    id: `${questionListId.value}-${questionList.value.length + 1}`,
    content: question.value,
    is_publish: false
  })
  showAddQuestionModal.value = false
}

//編輯標題功能
const categoryEditedIdx = ref(null)
const categoryEditedContent = ref(null)

function editCategoryInputHandle(idx: string | any, content: string | any) {
  categoryEditedContent.value = content
  categoryEditedIdx.value = idx
}

//編輯內容 modal
const showEditQuestionModal = ref(false)
const questionEditedIdx = ref(null)
const questionEditedContent = ref(null)

function editQuestionModalHandle(idx: string | any, content: string | any) {
  showEditQuestionModal.value = true
  questionEditedContent.value = content
  questionEditedIdx.value = idx
}

function editQuestion() {
  faqs.value.forEach((x) => {
    x.questions.forEach((item: any) => {
      if (item.id == questionEditedIdx.value) {
        item.content = questionEditedContent.value
      }
    })
  })
  questionEditedContent.value = null
  questionEditedIdx.value = null
  showEditQuestionModal.value = false
}

//類型刪除功能
function deleteFAQCategory(idx: string) {
  Swal.fire({
    icon: 'warning',
    title: '確定刪除嗎？',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      faqs.value.forEach((item, id) => {
        if (item.id == idx) {
          faqs.value.splice(id, 1)
        } else {
          return
        }
      })
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
