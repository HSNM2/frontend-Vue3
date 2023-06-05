<template>
  <div class="container">
    <div class="mb-8 flex gap-x-2">
      <div class="w-3/4">
        <h1 class="mb-4 text-2xl font-bold">購物車</h1>
        <span v-if="cart.cartItem.length != 0" class="text-sm"
          >購物車中共有{{ cart.cartItem.length }}項課程</span
        >
        <hr class="my-1" />
        <div v-if="cart.cartItem.length != 0">
          <div v-for="item in cart.cartItem" :key="item.id">
            <div class="flex items-center">
              <div class="w-1/4 p-2">
                <div class="flex h-20 w-full items-center justify-center bg-neutral-300">
                  <p class="text-center text-lg font-bold">course</p>
                </div>
              </div>
              <div class="w-1/2 p-2">
                <span class="block font-bold">{{ item.title }}</span>
                <span class="block text-sm">{{ item.provider }}</span>
                <span class="block text-sm">{{ item.category }}/{{ item.type }}</span>
                <div class="flex justify-between">
                  <div class="flex">
                    <span v-for="n in 5" :key="n" class="material-icons text-sm text-yellow-300">
                      {{ n <= item.avgRating ? 'star' : 'star_border' }}
                    </span>
                  </div>
                  <span class="text-primary-5"
                    >{{ `$${item.price} `
                    }}<span class="text-sm text-neutral-900 line-through">{{
                      `$${item.originPrice}`
                    }}</span></span
                  >
                </div>
              </div>
              <div class="w-1/4 p-2">
                <button
                  class="btn-secondary mb-2 flex w-full items-center justify-center px-3 text-sm"
                  @click="cartItemDeleteHandle(item.id)"
                >
                  <span class="material-icons mr-1 text-sm"> close </span>刪除
                </button>
                <button class="btn-secondary flex w-full items-center justify-center px-3 text-sm">
                  <span class="material-icons mr-1 text-sm"> bookmarks </span>下次再買
                </button>
              </div>
            </div>
            <hr class="mt-2" />
          </div>
        </div>
        <div v-else>
          <span class="text-lg">購物車中沒有任何課程，快去逛逛吧！</span>
        </div>
      </div>
      <div v-if="cart.cartItem.length != 0" class="w-1/4 rounded bg-primary-1 p-4">
        <p class="">總計</p>
        <span class="block text-lg font-bold">${{ cart.totalPrice }}</span>
        <div class="flex justify-between">
          <span class="line-through">${{ cart.totalOriginPrice }}</span>
          <span class="text-red-500">{{ cart.offPercent }}%off</span>
        </div>
        <hr class="my-2" />
        <router-link to="/shoppingCart/paymentSelection" class="btn-primary block"
          >結帳</router-link
        >
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
import { useCartStore } from '@/stores/cart'
const { cart, cartItemDeleteHandle } = useCartStore()
</script>
