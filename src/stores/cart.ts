import { defineStore } from 'pinia'
import { ref } from 'vue'

import { GetCartRequest } from '@/models/cart'

interface Cart {
  cartId: string
  cartItem: CartItem[]
  usedCoupon: string
  totalOriginPrice: number
  totalPrice: number
  offPercent: number
}

interface CartItem {
  id: string
  title: string
  provider: string
  image_path: string
  category: string
  type: string
  avgRating: number
  originPrice: number
  price: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | any>({})

  const hasAddCart = ref<boolean>(false)

  const cartCourseIDAry = ref<number[]>([])
  const immediateCheckoutCourseInfo = ref<CartItem | any>({})
  const isImmediateCheckout = ref<boolean>(false)

  function getLocalCart() {
    const localCart = localStorage.getItem('sweetTimeCart')
    if (localCart != null) {
      cart.value = JSON.parse(localCart)
      getCart()
    } else {
      cart.value = {
        cartItem: [],
        usedCoupon: '',
        totalOriginPrice: 0,
        totalPrice: 0,
        offPercent: 0
      }
      cartHandle()
    }
  }

  function getCart() {
    GetCartRequest({ id: cart.value.cartItem?.map((item: CartItem) => item.id) }).then((res) => {
      cart.value.cartItem = res.data.data
      cartHandle()
    })
  }

  function cartHandle() {
    cart.value.totalPrice = 0
    cart.value.totalOriginPrice = 0
    cart.value.cartItem.forEach((item: any) => {
      cart.value.totalPrice = cart.value.totalPrice += item.price
      if (item.originPrice != 0) {
        cart.value.totalOriginPrice = cart.value.totalOriginPrice += item.originPrice
      } else {
        cart.value.totalOriginPrice = cart.value.totalOriginPrice += item.price
      }
    })
    cart.value.offPercent = Math.round(
      ((cart.value.totalOriginPrice - cart.value.totalPrice) / cart.value.totalOriginPrice) * 100
    )
    localStorage.setItem('sweetTimeCart', JSON.stringify(cart.value))
  }

  function emptyCartHandle() {
    cart.value.cartItem = []
    hasAddCart.value = false
    cartHandle()
  }

  function addCartItem(item: CartItem) {
    cart.value.cartItem.push(item)
    cartHandle()
  }

  function addImmediateCourseItem(item: CartItem) {
    immediateCheckoutCourseInfo.value = JSON.parse(JSON.stringify(item))
    localStorage.removeItem('immediateCheckout')
    localStorage.setItem('immediateCheckout', JSON.stringify(immediateCheckoutCourseInfo.value))
  }

  function cartItemDeleteHandle(courseId: string) {
    cart.value.cartItem = cart.value.cartItem.filter((item: any) => item.id != courseId)
    courseAddedCheck(courseId)
    cartHandle()
  }

  function courseAddedCheck(courseId: string) {
    hasAddCart.value = false
    if (cart.value.cartItem.length != 0) {
      cart.value.cartItem.forEach((item: any) => {
        if (item.id == courseId) {
          hasAddCart.value = true
        }
      })
    }
  }

  return {
    cart,
    hasAddCart,
    cartCourseIDAry,
    immediateCheckoutCourseInfo,
    isImmediateCheckout,

    getLocalCart,
    getCart,
    cartHandle,
    courseAddedCheck,
    emptyCartHandle,
    cartItemDeleteHandle,
    addCartItem,
    addImmediateCourseItem
  }
})
