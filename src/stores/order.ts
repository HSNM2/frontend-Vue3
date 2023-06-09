import { defineStore } from 'pinia'
import { ref } from 'vue'

import { GetOrderInfoRequest, OrderCreateRequest, OrderCheckoutRequest } from '@/models/order'

interface OrderInfo {
  id: number[] //訂單中課程ID
  email: string
  name: string
}

interface OrderDetail {
  Email: string
  Name: string
  Amt: number
  ItemDesc: string
  TimeStamp: number
  MerchantOrderNo: string
}

interface PaymentInfo {
  status: boolean
  order: OrderDetail
  aesEncrypt: string
  shaEncrypt: string
}

interface CheckoutInfo {}

export const useOrderStore = defineStore('order', () => {
  const orderInfo = ref<OrderInfo | any>({})
  const paymentInfo = ref<PaymentInfo | any>({})
  const checkoutInfo = ref<CheckoutInfo | any>({})

  function orderInfoGenerate(payload: { id: number[]; email: string | any; name: string | any }) {
    return GetOrderInfoRequest(payload)
  }

  function orderCreate(payload: {
    id: number[]
    email: string | any
    name: string | any
    merchantOrderNo: string | any
  }) {
    return OrderCreateRequest(payload)
  }

  function orderCheckout(payload: { userID: string; courseID: number }) {
    return OrderCheckoutRequest(payload)
  }

  return {
    orderInfo,
    paymentInfo,
    checkoutInfo,

    orderInfoGenerate,
    orderCreate,
    orderCheckout
  }
})
