<template>
  <main class="flex items-stretch bg-neutral-100">
    <template v-if="course">
      <!--左側選單-->
      <aside class="w-72 bg-primary-1">
        <div class="p-6 pt-2">
          <RouterLink
            to="/instructor/courses"
            class="mb-4 flex items-center text-xs text-neutral-600"
            ><i class="material-icons me-1 text-xs">arrow_back_ios_new</i>課程列表</RouterLink
          >
          <h2 class="text-lg font-bold text-neutral-800">{{ course && course.title }}</h2>
        </div>
        <ul class="border-t p-6">
          <li class="mb-8">
            <span class="text-sm text-neutral-600">內容</span>
            <router-link :to="`/instructor/course/${course.id}`" class="block"
              >章節管理</router-link
            >
          </li>
          <li class="mb-8">
            <span class="text-sm text-neutral-600">學員</span>
            <router-link :to="`/instructor/course/${course.id}/students`" class="mb-8 block"
              >學員列表</router-link
            >
          </li>
          <li class="mb-8">
            <span class="text-sm text-neutral-600">設定</span>
            <router-link :to="`/instructor/course/${course.id}/info`" class="mb-1 block"
              >課程資訊</router-link
            >
            <router-link :to="`/instructor/course/${course.id}/faq`" class="mb-1 block"
              >常見問題</router-link
            >
            <router-link :to="`/instructor/course/${course.id}/setting`" class="block"
              >進階設定</router-link
            >
          </li>
          <li>
            <span class="text-sm text-neutral-600">發布</span>
            <label class="relative mb-1 flex items-center justify-between" @click="publishHandle">
              <span class="">課程發布</span>
              <input type="checkbox" name="" id="" class="peer sr-only" :checked="isPublish" />
              <div
                class="h-6 w-11 items-center rounded-full bg-neutral-400 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-neutral-50 after:transition-all after:content-[''] peer-checked:bg-primary-6 peer-checked:after:translate-x-full peer-focus:ring-4 peer-focus:ring-primary-3"
              ></div>
            </label>
          </li>
        </ul>
      </aside>
      <!--主內容-->
      <div class="flex-1 bg-neutral-100 p-8">
        <RouterView></RouterView>
      </div>
    </template>
    <div v-else class="p-5">此課程不存在</div>
  </main>
</template>

<script setup lang="ts">
import useSetMinMainHeight from '@/composables/useSetMinMainHeight'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useInstructorStore } from '@/stores/instructor'
import { storeToRefs } from 'pinia'
import { useStatusStore } from '@/stores/status'
import useErrorHandler from '@/composables/useErrorHandler'

const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const instructor = useInstructorStore()
const { getCourse, getCourses, coursePublish, courseUnpublish } = instructor
const { course, courses } = storeToRefs(instructor)

const route = useRoute()
const router = useRouter()
const isPublish = ref<boolean>(false)
const courseRouteParamsId = ref<number>(0)

useSetMinMainHeight()

onMounted(() => {
  updateLoading(true)
  getCourse({ id: +route.params.courseId })
    .catch((err) => {
      showError(err).then(() => {
        router.push('/instructor/courses')
      })
    })
    .finally(() => {
      updateLoading(false)
    })
  publishStateHandle()
})

function publishStateHandle() {
  courseRouteParamsId.value = parseInt(<string>route.params.courseId)
  getCourses().then(() => {
    courses.value.forEach((item) => {
      if (item.id == courseRouteParamsId.value) {
        isPublish.value = item.isPublish
      }
    })
  })
}

function publishHandle() {
  if (isPublish.value) {
    courseUnpublish({ courseId: courseRouteParamsId.value }).then((res) => {
      if (res.data.status == true) {
        getCourses()
        publishStateHandle()
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
      }
    })
  } else {
    coursePublish({ courseId: courseRouteParamsId.value }).then((res) => {
      if (res.data.status == true) {
        getCourses()
        publishStateHandle()
        Swal.fire({
          icon: 'success',
          title: res.data.message
        })
      }
    })
  }
}
</script>
