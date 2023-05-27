import request from '@/plugins/Axios'

export function GetCartRequest(data: object) {
  return request({
    url: '/api/cart',
    method: 'get',
    data
  })
}
