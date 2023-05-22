import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

import { CoursesListRequest, AddCourseRequest, CourseRequest } from '@/models/instructor'

export const useInstructorStore = defineStore('instructor', () => {
  const courses = ref([])
  const course = ref(null)

  // 取得課程清單
  function getCourses() {
    // return axios.get('/api/courseProvider/courses').then((res) => {
    //   courses.value = res.data.data
    // })
    return CoursesListRequest().then((res) => {
      courses.value = res.data.data
    })
  }

  // 新增課程
  function addCourse() {
    // return axios.post('/api/courseProvider/course').then((res) => {
    //   courses.value = res.data.data
    // })
    return AddCourseRequest().then((res) => {
      courses.value = res.data.data
    })
  }

  // 取得單一課程
  function getCourse(payload: { id: string }) {
    // return axios.get('/api/courseProvider/course/' + payload).then((res) => {
    //   console.log(res)
    // })
    return CourseRequest(payload).then((res) => {
      console.log(res)
    })
  }

  return {
    courses,

    getCourses,
    addCourse,
    getCourse
  }
})
