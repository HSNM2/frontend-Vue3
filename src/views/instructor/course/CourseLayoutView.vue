<template>
  <main class="flex items-stretch bg-neutral-100">
    <!--左側選單-->
    <aside class="w-72 bg-neutral-50">
      <div class="p-6 pt-2">
        <RouterLink to="/instructor/courses" class="mb-4 flex items-center text-xs text-neutral-600"
          ><i class="material-icons me-1 text-xs">arrow_back_ios_new</i>課程列表</RouterLink
        >
        <h2 class="text-lg font-bold text-neutral-800">{{ course && course.title }}</h2>
      </div>
      <ul class="border-t p-6">
        <li class="mb-8">
          <span class="text-sm text-neutral-600">內容</span>
          <router-link to="/instructor/course/123123" class="block">章節管理</router-link>
        </li>
        <li class="mb-8">
          <span class="text-sm text-neutral-600">學員</span>
          <router-link to="/instructor/course/1112222/students" class="mb-8 block"
            >學員列表</router-link
          >
        </li>
        <li>
          <span class="text-sm text-neutral-600">設定</span>
          <router-link to="/instructor/course/1112222/info" class="mb-1 block"
            >課程資訊</router-link
          >
          <router-link to="/" class="mb-1 block">常見問題</router-link>
          <router-link to="/instructor/course/1112222/setting" class="block">進階設定</router-link>
        </li>
      </ul>
    </aside>
    <!--主內容-->
    <div class="flex-1 bg-neutral-100 p-8">
      <RouterView v-if="course"></RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import useSetMinMainHeight from '@/composables/useSetMinMainHeight'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/status'
import useErrorHandler from '@/composables/useErrorHandler'

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const instructor = useInstructorStore()
const { getCourse } = instructor
const { course } = storeToRefs(instructor)

const route = useRoute()

useSetMinMainHeight()

onMounted(() => {
  updateLoading(true)
  getCourse({ id: +route.params.id })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
})
</script>
