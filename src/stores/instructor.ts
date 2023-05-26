import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

import { CoursesListRequest, AddCourseRequest, CourseRequest } from '@/models/instructor'

export const useInstructorStore = defineStore('instructor', () => {
  const courses = ref([])
  const course = ref(null)

  // 取得課程清單
  function getCourses() {
    return CoursesListRequest().then((res) => {
      courses.value = res.data.data.course
    })
  }

  // 新增課程
  function addCourse(payload: { title: string }) {
    return AddCourseRequest(payload).then(() => getCourses())
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
