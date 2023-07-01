import request from '@/plugins/Axios'

export function GetUserCoursesRequest() {
  return request({
    url: '/api/user/courses',
    method: 'get'
  })
}

export function GetUserTagsRequest() {
  return request({
    url: '/api/user/tag',
    method: 'get'
  })
}
