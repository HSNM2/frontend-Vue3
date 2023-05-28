import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  CoursesRequest,
  AddCourseRequest,
  CourseRequest,
  CourseChaptersRequest,
  AddCourseChapterRequest,
  DeleteCourseChapterRequest,
  EditCourseChapterTitleRequest,
  AddCourseLessonRequest,
  DeleteCourseRequest
} from '@/models/instructor'

interface Course {
  id: number
  title: string
  isPublish: boolean
}

interface CourseChapter {
  id: number
  title: string
  lessons: CourseLesson[]
}

type EditCourseChapter = CourseChapter & { isEdit: boolean }

interface CourseLesson {
  title: string
  videoPath: string
}

export const useInstructorStore = defineStore('instructor', () => {
  const courses = ref<Course[]>([])
  const course = ref<Course | null>(null)

  const chapters = ref<EditCourseChapter[]>([])
  const chapter = ref<CourseChapter | null>(null)

  //
  // 課程相關
  //
  function getCourses() {
    courses.value = []
    return CoursesRequest().then((res) => {
      courses.value = res.data.data.course
    })
  }

  function getCourse(payload: { id: number }) {
    return CourseRequest(payload).then((res) => {
      course.value = res.data.data
    })
  }

  function addCourse(payload: { title: string }) {
    return AddCourseRequest(payload).then(() => getCourses())
  }

  function deleteCourse(payload: { id: number }) {
    return DeleteCourseRequest(payload)
  }

  //
  // 課程章節相關
  //
  function getCourseChapters(payload: { courseId: number }) {
    chapters.value = []
    return CourseChaptersRequest(payload).then((res) => {
      // isEdit：前台編輯用
      chapters.value = res.data.message.map((item: CourseChapter) => ({ ...item, isEdit: false }))
    })
  }

  function getCourseChapter(payload: { courseId: number; chapterId: number }) {
    chapter.value = null
    return getCourseChapters({ courseId: payload.courseId }).then(() => {
      chapter.value = chapters.value.find((item) => item.id === payload.chapterId) || null
    })
  }

  function addCourseChapter(payload: { courseId: number; chapterTitle: string }) {
    return AddCourseChapterRequest(payload).then(() =>
      getCourseChapters({ courseId: payload.courseId })
    )
  }

  function editCourseChapterTitle(payload: {
    courseId: number
    chapterId: number
    chapterTitle: string
  }) {
    return EditCourseChapterTitleRequest(payload).then(() =>
      getCourseChapters({ courseId: payload.courseId })
    )
  }

  function deleteCourseChapter(payload: { courseId: number; chapterId: number }) {
    return DeleteCourseChapterRequest(payload).then(() =>
      getCourseChapters({ courseId: payload.courseId })
    )
  }

  //
  // 課程單元相關
  //
  function addCourseLesson(payload: { courseId: number; chapterId: number; data: object }) {
    return AddCourseLessonRequest(payload)
  }

  return {
    courses,
    course,
    chapters,
    chapter,

    getCourses,
    addCourse,
    getCourse,
    deleteCourse,
    getCourseChapters,
    getCourseChapter,
    addCourseChapter,
    deleteCourseChapter,
    editCourseChapterTitle
  }
})
