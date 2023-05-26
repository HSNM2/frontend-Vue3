import request from '@/plugins/Axios'

export function CoursesListRequest() {
  return request({
    url: '/api/courseProvider/courses',
    method: 'get'
  })
}

export function AddCourseRequest() {
  return request({
    url: '/api/courseProvider/course',
    method: 'post'
  })
}

export function CourseRequest(params: object) {
  return request({
    url: `/api/courseProvider/course/${params}`,
    method: 'get'
  })
}
