<template>
  <div v-if="!faqs[0]" class="mb-4 rounded bg-neutral-50 px-12 py-8">
    <h2 class="mb-6 text-3xl font-bold text-neutral-900">建立常見問題</h2>
    <p class="mb-6">提供常見問題列表，這將會是提升服務體驗及轉換率的好方法</p>
    <button class="btn-primary" @click="showAddFAQCategoryModal = true">新增問題類別</button>
  </div>
  <div v-else>
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
                  :class="{ invalid: !categoryEditedContent }"
                  @keyup.enter="!!categoryEditedContent && editCourseFAQCategorySubmit()"
                />
                <button
                  class="me-4"
                  :disabled="categoryEditedContent === ''"
                  @click="editCourseFAQCategorySubmit()"
                >
                  確定
                </button>
                <button @click="categoryEditedIdx = 0">取消</button>
              </template>
              <template v-else>
                <span class="me-4">{{ faq.title }}</span>
                <i
                  class="material-icons me-4 hidden cursor-pointer text-red-400 group-hover:block"
                  @click="deleteCourseFAQCategoryHandle(faq.id)"
                  >delete_outline</i
                >
                <i
                  class="material-icons hidden cursor-pointer text-neutral-400 group-hover:block"
                  @click="editCourseFAQCategoryHandle(faq.id, faq.title)"
                  >edit</i
                >
              </template>

              <button class="btn-secondary ms-auto" @click="addCourseFAQQuestionHandle(faq.id)">
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
              :key="faq.class_faq_questions.id"
              class="max-h-0 overflow-hidden bg-neutral-100 transition-all duration-300 peer-checked:max-h-full"
              tag="ul"
              :group="{ name: 'g2' }"
              :list="faq.class_faq_questions"
              item-key="id"
              handle=".js-draggable"
            >
              <template #item="{ element: question }">
                <li class="border">
                  <div class="flex items-center justify-between p-4">
                    <div class="flex items-center">
                      <i class="material-icons js-draggable me-2 cursor-row-resize">sort</i>
                      <span class="me-3">{{ question.title }}</span
                      ><span
                        :class="[question.publish ? 'text-emerald-700' : 'text-neutral-600']"
                        class="max-h-8 min-w-19 rounded-full border bg-neutral-50 px-4 py-1 text-sm"
                        >{{ question.publish ? '已發布' : '未發布' }}</span
                      >
                    </div>
                    <div class="flex items-center">
                      <i
                        class="material-icons cursor-pointer pr-4 text-neutral-400"
                        @click="
                          editCourseFAQQuestionModalHandle(
                            faq.id,
                            question.id,
                            question.title,
                            question.content
                          )
                        "
                        >edit</i
                      >
                      <i
                        :class="[question.publish ? 'text-emerald-700' : 'text-neutral-600']"
                        class="material-icons cursor-pointer"
                        @click="FAQQuestionPublishHandle(faq.id, question.id, question.publish)"
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
  </div>

  <!--新增問題類別 Modal-->
  <CommonModal v-model="showAddFAQCategoryModal">
    <template v-slot:title>新增問題類別</template>
    <VForm ref="addFAQCategoryForm" v-slot="{ meta }" @submit="addCourseFAQCategoryHandle()">
      <div class="mb-6">
        <VField
          name="FAQCategory"
          type="text"
          rules="required"
          v-model="categoryTitle"
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

  <!--問題內容 Modal-->
  <CommonModal v-model="showQuestionInputModal">
    <template v-slot:title>{{ isQuestionAdded ? '新增問題' : '編輯問題' }}</template>
    <VForm ref="questionInputForm" v-slot="{ meta }" @submit="questionSubmitHandle">
      <div v-if="isQuestionAdded">
        <div class="mb-2">
          <VField
            name="questionTitle"
            type="text"
            rules="required"
            v-model="questionTitle"
            v-slot="{ field, errors, meta }"
            label="問題標題"
          >
            <label for="questionTitle">標題</label>
            <input
              id="questionTitle"
              class="form-control"
              placeholder="輸入問題標題"
              v-bind="field"
              :class="{ invalid: meta.validated && !!errors.length }"
            />
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="title" />
          </VField>
        </div>
        <div class="mb-6">
          <VField
            name="questionContent"
            type="text"
            rules="required"
            v-model="questionContent"
            v-slot="{ field, errors, meta }"
            label="問題內容"
          >
            <label for="questionContent">內容</label>
            <textarea
              id="questionContent"
              class="form-control"
              placeholder="輸入問題內容"
              v-bind="field"
              :class="{ invalid: meta.validated && !!errors.length }"
            ></textarea>
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="question" />
          </VField>
        </div>
      </div>
      <div v-else>
        <div class="mb-2">
          <VField
            name="questionEditedTitle"
            type="text"
            rules="required"
            v-model="questionEditedTitle"
            v-slot="{ field, errors, meta }"
            label="問題標題"
          >
            <label for="questionEditedTitle">標題</label>
            <input
              id="questionEditedTitle"
              class="form-control"
              placeholder="輸入問題標題"
              v-bind="field"
              :class="{ invalid: meta.validated && !!errors.length }"
            />
            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="title" />
          </VField>
        </div>
        <div class="mb-6">
          <VField
            name="questionEditedContent"
            type="text"
            rules="required"
            v-model="questionEditedContent"
            v-slot="{ field, errors, meta }"
            label="編輯問題內容"
          >
            <label for="questionEditedContent">內容</label>
            <textarea
              id="questionEditedContent"
              class="form-control"
              placeholder="輸入問題內容"
              v-bind="field"
              :class="{ invalid: meta.validated && !!errors.length }"
            ></textarea>

            <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="question" />
          </VField>
        </div>
      </div>
      <div class="flex">
        <button type="submit" class="btn-primary mx-auto block w-fit" :disabled="!meta.valid">
          {{ isQuestionAdded ? '新增' : '編輯' }}
        </button>
        <button
          v-if="!isQuestionAdded"
          class="ms-auto text-red-500"
          @click="deleteCourseFAQQuestionSubmit"
        >
          刪除
        </button>
      </div>
    </VForm>
  </CommonModal>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import type { FormContext } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useInstructorStore } from '@/stores/instructor'
import draggable from 'vuedraggable'
import CommonModal from '../../../components/CommonModal.vue'

const route = useRoute()
const courseId = ref<number>(0)

const instructor = useInstructorStore()
const { faqs } = storeToRefs(instructor)
const {
  getCourseFAQs,
  addCourseFAQCategory,
  editCourseFAQCategory,
  deleteCourseFAQCategory,
  addCourseFAQQuestion,
  editCourseFAQQuestion,
  deleteCourseFAQQuestion,
  FAQQuestionPublish,
  FAQQuestionUnpublish
} = instructor

// 新增類別 modal
const showAddFAQCategoryModal = ref(false)
const addFAQCategoryForm = ref<FormContext | null>(null)

const categoryTitle = ref<string>('') // 新增類別

watch(showAddFAQCategoryModal, () => {
  categoryTitle.value = ''
  nextTick(() => {
    addFAQCategoryForm.value?.resetForm()
  })
})

function addCourseFAQCategoryHandle() {
  addCourseFAQCategory({ courseId: courseId.value, category: categoryTitle.value }).then(() => {
    getCourseFAQs({ courseId: courseId.value })
    showAddFAQCategoryModal.value = false
  })
}

//編輯類別功能
const categoryIdx = ref<number>(0)
const categoryEditedIdx = ref<number>(0)
const categoryEditedContent = ref<string>('')

function editCourseFAQCategoryHandle(idx: string | any, content: string | any) {
  categoryEditedContent.value = content
  categoryEditedIdx.value = idx
}
function editCourseFAQCategorySubmit() {
  editCourseFAQCategory({
    courseId: courseId.value,
    categoryId: categoryEditedIdx.value,
    editedCategory: categoryEditedContent.value
  }).then(() => {
    categoryEditedIdx.value = 0
    categoryEditedContent.value = ''
    getCourseFAQs({ courseId: courseId.value })
  })
}

//刪除類型功能
function deleteCourseFAQCategoryHandle(idx: number) {
  Swal.fire({
    icon: 'warning',
    title: '確定刪除嗎？',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCourseFAQCategory({ courseId: courseId.value, categoryId: idx }).then(() => {
        getCourseFAQs({ courseId: courseId.value })
      })
    }
  })
}

const isQuestionAdded = ref<boolean>(true)

// 新增問題 modal
const showQuestionInputModal = ref(false)
const questionForm = ref<FormContext | null>(null)
const questionTitle = ref<string>('')
const questionContent = ref<string>('') // 新增問題

watch(showQuestionInputModal, () => {
  questionContent.value = ''
  nextTick(() => {
    questionForm.value?.resetForm()
  })
})

function questionSubmitHandle() {
  if (isQuestionAdded.value) {
    addCourseFAQQuestionSubmit()
  } else {
    editCourseFAQQuestionSubmit()
  }
}

function addCourseFAQQuestionHandle(id: number) {
  isQuestionAdded.value = true
  categoryIdx.value = id
  showQuestionInputModal.value = true
}

function addCourseFAQQuestionSubmit() {
  addCourseFAQQuestion({
    courseId: courseId.value,
    categoryId: categoryIdx.value,
    questionTitle: questionTitle.value,
    questionContent: questionContent.value
  }).then(() => {
    getCourseFAQs({ courseId: courseId.value })
    categoryEditedIdx.value = 0
    showQuestionInputModal.value = false
  })
}

//編輯內容 modal
const questionEditedIdx = ref<number>(0)
const questionEditedTitle = ref<string>('')
const questionEditedContent = ref<string>('')

function editCourseFAQQuestionModalHandle(
  categoryId: number,
  questionId: number,
  title: string,
  content: string
) {
  isQuestionAdded.value = false
  categoryIdx.value = categoryId
  questionEditedIdx.value = questionId
  questionEditedTitle.value = title
  questionEditedContent.value = content
  showQuestionInputModal.value = true
}

function editCourseFAQQuestionSubmit() {
  editCourseFAQQuestion({
    courseId: courseId.value,
    categoryId: categoryIdx.value,
    questionId: questionEditedIdx.value,
    editedQuestionTitle: questionEditedTitle.value,
    editedQuestionContent: questionEditedContent.value
  }).then(() => {
    getCourseFAQs({ courseId: courseId.value })
    categoryIdx.value = 0
    questionEditedIdx.value = 0
    questionEditedContent.value = ''
    showQuestionInputModal.value = false
  })
}

//刪除內容功能
function deleteCourseFAQQuestionSubmit() {
  deleteCourseFAQQuestion({
    courseId: courseId.value,
    categoryId: categoryIdx.value,
    questionId: questionEditedIdx.value
  }).then(() => {
    getCourseFAQs({ courseId: courseId.value })
    categoryIdx.value = 0
    questionEditedIdx.value = 0
    showQuestionInputModal.value = false
  })
}

//問題發佈功能
const questionPublishState = ref<boolean>(false)

function FAQQuestionPublishHandle(categoryId: number, questionId: number, publishState: boolean) {
  questionPublishState.value = publishState
  if (questionPublishState.value) {
    FAQQuestionUnpublish({
      courseId: courseId.value,
      categoryId: categoryId,
      questionId: questionId
    }).then((res) => {
      if (res.data.status == true) {
        getCourseFAQs({ courseId: courseId.value })
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
      }
    })
  } else {
    FAQQuestionPublish({
      courseId: courseId.value,
      categoryId: categoryId,
      questionId: questionId
    }).then((res) => {
      if (res.data.status == true) {
        getCourseFAQs({ courseId: courseId.value })
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
      }
    })
  }
}

onMounted(() => {
  courseId.value = +route.params.courseId
  getCourseFAQs({ courseId: courseId.value })
  nextTick(() => {
    ;(document.querySelector('main') as HTMLElement).style.minHeight = `calc(100vh - ${
      (document.querySelector('header') as HTMLElement).offsetHeight
    }px - ${(document.querySelector('footer') as HTMLElement).offsetHeight}px)`
  })
})
</script>
