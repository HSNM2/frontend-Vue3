import request from '@/plugins/Axios'

export function CoursesRequest() {
  return request({
    url: '/api/courseProvider/courses',
    method: 'get'
  })
}

export function AddCourseRequest(data: object) {
  return request({
    url: '/api/courseProvider/course',
    method: 'post',
    data
  })
}

export function CourseRequest(params: { id: number }) {
  return request({
    url: `/api/courseProvider/course/${params.id}`,
    method: 'get'
  })
}

export function CourseInfoEditRequest(params: { id: number; data: object }) {
  return request({
    url: `/api/courseProvider/course/${params.id}`,
    method: 'patch',
    data: params.data
  })
}

export function DeleteCourseRequest(params: { id: number }) {
  return request({
    url: `/api/courseProvider/course/${params.id}`,
    method: 'delete'
  })
}

export function PublishCourseRequest(params: { courseId: number }) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/inStack`,
    method: 'post'
  })
}

export function UnpublishCourseRequest(params: { courseId: number }) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/offStack`,
    method: 'post'
  })
}

export function CourseChaptersRequest(params: { courseId: number }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/chapter`,
    method: 'get'
  })
}

export function AddCourseChapterRequest(params: { courseId: number; chapterTitle: string }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/chapter`,
    method: 'post',
    data: {
      title: params.chapterTitle
    }
  })
}

export function EditCourseChapterTitleRequest(params: {
  courseId: number
  chapterId: number
  chapterTitle: string
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}`,
    method: 'patch',
    data: {
      title: params.chapterTitle
    }
  })
}

export function DeleteCourseChapterRequest(params: { courseId: number; chapterId: number }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}`,
    method: 'delete'
  })
}

export function CourseLessonsRequest(params: { courseId: number; chapterId: number }) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson`,
    method: 'get'
  })
}

export function CourseLessonRequest(params: {
  courseId: number
  chapterId: number
  lessonId: number
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}`,
    method: 'get'
  })
}

export function AddCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  data: object
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson`,
    method: 'post',
    data: params.data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function EditCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  lessonId: number
  data: object
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}`,
    method: 'patch',
    data: params.data
  })
}

export function DeleteCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  lessonId: number
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}`,
    method: 'delete'
  })
}

export function PublishCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  lessonId: number
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}/inStack`,
    method: 'post'
  })
}

export function UnPublishCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  lessonId: number
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}/offStack`,
    method: 'post'
  })
}

export function CourseFAQsRequest(params: { courseId: number }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq`,
    method: 'get'
  })
}

export function AddCourseFAQCategoryRequest(params: { courseId: number; category: string }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq`,
    method: 'post',
    data: {
      title: params.category
    }
  })
}

export function editCourseFAQCategoryRequest(params: {
  courseId: number
  categoryId: number
  editedCategory: string
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}`,
    method: 'patch',
    data: {
      title: params.editedCategory
    }
  })
}

export function deleteCourseFAQCategoryRequest(params: { courseId: number; categoryId: number }) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}`,
    method: 'delete'
  })
}

export function AddCourseFAQQuestionRequest(params: {
  courseId: number
  categoryId: number
  questionTitle: string
  questionContent: string
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}/question`,
    method: 'post',
    data: {
      title: params.questionTitle,
      content: params.questionContent
    }
  })
}

export function EditCourseFAQQuestionRequest(params: {
  courseId: number
  categoryId: number
  questionId: number
  editedQuestionTitle: string
  editedQuestionContent: string
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}/question/${params.questionId}`,
    method: 'patch',
    data: {
      title: params.editedQuestionTitle,
      content: params.editedQuestionContent
    }
  })
}

export function DeleteCourseFAQQuestionRequest(params: {
  courseId: number
  categoryId: number
  questionId: number
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}/question/${params.questionId}`,
    method: 'delete'
  })
}

export function PublishCourseFAQQuestionRequest(params: {
  courseId: number
  categoryId: number
  questionId: number
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}/question/${params.questionId}/inStack`,
    method: 'post'
  })
}

export function UnpublishCourseFAQQuestionRequest(params: {
  courseId: number
  categoryId: number
  questionId: number
}) {
  return request({
    url: `/api/courseProvider/course/${params.courseId}/faq/${params.categoryId}/question/${params.questionId}/offStack`,
    method: 'post'
  })
}
