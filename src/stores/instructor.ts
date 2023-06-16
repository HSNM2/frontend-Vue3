import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  CoursesRequest,
  AddCourseRequest,
  CourseRequest,
  CourseInfoEditRequest,
  DeleteCourseRequest,
  PublishCourseRequest,
  UnpublishCourseRequest,
  CourseChaptersRequest,
  AddCourseChapterRequest,
  DeleteCourseChapterRequest,
  EditCourseChapterTitleRequest,
  CourseLessonRequest,
  AddCourseLessonRequest,
  EditCourseLessonRequest,
  DeleteCourseLessonRequest,
  PublishCourseLessonRequest,
  UnPublishCourseLessonRequest,
  CourseFAQsRequest,
  AddCourseFAQCategoryRequest,
  editCourseFAQCategoryRequest,
  deleteCourseFAQCategoryRequest,
  AddCourseFAQQuestionRequest,
  EditCourseFAQQuestionRequest,
  DeleteCourseFAQQuestionRequest,
  PublishCourseFAQQuestionRequest,
  UnpublishCourseFAQQuestionRequest,
  UploadCourseCoverRequest,
  DeleteCourseCoverRequest
} from '@/models/instructor'

interface Courses {
  id: number
  title: string
  image_path: string
  isPublish: boolean
}

interface Course {
  id: number
  price: number
  originPrice: number
  title: string
  tag: string | string[]
  image_path: string
  link: string
  subTitle: string
  description: string
  courseStatus: string
  type: string
  category: string
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
  const courses = ref<Courses[]>([])
  const course = ref<Course | null>(null)

  const chapters = ref<EditCourseChapter[]>([])
  const chapter = ref<CourseChapter | null>(null)
  const lesson = ref<CourseLesson | null>(null)
  const faqs = ref<CourseFAQs[]>([])
  const questions = ref<CourseFAQsQuestions[]>([])

  const uploadProcessPercent = ref(0)

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
      if (!course.value?.originPrice) {
        course.value!.originPrice = 0
      }
      if (!course.value?.price) {
        course.value!.price = 0
      }
      if (!course.value?.courseStatus) {
        course.value!.courseStatus = '1'
      }
      if (!course.value?.description) {
        course.value!.description = ''
      }
      return res.data.data
    })
  }

  function editCourseInfo(payload: { id: number; data: object }) {
    return CourseInfoEditRequest(payload)
  }

  function uploadCourseCover(payload: object) {
    uploadProcessPercent.value = 0
    return UploadCourseCoverRequest({
      data: payload,
      onUploadProcess: (progressEvent: ProgressEvent) => {
        uploadProcessPercent.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }
    })
  }

  function deleteCourseCover(payload: number) {
    return DeleteCourseCoverRequest(payload)
  }

  function addCourse(payload: { title: string }) {
    return AddCourseRequest(payload).then(() => getCourses())
  }

  function deleteCourse(payload: { id: number }) {
    return DeleteCourseRequest(payload)
  }

  function coursePublish(payload: { courseId: number }) {
    return PublishCourseRequest(payload)
  }

  function courseUnpublish(payload: { courseId: number }) {
    return UnpublishCourseRequest(payload)
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

  function publishCourseLesson(payload: { courseId: number; chapterId: number; lessonId: number }) {
    return PublishCourseLessonRequest(payload)
  }

  function unPublishCourseLesson(payload: {
    courseId: number
    chapterId: number
    lessonId: number
  }) {
    return UnPublishCourseLessonRequest(payload)
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

  function addCourseFAQCategory(payload: { courseId: number; category: string }) {
    return AddCourseFAQCategoryRequest(payload)
  }

  function editCourseFAQCategory(payload: {
    courseId: number
    categoryId: number
    editedCategory: string
  }) {
    return editCourseFAQCategoryRequest(payload)
  }

  function deleteCourseFAQCategory(payload: { courseId: number; categoryId: number }) {
    return deleteCourseFAQCategoryRequest(payload)
  }

  function addCourseFAQQuestion(payload: {
    courseId: number
    categoryId: number
    questionTitle: string
    questionContent: string
  }) {
    return AddCourseFAQQuestionRequest(payload)
  }

  function editCourseFAQQuestion(payload: {
    courseId: number
    categoryId: number
    questionId: number
    editedQuestionTitle: string
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

  return {
    courses,
    course,
    chapters,
    chapter,
    lesson,
    faqs,
    questions,
    uploadProcessPercent,

    getCourses,
    addCourse,
    editCourseInfo,
    uploadCourseCover,
    deleteCourseCover,
    getCourse,
    deleteCourse,
    coursePublish,
    courseUnpublish,

    getCourseChapters,
    getCourseChapter,
    addCourseChapter,
    deleteCourseChapter,
    editCourseChapterTitle,

    getCourseLesson,
    addCourseLesson,
    editCourseLesson,
    deleteCourseLesson,
    publishCourseLesson,
    unPublishCourseLesson,

    getCourseFAQs,
    addCourseFAQCategory,
    editCourseFAQCategory,
    deleteCourseFAQCategory,
    addCourseFAQQuestion,
    editCourseFAQQuestion,
    deleteCourseFAQQuestion,
    FAQQuestionPublish,
    FAQQuestionUnpublish
  }
})
