import request from '@/plugins/Axios'

export function GetCoursesListRequest(query: string) {
  return request({
    url: `/api/courses?${query}`,
    method: 'get'
  })
}

export function GetCourseTagRequest() {
  return request({
    url: `/api/user/tag/userFavorite`,
    method: 'get'
  })
}

export function UseCourseTagRequest(method: string, courseID: number) {
  return request({
    url: `/api/user/tag/${courseID}`,
    method: method
  })
}
