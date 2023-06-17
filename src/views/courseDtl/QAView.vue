<template>
  <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
    <div class="relative col-span-12 lg:col-span-5">
      <input
        type="search"
        placeholder="搜尋關鍵字"
        class="h-10 w-full rounded-2.5xl border border-neutral-200 px-4 py-2"
      />
      <span class="material-icons absolute right-6 top-1 text-lg text-neutral-600"> search </span>
    </div>
    <select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2">
      <option value="">全部問題</option>
    </select>
    <select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2">
      <option value="">日期最新</option>
    </select>
    <div class="col-span-12 md:mx-0 lg:col-span-3">
      <div
        v-if="isLogin === false"
        class="-mx-3 flex items-center justify-between bg-primary-1 px-[33.5px] py-3 lg:hidden"
      >
        <p class="text-primary-6">對課程有些許問題？</p>
        <button class="btn-primary">開始提問</button>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-9">
      <div v-if="isLogin === false" class="h-14 rounded-2.5xl border border-neutral-200 px-7 py-4">
        <p class="text-neutral-800">請先登入才能使用留言功能～</p>
      </div>
      <template v-if="isLogin">
        <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
          <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-4">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="
                    user?.avatarImagePath
                      ? user?.avatarImagePath
                      : 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
                  "
                  alt=""
                />
                <p class="">{{ user.nickName === '' ? user.name : user.nickName }}</p>
              </div>
            </div>
          </div>
          <div>
            <textarea
              v-model="inquiryValue"
              class="w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5"
              placeholder="對本課程有疑問？請盡情發問吧！"
            ></textarea>
          </div>
          <div class="mt-2 flex justify-end">
            <button
              type="button"
              class="btn-primary w-[112px]"
              :disabled="inquiryValue === ''"
              @click="sendInquiryAction(inquiryValue)"
            >
              送出
            </button>
          </div>
        </div>
      </template>

      <template v-for="inquirie in courseDetail.data.inquiries" :key="inquirie.id">
        <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
          <div>
            <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-x-4">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="
                      inquirie.imagePath
                        ? inquirie.imagePath
                        : 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
                    "
                    alt=""
                  />
                  <p class="">{{ inquirie.nickName === '' ? inquirie.name : inquirie.nickName }}</p>
                </div>
                <p class="text-sm text-primary-4">{{ inquirie.date.slice(0, 10) }}</p>
              </div>
              <div class="ml-14 mt-4">
                <p>{{ inquirie.content }}</p>
              </div>
            </div>
            <template v-for="(response, index) in inquirie.responses" :key="response.id">
              <div
                class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6"
                :class="Number.isInteger(index / 2) ? 'bg-secondary-2/50' : 'bg-neutral-100'"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="
                        response.imagePath
                          ? response.imagePath
                          : 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
                      "
                      alt=""
                    />
                    <p class="">
                      {{ response.nickName === '' ? response.name : response.nickName }}
                    </p>
                    <!-- <p class="rounded-[15px] bg-neutral-50 px-2 text-xs text-primary-5">講師</p> -->
                  </div>
                  <p class="text-sm text-primary-4">{{ response.date.slice(0, 10) }}</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>
                    {{ response.content }}
                  </p>
                </div>
              </div>
            </template>
            <div v-if="inquirie.isResponse === false" class="mt-4 flex items-center justify-end">
              <button
                type="button"
                class="btn-secondary w-[112px] px-0"
                @click="replyAction(inquirie.id)"
              >
                <div class="flex justify-center">
                  <span class="material-icons text-neutral-900"> reply </span>
                  <span class="text-neutral-900">回覆</span>
                </div>
              </button>
            </div>
            <template v-else>
              <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="
                        user?.avatarImagePath
                          ? user?.avatarImagePath
                          : 'https://fakeimg.pl/40x40/B7B7B7/?text=用戶'
                      "
                      alt=""
                    />
                    <p class="">{{ user.nickName === '' ? user.name : user.nickName }}</p>
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  v-model="inquirie.responseValue"
                  class="w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5"
                  placeholder="輸入內容..."
                ></textarea>
              </div>
              <div class="mt-2 flex justify-end">
                <button
                  type="button"
                  class="btn-primary w-[112px]"
                  :disabled="inquirie.responseValue === ''"
                  @click="sendResponseAction(inquirie.id, inquirie.responseValue)"
                >
                  送出
                </button>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

    <div v-if="isLogin === false" class="-mt-14 hidden lg:col-span-3 lg:block">
      <div
        class="flex flex-col items-center gap-y-4 rounded-2.5xl border border-neutral-200 bg-primary-1 py-8"
      >
        <img src="/image/icon-rolling-pin.png" class="h-[7px] w-[65px]" alt="" />
        <p class="text-base text-primary-6">對課程有些許問題？</p>
        <button class="btn-primary" @click="openAuthModal('login')">開始提問</button>
      </div>
    </div>
  </div>
  <AuthModal />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import AuthModal from '@/components/AuthModal.vue'
import { InquiryRequest, InquiryResponseRequest } from '@/models/course'
import useErrorHandler from '@/composables/useErrorHandler'

const route = useRoute()

const emit = defineEmits(['update-is-response', 'get-data'])
const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  },
  isOwnedCourse: {
    type: Boolean,
    required: false
  },
  user: {
    type: Object
  },
  courseDetail: {
    type: Object,
    required: true
  }
})



const { showError } = useErrorHandler()

const auth = useAuthStore()
const { authModal, authModalType } = storeToRefs(auth)

const inquiryValue = ref('')

const replyAction = (id: string) => {
  if (props.isLogin === false) openAuthModal()
  else emit('update-is-response', id)
}

const openAuthModal = (type = 'login') => {
  authModal.value = true
  authModalType.value = type
}

const sendInquiryAction = (content: string) => {
  let courseID = Number(route.params.id)
  let data = { content }
  InquiryRequest(courseID, data)
    .then((res) => {
      inquiryValue.value = ''
      emit('get-data')
    })
    .catch((err) => {
      showError(err)
    })
}

const sendResponseAction = (inquiryID: number, content: string) => {
  let courseID = Number(route.params.id)
  let data = { content }
  InquiryResponseRequest(courseID, inquiryID, data)
    .then((res) => {
      emit('get-data')
    })
    .catch((err) => {
      showError(err)
    })
}
</script>
<style lang=""></style>
