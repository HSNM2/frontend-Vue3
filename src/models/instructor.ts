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

export function AddCourseLessonRequest(params: {
  courseId: number
  chapterId: number
  data: object
}) {
  return request({
    url: `api/courseProvider/course/${params.courseId}/chapter/${params.chapterId}/lesson`,
    method: 'post',
    data: params.data
  })
}
