<template>
  <div class="container px-32">
    <div class="mb-8 flex flex-col justify-center gap-x-2">
      <h1 class="mb-4 text-center text-2xl font-bold">訂單完成</h1>
      <p class="mb-2 text-center text-lg font-bold">感謝您於本網站訂購課程，訂單資訊如下：</p>
      <div class="border-1 mb-4 flex w-full justify-center border border-neutral-700 py-4">
        <div>
          <p>訂單編號：{{ orderInfo.orderNumber }}</p>
          <p>訂單日期：{{ orderInfo.orderDate }}</p>
          <div>
            <p v-if="orderInfo.orderPaymentType == 'WEBATM'">付款方式：ATM轉帳</p>
            <p v-if="orderInfo.orderPaymentType == 'CREDIT'">付款方式：信用卡</p>
          </div>
          <p>付款金額：{{ orderInfo.orderAmount }}</p>
        </div>
      </div>
      <div class="mb-4 flex justify-center bg-neutral-300 p-8">
        <div>
          <p class="mb-2">
            訂單細節已寄送至您的信箱，若未收到信件，再請協助確認信箱內之垃圾郵件區。
          </p>
          <p>課程使用過程中如有問題，請不要客氣盡量提出唷~</p>
        </div>
      </div>
      <div class="flex justify-around">
        <router-link class="btn-secondary" to="/student/profile">課程列表</router-link
        ><router-link
          v-if="orderInfo && orderInfo.orderDetail"
          class="btn-secondary"
          :to="`/learn/${orderInfo.orderDetail.courseId}`"
          >開始上課</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
const { orderInfo } = storeToRefs(useOrderStore())

const route = useRoute()

onMounted(() => {
  orderInfo.value = {}
  if (route.query.data != undefined) {
    orderInfo.value = JSON.parse(route.query.data as string)
  }
})
</script>
