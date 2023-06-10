import request from '@/plugins/Axios'

export function GetCoursesListRequest(query: string) {
  return request({
    url: `/api/courses?${query}`,
    method: 'get'
  })
}

export function GetCourseRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}`,
    method: 'get'
  })
}

export function InquiryRequest(courseID: number, data: object) {
  return request({
    url: `/api/course/${courseID}/preClassInquiry`,
    method: 'post',
    data: data
  })
}

export function InquiryResponseRequest(courseID: number, inquiryID: number, data: object) {
  return request({
    url: `/api/course/${courseID}/preClassInquiry/${inquiryID}`,
    method: 'post',
    data: data
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

export function GetUserCourseRequest(courseID: number) {
  return request({
    url: `/api/user/course/${courseID}`,
    method: 'get'
  })
}
