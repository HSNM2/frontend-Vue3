<template>
  <!--#region section1 -->
  <div
    class="bg-[url('/image/intro-banner.png')] bg-cover lg:bg-[url('/image/intro-banner-lg.png')]"
  >
    <div class="container">
      <div class="py-14 text-center md:py-[142px]">
        <h1 class="text-heading-3xl font-bold lg:text-heading-4xl">甜點專屬線上課程平台</h1>
        <p class="my-[26px] text-base">
          熱愛甜點？熱愛分享？加入我們的線上課程平台，與我們一起分享你的烘焙技巧。
        </p>
        <router-link :to="`/courses`">
          <button type="button" class="btn-primary">前往選購</button>
        </router-link>
      </div>
    </div>
  </div>
  <!--#endregion section1 -->

  <!--#region section2 -->
  <div class="container py-[52px] lg:py-[120px]">
    <h2 class="mb-5 text-center text-heading-3xl font-bold text-primary-5">建立自己的品牌</h2>
    <p class="mb-5 text-center text-base text-primary-5 lg:mb-[52px]">
      通過教授甜點知識和技能，建立起自己的品牌，開展個人的甜點事業，實現自己的夢想。
    </p>
    <div
      class="mb-6 flex flex-col bg-white shadow shadow-md shadow-neutral-150 lg:flex-row-reverse"
    >
      <img class="lg:w-1/2" src="/image/intro-group-1.png" alt="intro-image" />
      <div class="p-5 lg:w-1/2 lg:px-20 lg:py-[42px]">
        <div class="h-full lg:flex lg:flex-col lg:justify-center">
          <p class="mb-6 text-xl font-bold text-primary-5">創造被動收入</p>
          <p class="text-base text-neutral-800">
            您擁有多年的甜點烘焙經驗嗎？在我們的平台上，您可以開設您的獨家課程，與全球學員分享您的技巧和心得，並且輕鬆賺取額外收入！
          </p>
        </div>
      </div>
    </div>
    <div class="mb-6 flex flex-col bg-white shadow shadow-md shadow-neutral-150 lg:flex-row">
      <img class="lg:w-1/2" src="/image/intro-group-2.png" alt="intro-image" />
      <div class="p-5 lg:w-1/2 lg:px-20 lg:py-[42px]">
        <div class="h-full lg:flex lg:flex-col lg:justify-center">
          <p class="mb-6 text-xl font-bold text-primary-5">終身學習</p>
          <p class="text-base text-neutral-800">
            作為我們平台的教師，你將有機會與其他甜點製作專家交流，參與研討會和研究項目，並且不斷學習和提高自己的技能。
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-white shadow shadow-md shadow-neutral-150 lg:flex-row-reverse">
      <img class="lg:w-1/2" src="/image/intro-group-3.png" alt="intro-image" />
      <div class="p-5 lg:w-1/2 lg:px-20 lg:py-[42px]">
        <div class="h-full lg:flex lg:flex-col lg:justify-center">
          <p class="text-xl font-bold text-primary-5">免費教材資源</p>
          <p class="text-base text-neutral-800">
            作為我們平台的註冊教師，你可以免費獲取我們的教材資源，這些資源將有助於提高你的教學質量和學生的學習成效。
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--#endregion section2 -->

  <!--#region section3 -->
  <div class="bg-primary-1">
    <div class="container py-[52px] lg:py-[120px]">
      <h2 class="mb-5 text-center text-heading-3xl font-bold text-primary-5">如何開始</h2>
      <p class="mb-6 text-center text-base text-primary-5 lg:mb-[52px]">
        通過教授甜點知識和技能，建立起自己的品牌，開展個人的甜點事業，實現自己的夢想。
      </p>
      <div class="flex flex-col gap-y-6 md:flex-row md:gap-x-14 lg:gap-x-[120px] lg:px-12">
        <div class="flex flex-col items-center md:w-1/3">
          <img src="/image/intro-icon-1.png" alt="intro-image" />
          <p class="mb-2 mt-4 text-lg font-bold text-primary-6">規劃課程</p>
          <p class="text-center text-base text-neutral-900">
            我們提供了大量關於如何創建您的第一門課程的資源。而且，我們的講師儀表板和課程頁面可幫助您保持井井有條。
          </p>
        </div>
        <div class="flex flex-col items-center md:w-1/3">
          <img src="/image/intro-icon-2.png" alt="intro-image" />
          <p class="mb-2 mt-4 text-lg font-bold text-primary-6">錄製影片</p>
          <p class="text-center text-base text-neutral-900">
            智能手機或數碼單反相機等基本工具。再加上一個好的麥克風，您就可以開始了。
          </p>
        </div>
        <div class="flex flex-col items-center md:w-1/3">
          <img src="/image/intro-icon-3.png" alt="intro-image" />
          <p class="mb-2 mt-4 text-lg font-bold text-primary-6">開始授課</p>
          <p class="text-center text-base text-neutral-900">
            通過社交媒體和專業網絡推廣您的課程，我們將會不定時推送訊息給平台學員。
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--#endregion section3 -->

  <!--#region section4 -->
  <div class="container py-[52px] lg:py-[120px]">
    <div class="grid grid-cols-4 gap-y-6 lg:flex lg:items-center lg:justify-center lg:gap-x-20">
      <div class="col-span-4 md:col-span-2 md:col-start-2">
        <div class="relative">
          <img class="w-full" src="/image/intro-image-1.png" alt="intro-image" />
          <div
            class="absolute -right-[13px] -top-[7px] h-full w-full rounded-full border border-primary-3"
          ></div>
        </div>
      </div>
      <div class="col-span-4 md:col-span-2 md:col-start-2">
        <div class="lg:flex lg:items-center lg:justify-center">
          <div class="lg:w-[420px]">
            <p class="mb-5 text-base text-neutral-900">
              作為一位甜點師，我很高興能加入這個線上授課平台。這裡的學生非常熱情，並且對學習甜點製作非常有熱情，讓我非常感動。平台提供了一個很好的學習環境，讓我可以自由地分享我的技巧和經驗，同時也可以從學生的反饋中不斷改進自己的教學方式。我非常推薦這個平台，如果你也是一位熱愛甜點、想要傳授自己技巧的講師，這裡一定會是你的好選擇。
            </p>
            <p class="text-right text-base text-primary-4">食神 - 史蒂芬周</p>
            <p class="text-right text-sm text-primary-6">廚藝訓練學院跳級生</p>
          </div>
        </div>
      </div>
      <div>
        <span class="material-icons hidden text-[60px] text-primary-6 lg:block">
          navigate_next
        </span>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-center gap-x-4">
      <div class="active h-2 w-2 rounded-full bg-primary-6"></div>
      <div class="h-2 w-2 rounded-full bg-neutral-200"></div>
      <div class="h-2 w-2 rounded-full bg-neutral-200"></div>
    </div>
  </div>

  <!--#endregion section4 -->

  <!--#region section5 -->
  <div class="bg-primary-1">
    <div class="container py-[52px] lg:py-[120px]">
      <h2 class="mb-6 text-center text-heading-3xl font-bold text-primary-5 md:mb-[42px]">
        常見問題
      </h2>
      <div class="flex flex-col gap-6 md:flex-row md:flex-wrap">
        <div class="border border-2 border-primary-3 p-5 md:w-[calc(50%-12px)]">
          <div class="flex items-start gap-x-6 lg:items-center">
            <img class="w-12 lg:w-24" src="/image/intro-icon-4.png" alt="intro-icon" />
            <div>
              <h6 class="mb-3 text-lg text-neutral-900">我需要有專業的廚藝執照才能成為講師嗎？</h6>
              <p class="text-base text-neutral-900">
                歡迎所有對甜點有熱情和創意的人成為講師。無論您是業餘愛好者，還是已經擁有豐富經驗的專業人士，只要您有熱情和想要分享，我們都樂意提供平台，讓您展現您的才華。
              </p>
            </div>
          </div>
        </div>
        <div class="border border-2 border-primary-3 p-5 md:w-[calc(50%-12px)]">
          <div class="flex items-start gap-x-6 lg:items-center">
            <img class="w-12 lg:w-24" src="/image/intro-icon-4.png" alt="intro-icon" />
            <div>
              <h6 class="mb-3 text-lg text-neutral-900">我需要有自己的甜點店才能成為講師嗎？</h6>
              <p class="text-base text-neutral-900">
                不需要。我們的平台旨在提供給所有想要與人分享自己烘焙技能的人。只要您有烘焙經驗並且熱愛教學，我們歡迎您成為講師。
              </p>
            </div>
          </div>
        </div>
        <div class="border border-2 border-primary-3 p-5 md:w-[calc(50%-12px)]">
          <div class="flex items-start gap-x-6 lg:items-center">
            <img class="w-12 lg:w-24" src="/image/intro-icon-4.png" alt="intro-icon" />
            <div>
              <h6 class="mb-3 text-lg text-neutral-900">我應該如何推廣自己的授課課程？</h6>
              <p class="text-base text-neutral-900">
                我們提供了各種線上宣傳方式，包括社交媒體宣傳、廣告投放、SEO優化等等，幫助你的課程被更多人發現。讓我們一起開始你的甜點授課之旅吧！
              </p>
            </div>
          </div>
        </div>
        <div class="border border-2 border-primary-3 p-5 md:w-[calc(50%-12px)]">
          <div class="flex items-start gap-x-6 lg:items-center">
            <img class="w-12 lg:w-24" src="/image/intro-icon-4.png" alt="intro-icon" />
            <div>
              <h6 class="mb-3 text-lg text-neutral-900">如何設定我的課程價格？</h6>
              <p class="text-base text-neutral-900">
                您可以根據自己的喜好和市場需求來設定課程價格。我們建議您進行市場研究，以了解類似課程的價格範圍，並考慮您的經驗和知識水平。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--#endregion section5 -->

  <!--#region section6 -->
  <div class="container relative py-[52px] lg:py-[120px]">
    <div class="flex flex-col items-center justify-center gap-y-5">
      <h2 class="text-heading-3xl font-bold text-primary-5">你不必一個人做</h2>
      <p class="text-base text-primary-5 md:w-1/2">
        讓我們與您一起合作，搭配「 <span class="font-bold">食 food - 智能 AI 助教</span>
        」一同打造最精彩的線上甜點課程！讓您的專業技能得以展現，
        共創甜點界的新藍海。現在就加入我們，開啟您的甜點教學之旅！
      </p>
      <button v-if="!user?.identity" type="button" class="btn-primary" @click="checkIdentity">
        我要開課
      </button>
    </div>
    <div class="hidden xl:block">
      <div
        class="absolute -top-[180px] right-36 -z-50 h-[360px] w-[360px] rounded-full bg-primary-1"
      ></div>
      <img
        class="absolute top-0 z-10 w-[400px] lg:right-0"
        src="/image/intro-image-2.png"
        alt="intro-image"
      />
      <div
        class="absolute -bottom-[180px] left-36 -z-50 h-[360px] w-[360px] rounded-full bg-primary-1"
      ></div>
      <img
        class="absolute bottom-0 z-10 w-[400px] rotate-180 lg:left-0"
        src="/image/intro-image-2.png"
        alt="intro-image"
      />
    </div>
  </div>

  <!--#endregion section6 -->
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { authModal, authModalType, courseProviderAllowModal, user } = storeToRefs(auth)

const isLogin = ref(false)

const checkIdentity = () => {
  if (isLogin.value === false) {
    openAuthModal()
  } else {
    courseProviderAllowModal.value = true
  }
}

const openAuthModal = (type = 'login') => {
  authModal.value = true
  authModalType.value = type
}

const checkLogin = () => {
  if (user.value !== null) {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

watch(user, () => {
  checkLogin()
})

onMounted(() => {
  scrollToTop()
  checkLogin()
})
</script>
<style lang="scss" scoped></style>
