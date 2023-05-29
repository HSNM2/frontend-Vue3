import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  CoursesRequest,
  AddCourseRequest,
  CourseRequest,
  DeleteCourseRequest,
  CourseChaptersRequest,
  AddCourseChapterRequest,
  DeleteCourseChapterRequest,
  EditCourseChapterTitleRequest,
  CourseLessonRequest,
  AddCourseLessonRequest,
  EditCourseLessonRequest,
  DeleteCourseLessonRequest,
  CourseFAQsRequest,
  AddCourseFAQCategoryRequest,
  editCourseFAQCategoryRequest,
  deleteCourseFAQCategoryRequest,
  AddCourseFAQQuestionRequest,
  EditCourseFAQQuestionRequest,
  DeleteCourseFAQQuestionRequest,
  PublishCourseFAQQuestionRequest,
  UnpublishCourseFAQQuestionRequest,
  PublishCourseRequest,
  UnpublishCourseRequest
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
  id: number
  isPublish: boolean
  title: string
  videoPath: string
}

interface CourseFAQs {
  id: number
  title: string
  questions: CourseFAQsQuestions[]
}

interface CourseFAQsQuestions {
  id: number
  content: string
  isPublish: boolean
}

export const useInstructorStore = defineStore('instructor', () => {
  const courses = ref<Course[]>([])
  const course = ref<Course | null>(null)

  const chapters = ref<EditCourseChapter[]>([])
  const chapter = ref<CourseChapter | null>(null)
  const lesson = ref<CourseLesson | null>(null)
  const faqs = ref<CourseFAQs[]>([])
  const questions = ref<CourseFAQsQuestions[]>([])

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
  function getCourseLesson(payload: { courseId: number; chapterId: number; lessonId: number }) {
    lesson.value = null
    return CourseLessonRequest(payload).then((res) => {
      lesson.value = res.data.data
    })
  }

  function addCourseLesson(payload: { courseId: number; chapterId: number; data: object }) {
    return AddCourseLessonRequest(payload)
  }

  function editCourseLesson(payload: {
    courseId: number
    chapterId: number
    lessonId: number
    data: object
  }) {
    return EditCourseLessonRequest(payload)
  }

  function deleteCourseLesson(payload: { courseId: number; chapterId: number; lessonId: number }) {
    return DeleteCourseLessonRequest(payload)
  }

  //
  // 常見問題相關
  //

  function getCourseFAQs(payload: { courseId: number }) {
    faqs.value = []
    return CourseFAQsRequest(payload).then((res) => {
      faqs.value = res.data.data
    })
  }

  function addCourseFAQCategory(payload: { courseId: number; categoryTitle: string }) {
    return AddCourseFAQCategoryRequest(payload)
  }

  function editCourseFAQCategory(payload: {
    courseId: number
    categoryId: number
    editedCategoryTitle: string
  }) {
    return editCourseFAQCategoryRequest(payload)
  }

  function deleteCourseFAQCategory(payload: { courseId: number; categoryId: number }) {
    return deleteCourseFAQCategoryRequest(payload)
  }

  function addCourseFAQQuestion(payload: {
    courseId: number
    categoryId: number
    questionContent: string
  }) {
    return AddCourseFAQQuestionRequest(payload)
  }

  function editCourseFAQQuestion(payload: {
    courseId: number
    categoryId: number
    questionId: number
    editedQuestionContent: string
  }) {
    return EditCourseFAQQuestionRequest(payload)
  }

  function deleteCourseFAQQuestion(payload: {
    courseId: number
    categoryId: number
    questionId: number
  }) {
    return DeleteCourseFAQQuestionRequest(payload)
  }

  function FAQQuestionPublish(payload: {
    courseId: number
    categoryId: number
    questionId: number
  }) {
    return PublishCourseFAQQuestionRequest(payload)
  }
  function FAQQuestionUnpublish(payload: {
    courseId: number
    categoryId: number
    questionId: number
  }) {
    return UnpublishCourseFAQQuestionRequest(payload)
  }

  //
  // 課程上下架
  //
  function coursePublish(payload: { courseId: number }) {
    return PublishCourseRequest(payload)
  }
  function courseUnpublish(payload: { courseId: number }) {
    return UnpublishCourseRequest(payload)
  }

  return {
    courses,
    course,
    chapters,
    chapter,
    lesson,
    faqs,
    questions,

    getCourses,
    addCourse,
    getCourse,
    deleteCourse,

    getCourseChapters,
    getCourseChapter,
    addCourseChapter,
    deleteCourseChapter,
    editCourseChapterTitle,

    getCourseLesson,
    addCourseLesson,
    editCourseLesson,
    deleteCourseLesson,

    getCourseFAQs,
    addCourseFAQCategory,
    editCourseFAQCategory,
    deleteCourseFAQCategory,
    addCourseFAQQuestion,
    editCourseFAQQuestion,
    deleteCourseFAQQuestion,
    FAQQuestionPublish,
    FAQQuestionUnpublish,

    coursePublish,
    courseUnpublish
  }
})
