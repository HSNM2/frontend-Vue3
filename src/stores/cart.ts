import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

interface Cart {
  cartId: string
  cartItem: Array<any>
  usedCoupon: string
  totalPrice: number
  isEmpty: boolean
}

// interface CartItem {
//   id: string
//   title: string
//   provider: string
//   category: string
//   type: string
//   avgRating: number
//   originPrice: number
//   price: number
// }

import { GetCartRequest } from '@/models/cart'

export const useCartStore = defineStore('cart', () => {
  // const cart = ref<any | null>(null)
  const cart = ref<Cart>({
    cartId: '1',
    cartItem: [
      {
        id: '1-1',
        title: '手工法式馬卡龍：一個完整的步驟指...',
        provider: 'course_provider',
        category: 'course_category',
        type: 'course_type',
        avg_rating: 'course_avg_rating',
        origin_price: 1500,
        price: 1000
      }
    ],
    usedCoupon: '',
    totalPrice: 0,
    isEmpty: false
  })

  const remoteCart = ref(null)

  const { user } = useAuthStore()

  function getLocalCart() {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart') || '')
    } else {
      return null
    }
  }
  // function getRemoteCart(payload: { id: Array<string> }) {
  //   GetCartRequest({
  //     payload
  //   }).then((res) => {
  //     return res
  //   })
  // }

  function cartHandle() {
    cart.value.cartItem.forEach((item) => {
      cart.value.totalPrice = cart.value.totalPrice += item.price
    })
    // if (getLocalCart() && !remoteCart.value) {
    //   cart.value = getLocalCart()
    // } else if (!getLocalCart() && user) {
    //   cart.value = await getRemoteCart()
    // }
  }
  return {
    cart,

    getLocalCart,
    // getRemoteCart,
    cartHandle
  }
})
