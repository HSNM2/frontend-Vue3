<template>
  <header class="relative h-auto">
    <div class="container mx-auto flex h-full items-center justify-between py-2 lg:py-3">
      <RouterLink to="/">
        <div class="h-11 w-25 bg-logo bg-contain bg-center bg-no-repeat lg:h-12 lg:w-27"></div>
      </RouterLink>
      <nav class="md:w-full">
        <div class="flex items-center md:hidden">
          <span class="material-icons pr-1 text-3xl text-primary-5"> shopping_cart </span>
          <span class="material-icons text-4xl text-primary-5"> menu </span>
        </div>
        <div class="hidden md:flex md:items-center md:justify-between">
          <button class="ml-14 flex items-center">
            <p class="mr-3 text-primary-5">探索</p>
            <span class="material-icons text-primary-5"> expand_more </span>
          </button>
          <div class="flex items-center gap-x-4">
            <span class="material-icons pr-1 text-3xl text-neutral-600"> search </span>
            <template v-if="!user">
              <span class="material-icons pr-1 text-3xl text-neutral-600"> shopping_cart </span>
              <button @click="openAuthModal('login')" class="btn-primary">登入</button>
              <button @click="openAuthModal('register')" class="btn-secondary">註冊</button>
            </template>
            <template v-else>
              <button class="btn-primary">我的學習</button>
              <div class="group relative">
                <span class="material-icons cursor-pointer pr-1 text-3xl text-neutral-600">
                  shopping_cart
                </span>
                <span
                  class="absolute bottom-1 right-0 h-5 w-5 rounded-full bg-red-500 text-center leading-tight text-neutral-50"
                  v-if="cart.cartItem.length != 0"
                  >{{ cart.cartItem.length }}</span
                >
                <div
                  class="absolute right-0 top-full z-10 hidden w-72 pt-2 hover:block group-hover:block"
                >
                  <div class="rounded border bg-neutral-50">
                    <div class="flex items-center justify-between px-4 py-3 pb-1">
                      <p class="text-lg font-bold">購物車</p>
                      <button
                        v-if="cart.cartItem.length != 0"
                        class="btn-secondary"
                        @click="emptyCartHandle"
                      >
                        清空購物車
                      </button>
                    </div>
                    <hr class="my-2" />
                    <div v-if="cart.cartItem.length != 0">
                      <div class="" v-for="item in cart.cartItem" :key="item.id">
                        <div class="flex p-2 pt-0">
                          <!-- <img
                            src="https://fakeimg.pl/90x56/B7B7B7/?text=Courses"
                            class="w-22 h-14 object-cover"
                            alt="課程圖片"
                          /> -->
                          <div class="mr-2 w-1/2">
                            <div
                              class="flex h-full w-full items-center justify-center bg-primary-3"
                            >
                              <span class="font-bold">courses</span>
                            </div>
                          </div>
                          <div class="">
                            <p>{{ item.title }}</p>
                            <div class="flex items-end justify-between">
                              <div>
                                <span class="text-lg text-primary-5"
                                  >{{ `$${item.price} `
                                  }}<span class="text-sm text-neutral-900 line-through">{{
                                    `$${item.originPrice}`
                                  }}</span></span
                                >
                              </div>
                              <i
                                class="material-icons cursor-pointer text-red-400"
                                @click="cartItemDeleteHandle(item.id)"
                                >delete_outline</i
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p v-if="cart.cartItem.length == 0" class="mb-2 text-center">
                      購物車還是空的<br />快來探索一下課程吧
                    </p>

                    <hr v-if="cart.cartItem.length != 0" class="mb-2" />

                    <div
                      v-if="cart.cartItem.length != 0"
                      class="flex items-center justify-between p-2 pt-0"
                    >
                      <span class="text-lg">{{ `總價：${cart.totalPrice}` }}</span>
                      <router-link to="/shoppingCart/orderConfirmation" class="btn-primary"
                        >結帳</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="group relative">
                <img
                  :src="
                    user?.avatarImagePath
                      ? user?.avatarImagePath
                      : 'https://fakeimg.pl/40x40/B7B7B7/?text=User'
                  "
                  class="h-10 w-10 cursor-pointer rounded-full object-cover"
                  alt="頭像"
                />
                <div
                  class="absolute right-0 top-full z-10 hidden w-72 pt-2 hover:block group-hover:block"
                >
                  <div class="rounded border bg-neutral-50">
                    <div class="flex items-center p-4 pb-2">
                      <img
                        :src="
                          user?.avatarImagePath
                            ? user?.avatarImagePath
                            : 'https://fakeimg.pl/60x60/B7B7B7/?text=User'
                        "
                        class="h-15 w-15 rounded-full object-cover"
                        alt="頭像"
                      />
                      <div class="pl-2">
                        <span class="block font-bold">{{ user.name }}</span>
                        <span class="block text-sm text-neutral-600">{{ user.email }}</span>
                      </div>
                    </div>
                    <hr class="my-2" />
                    <nav class="text-neutral-800">
                      <router-link to="/student/profile" class="block px-4 py-2"
                        >會員資料</router-link
                      >
                      <router-link
                        v-if="user.identity == '[1]'"
                        to="/instructor/courses"
                        class="block px-4 py-2"
                        >課程後台</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的學習</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的購物車</router-link
                      >
                      <router-link to="/" class="pointer-events-none block px-4 py-2 opacity-50"
                        >我的收藏</router-link
                      >
                      <button
                        v-if="!user.identity"
                        type="button"
                        class="block w-full px-4 py-2 text-left"
                        @click="courseProviderAllowModal = true"
                      >
                        開啟開課功能
                      </button>
                      <hr class="my-2" />
                      <a href="/" @click.prevent="handleLogout" class="block px-4 py-2 pb-4"
                        >登出</a
                      >
                    </nav>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </nav>
    </div>
    <!-- side pop-up menu -->
    <div class="absolute top-0 z-10 hidden h-screen w-full bg-neutral-600 pl-24">
      <div class="container h-screen w-full bg-neutral-50 pt-3">
        <div class="flex justify-end">
          <span class="material-icons text-4xl text-primary-5"> close </span>
        </div>
        <div class="mx-auto mb-3.5 h-12 w-27 bg-logo bg-contain bg-center bg-no-repeat"></div>
        <div class="relative mb-6">
          <input
            class="w-full rounded-3xl border border-neutral-200 pr-8 text-heading-3xl"
            type="text"
            name=""
            id=""
          />
          <span class="material-icons absolute right-3 top-0.5 text-xl text-primary-5">
            search
          </span>
        </div>
        <div class="mb-4">
          <div
            class="flex items-center justify-center border-b border-b-neutral-100 py-4 text-center text-primary-6"
          >
            <span>探索</span>
            <span class="material-icons">expand_more</span>
          </div>
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >線上開課教學</RouterLink
          >
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >常見問答</RouterLink
          >
          <RouterLink
            to=""
            class="block border-b border-b-neutral-100 py-4 text-center text-primary-6"
            >聯絡我們</RouterLink
          >
        </div>
        <div class="flex justify-between">
          <button class="btn-primary">登入</button>
          <button class="btn-secondary">註冊</button>
        </div>
      </div>
    </div>
  </header>
  <AuthModal />
  <CourseProviderAllowModal />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useStatusStore } from '@/stores/status'
import { useCartStore } from '@/stores/cart'
import AuthModal from './AuthModal.vue'
import CourseProviderAllowModal from './CourseProviderAllowModal.vue'
import { useRouter } from 'vue-router'
import useErrorHandler from '../composables/useErrorHandler'

const router = useRouter()
const { showError } = useErrorHandler()

const { updateLoading } = useStatusStore()
const auth = useAuthStore()
const { cart, cartHandle, emptyCartHandle, cartItemDeleteHandle } = useCartStore()
const { logout } = auth
const { authModal, authModalType, courseProviderAllowModal, user } = storeToRefs(auth)

function openAuthModal(type = 'login') {
  authModal.value = true
  authModalType.value = type
}

function handleLogout() {
  updateLoading(true)
  logout()
    .then(() => {
      router.push('/')
    })
    .catch((err) => {
      showError(err)
    })
    .finally(() => {
      updateLoading(false)
    })
}

onMounted(() => {
  cartHandle()
})
</script>
