<template>
  <form
    action="https://ccore.newebpay.com/MPG/mpg_gateway"
    method="post"
    name="toPaymentSite"
    id="toPaymentSite"
    class="hidden"
  >
    <input type="text" name="MerchantID" :value="merchantID" /> //這裡是商家編號 value
    應該不能直接放
    <input type="text" name="TradeSha" :value="paymentInfo.shaEncrypt" />
    <input type="text" name="TradeInfo" :value="paymentInfo.aesEncrypt" />
    <input type="text" name="TimeStamp" :value="paymentInfo.order.TimeStamp" />
    <input type="text" name="Version" :value="version" /> //這裡是金流版本 value 應該不能直接放
    <input type="text" name="MerchantOrderNo" :value="paymentInfo.order.MerchantOrderNo" />
    <input type="text" name="Amt" :value="paymentInfo.order.amt" />
    <input type="email" name="Email" :value="paymentInfo.order.email" />
    <input type="text" name="Name" :value="paymentInfo.order.name" />
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// import { useAuthStore } from '@/stores/auth'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
const { orderCreate } = useOrderStore()
const { paymentInfo } = storeToRefs(useOrderStore())
// const { user } = storeToRefs(useAuthStore())
const { cartCourseIDAry } = storeToRefs(useCartStore())
const version = import.meta.env.VITE_Version
const merchantID = import.meta.env.VITE_MerchantID

onMounted(() => {
  orderCreate({
    id: cartCourseIDAry.value,
    name: paymentInfo.value.order.Name,
    email: paymentInfo.value.order.Email,
    merchantOrderNo: paymentInfo.value.order.MerchantOrderNo
  })
  const toPaymentSiteForm = document.getElementById('toPaymentSite') as HTMLFormElement
  toPaymentSiteForm.submit()
})
</script>
