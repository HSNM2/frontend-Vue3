import request from '@/plugins/Axios'

export function GetOrderInfoRequest(data: object) {
  return request({
    url: '/api/cart/order',
    method: 'post',
    data
  })
}

export function OrderCreateRequest(data: object) {
  return request({
    url: '/api/cart/createOrder',
    method: 'post',
    data
  })
}

export function OrderCheckoutRequest(data: object) {
  return request({
    url: '/api/checkout',
    method: 'post',
    data
  })
}
