import request from '@/plugins/Axios'

export function GetCoursesListRequest(query: string) {
  return request({
    url: `/api/courses?${query}`,
    method: 'get'
  })
}

export function GetCourseIsExistRequest(data: object) {
  return request({
    url: `/api/course/courseIsExist`,
    method: 'post',
    data: data
  })
}

export function GetCourseRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}`,
    method: 'get'
  })
}

export function GetCourseChapterRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}/chapter`,
    method: 'get'
  })
}

export function GetCourseInquiryRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}/inquiry`,
    method: 'get'
  })
}

export function GetCourseFaqRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}/faq`,
    method: 'get'
  })
}

export function GetCourseRatingRequest(courseID: number) {
  return request({
    url: `/api/course/${courseID}/rating`,
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

export function CheckUserHasCourseRequest(data: object) {
  return request({
    url: `/api/user/ownedCourse/check`,
    method: 'post',
    data
  })
}

export function RatingRequest(method: string, courseID: number, data: object = {}) {
  return request({
    url: `/api/user/course/${courseID}/rating`,
    method: method,
    data
  })
}

export function GetRatingsRequest(courseID: number) {
  return request({
    url: `/api/user/course/${courseID}/ratings`,
    method: 'get'
  })
}
