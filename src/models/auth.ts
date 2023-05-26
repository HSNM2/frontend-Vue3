import request from '@/plugins/Axios'

export function LoginRequest(data: object) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function RegisterRequest(data: object) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

export function IdentityRequest(method: string, data: object) {
  return request({
    url: '/api/user/identity',
    method: method,
    data
  })
}

export function LogoutRequest() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function UserRequest(method: string, data: object) {
  return request({
    url: '/api/user/profile',
    method: method,
    data: data
  })
}

export function AvatarPicRequest(data: object | null) {
  return request({
    url: '/api/user/profile/pic/upload',
    method: 'post',
    data: data
  })
}
