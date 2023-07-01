<template>
  <div class="container">
    <div class="mb-8 flex gap-x-2">
      <div class="w-3/4">
        <h1 class="mb-4 text-2xl font-bold">訂單資訊</h1>
        <span>本網站所有交易皆使用藍新金流服務</span>
        <div class="rounded-lg bg-primary-2 p-4">
          <VForm ref="form" v-slot="{}">
            <div class="flex gap-x-4">
              <div class="w-1/3">
                <label for="name" class="form-label">姓名</label>
                <VField name="name" rules="required" label="姓名" v-slot="{ field, errors, meta }">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    v-model="userName"
                    v-bind="field"
                    :class="{ invalid: meta.validated && !!errors.length }"
                  />
                  <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="name" />
                </VField>
              </div>
              <div class="w-2/3">
                <label for="email" class="form-label">電子郵件</label>
                <VField
                  name="email"
                  rules="required"
                  label="電子郵件"
                  v-model="userEmail"
                  v-slot="{ field, errors, meta }"
                >
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    v-bind="field"
                    :class="{ invalid: meta.validated && !!errors.length }"
                  />
                  <ErrorMessage v-if="meta.validated" class="invalid-feedback" name="email" />
                </VField>
              </div>
            </div>
          </VForm>
        </div>

        <hr class="my-1" />
        <span v-if="cart.cartItem.length != 0" class="text-sm"
          >購物車中共有{{ cart.cartItem.length }}項課程</span
        >
        <hr class="my-1" />
        <div v-if="isImmediateCheckout">
          <div class="flex items-center">
            <div class="w-1/4 p-2">
              <img
                :src="
                  immediateCheckoutCourseInfo?.image_path
                    ? immediateCheckoutCourseInfo?.image_path
                    : 'https://fakeimg.pl/90x56/B7B7B7/?text=Courses'
                "
                class="h-full w-full object-cover"
                alt="課程圖片"
              />
            </div>
            <div class="w-full p-2">
              <span class="block font-bold">{{ immediateCheckoutCourseInfo.title }}</span>
              <span class="block text-sm">{{ immediateCheckoutCourseInfo.provider }}</span>
              <span class="block text-sm"
                >{{ immediateCheckoutCourseInfo.category }}/{{
                  immediateCheckoutCourseInfo.type
                }}</span
              >
              <div class="flex justify-between">
                <div class="flex">
                  <span v-for="n in 5" :key="n" class="material-icons text-sm text-yellow-300">
                    {{ n <= immediateCheckoutCourseInfo.avgRating ? 'star' : 'star_border' }}
                  </span>
                </div>
                <p class="text-primary-5">
                  {{ `$${immediateCheckoutCourseInfo.price}` }}
                  <span
                    v-if="
                      immediateCheckoutCourseInfo.originPrice !== 0 &&
                      immediateCheckoutCourseInfo.price < immediateCheckoutCourseInfo.originPrice
                    "
                    class="text-sm text-neutral-900 line-through"
                  >
                    {{ `$${immediateCheckoutCourseInfo.originPrice}` }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="cart.cartItem.length != 0">
            <div v-for="item in cart.cartItem" :key="item.id">
              <div class="flex items-center">
                <div class="w-1/4 p-2">
                  <img
                    :src="
                      item?.image_path
                        ? item?.image_path
                        : 'https://fakeimg.pl/90x56/B7B7B7/?text=Courses'
                    "
                    class="h-full w-full object-cover"
                    alt="課程圖片"
                  />
                </div>
                <div class="w-full p-2">
                  <span class="block font-bold">{{ item.title }}</span>
                  <span class="block text-sm">{{ item.provider }}</span>
                  <span class="block text-sm">{{ item.category }}/{{ item.type }}</span>
                  <div class="flex justify-between">
                    <div class="flex">
                      <span v-for="n in 5" :key="n" class="material-icons text-sm text-yellow-300">
                        {{ n <= item.avgRating ? 'star' : 'star_border' }}
                      </span>
                    </div>
                    <p class="text-primary-5">
                      {{ `$${item.price} ` }}
                      <span
                        v-if="item.originPrice !== 0 && item.price < item.originPrice"
                        class="text-sm text-neutral-900 line-through"
                      >
                        {{ `$${item.originPrice}` }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr class="mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="immediateCheckoutCourseInfo.id || cart.cartItem.length != 0"
        class="w-1/4 rounded bg-primary-1 p-4"
      >
        <p class="">總計</p>
        <span class="block text-lg font-bold"
          >${{
            isImmediateCheckout && immediateCheckoutCourseInfo.price
              ? immediateCheckoutCourseInfo.price
              : cart.totalPrice
          }}</span
        >
        <div class="flex justify-between">
          <span class="line-through"
            >${{
              isImmediateCheckout && immediateCheckoutCourseInfo.originPrice
                ? immediateCheckoutCourseInfo.originPrice
                : cart.totalOriginPrice
            }}</span
          >
          <span v-if="cart.cartItem.length != 0" class="text-red-500"
            >{{ cart.offPercent }}%off</span
          >
        </div>
        <hr class="my-2" />
        <button class="btn-primary block" @click="paymentConfirmationHandle()">確定付款</button>
      </div>
    </div>
    <div class="mb-10">
      <span class="text-lg">您可能也會喜歡...</span>
      <div class="flex gap-x-2">
        <template v-for="n in 4" :key="n">
          <div class="w-1/4">
            <div class="mb-1 flex h-20 w-full items-center justify-center bg-neutral-300">
              <p class="text-center text-lg font-bold">course</p>
            </div>
            <p class="text-center">course name</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
const router = useRouter()
const { cart, cartCourseIDAry, immediateCheckoutCourseInfo, isImmediateCheckout } = storeToRefs(
  useCartStore()
)
const { orderInfoGenerate } = useOrderStore()
const { paymentInfo } = storeToRefs(useOrderStore())

const userName = ref<string>('')
const userEmail = ref<string>('')

function cartCourseIDHandle() {
  cart.value.cartItem.forEach((item: any) => {
    cartCourseIDAry.value.push(+item.id)
  })
}

function paymentConfirmationHandle() {
  let payload: any,
    checkoutCourseId: number[] = []
  if (isImmediateCheckout.value) {
    checkoutCourseId.push(+immediateCheckoutCourseInfo.value.id)
    payload = {
      id: checkoutCourseId,
      name: userName.value,
      email: userEmail.value
    }
  } else {
    payload = {
      id: cartCourseIDAry.value,
      name: userName.value,
      email: userEmail.value
    }
  }
  orderInfoGenerate(payload).then((res) => {
    paymentInfo.value = res.data
    localStorage.removeItem('immediateCheckout')
    router.replace('/toPaymentSite')
  })
}

onMounted(() => {
  if (localStorage.getItem('immediateCheckout') != null) {
    immediateCheckoutCourseInfo.value = JSON.parse(localStorage.getItem('immediateCheckout') as any)
  }
  cartCourseIDAry.value = []
  paymentInfo.value = {}
  cartCourseIDHandle()
})
</script>
