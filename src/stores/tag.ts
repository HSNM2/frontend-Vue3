import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import useErrorHandler from '@/composables/useErrorHandler'
import { useStatusStore } from '@/stores/status.js'
import { useAuthStore } from '@/stores/auth'

import { GetUserTagsRequest } from '@/models/user'
import { GetCourseTagRequest, UseCourseTagRequest } from '@/models/course'

interface Course {
  id: number
  title: string
  price: number
  originPrice: number
  image_path: string
  link: string | null
  provider: string
  buyers: number | null
  totalTime: number | null
  avgRating: string
  countRating: number
}

export const useTagStore = defineStore('tag', () => {
  const route = useRoute()

  const { showError } = useErrorHandler()

  const status = useStatusStore()
  const { updateLoading } = status
  const courseList = ref<Course | any>([])
  const tagList = ref([])

  function getTagsData() {
    updateLoading(true)
    // 學生-我的收藏 列表
    GetUserTagsRequest()
      .then((res) => {
        courseList.value = res.data.data
        updateLoading(false)
      })
      .catch((err) => {
        updateLoading(false)
        showError(err)
      })
    return courseList.value
  }

  function getTagList() {
    GetCourseTagRequest()
      .then((res) => {
        if (res.data.status === true) {
          tagList.value = res.data.data.split(',')
        } else {
          tagList.value = []
        }
      })
      .catch((err) => {
        showError(err)
      })
    return tagList
  }

  function handleCourseTag(courseID: number) {
    const method = judgeTags(courseID) === true ? 'delete' : 'post'
    UseCourseTagRequest(method, courseID)
      .then((res) => {
        getTagList()
        if (route.name === 'studentTags') {
          getTagsData()
        }
      })
      .catch((err) => {
        showError(err)
      })
  }

  function judgeTags(courseID: number) {
    return tagList.value.some((tag) => Number(tag) === courseID)
  }

  return {
    tagList,
    courseList,
    getTagsData,
    getTagList,
    handleCourseTag,
    judgeTags
  }
})
