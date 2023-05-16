<template>
  <main>
    <div class="bg-paleYellow">
      <div class="md:container">
        <div class="grid grid-cols-12 px-3 py-6 lg:px-0 lg:py-[52px]">
          <div class="col-span-12 lg:col-span-6 lg:gap-x-6">
            <p class="pb-1 text-base text-neutral-800">王小明</p>
            <h2 class="pb-5 text-3xl font-bold text-primary-6">法式馬卡龍的製作與口感掌控</h2>
            <p class="pb-3 text-qa-title text-primary-6">無錯誤製作法：從材料到步驟一次搞定</p>
            <div class="flex gap-x-2 pb-3">
              <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">＃擠花技巧</p>
              <p class="rounded-[15px] bg-secondary-2 px-3 py-1 text-sm">＃烤製方法</p>
            </div>

            <div class="flex items-center lg:pb-3">
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star </span>
              <span class="material-icons text-lg text-primary-3"> star_border </span>
              <span class="text-sm text-neutral-600">(10則評價)</span>
            </div>

            <p class="pb-5 text-2xl font-bold text-primary-4">NT$23,000</p>
            <div class="flex items-center gap-x-5 pb-6">
              <button type="button" class="btn-primary">立即購買</button>
              <span class="material-icons text-primary-6"> shopping_cart </span>
              <span class="material-icons text-primary-6"> share </span>
              <span class="material-icons text-primary-6"> bookmark_border </span>
              <!-- <span class="material-icons text-primary-6"> bookmark </span> -->
            </div>
          </div>

          <!-- 影片先用圖片代替 -->
          <div class="col-span-12 lg:col-span-6">
            <div class="grid grid-cols-4">
              <div class="col-span-4">
                <img class="w-100" src="https://picsum.photos/636/295" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:container">
      <div class="py-6 lg:py-[52px]">
        <div class="relative mx-[12.5px] py-3">
          <div
            class="flex justify-around gap-x-[19px] pb-2 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary-3 after:content-['']"
          >
            <button
              type="button"
              class="flex items-center text-base font-bold text-primary-4"
              :class="activeStyle('課程介紹')"
              @click="changeTabAction('課程介紹')"
            >
              <span class="hidden font-bold md:block">課程</span>
              介紹
            </button>

            <button
              type="button"
              class="flex items-center text-base font-bold text-primary-4"
              :class="activeStyle('課程大綱')"
              @click="changeTabAction('課程大綱')"
            >
              <span class="hidden font-bold md:block">課程</span>
              大綱
            </button>
            <button
              type="button"
              class="flex items-center text-base font-bold text-primary-4"
              :class="activeStyle('課前問答')"
              @click="changeTabAction('課前問答')"
            >
              <span class="hidden font-bold md:block">課前</span>
              問答
            </button>
            <button
              type="button"
              class="flex items-center text-base font-bold text-primary-4"
              :class="activeStyle('常見問題')"
              @click="changeTabAction('常見問題')"
            >
              <span class="hidden font-bold md:block">常見</span>
              問題
            </button>
            <button
              type="button"
              class="flex items-center text-base font-bold text-primary-4"
              :class="activeStyle('課程評價')"
              @click="changeTabAction('課程評價')"
            >
              <span class="hidden font-bold md:block">課程</span>
              評價
            </button>
          </div>
        </div>
      </div>
      <!-- #region 課前問答 -->
      <template v-if="tabName === '課前問答'">
        <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
          <div class="relative col-span-12 lg:col-span-5">
            <input
              type="search"
              placeholder="搜尋關鍵字"
              class="h-10 w-full rounded-2.5xl border border-neutral-200 px-4 py-2"
            />
            <span class="material-icons absolute right-6 top-1 text-lg text-neutral-600">
              search
            </span>
          </div>
          <select
            class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2"
          >
            <option value="">全部問題</option>
          </select>
          <select
            class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2"
          >
            <option value="">日期最新</option>
          </select>
          <div class="col-span-12 lg:col-span-3">
            <div class="flex items-center justify-between px-[33.5px] lg:hidden">
              <p class="text-primary-6">對課程有些許問題？</p>
              <button class="btn-primary">開始提問</button>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-9">
            <div class="h-14 rounded-2.5xl border border-neutral-200 px-7 py-4">
              <p class="text-neutral-800">請先登入才能使用留言功能～</p>
            </div>
            <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
              <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">漂亮阿姨</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>老師好，請問馬卡龍算是餅乾？</p>
                </div>
              </div>
              <div class="rounded-2.5xl bg-secondary-2/50 px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">王小明</p>
                    <p class="rounded-[15px] bg-neutral-50 px-2 text-xs text-primary-5">講師</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>
                    杏仁餅乾是以杏仁粉和糖粉為主要原料，而馬卡龍則是在加入杏仁粉和糖粉之外，還加入了蛋白和糖漿，因此馬卡龍比起杏仁餅乾更具有嚼勁和口感。
                  </p>
                </div>
              </div>
              <div class="rounded-2.5xl bg-neutral-100 px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">漂亮阿姨</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>謝謝回覆</p>
                </div>
              </div>
            </div>
            <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
              <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">漂亮阿姨</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>老師好，請問馬卡龍算是餅乾？</p>
                </div>
              </div>
              <div class="rounded-2.5xl bg-secondary-2/50 px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">王小明</p>
                    <p class="rounded-[15px] bg-neutral-50 px-2 text-xs text-primary-5">講師</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>
                    杏仁餅乾是以杏仁粉和糖粉為主要原料，而馬卡龍則是在加入杏仁粉和糖粉之外，還加入了蛋白和糖漿，因此馬卡龍比起杏仁餅乾更具有嚼勁和口感。
                  </p>
                </div>
              </div>
              <div class="rounded-2.5xl bg-neutral-100 px-4 py-4 md:px-5 md:py-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-x-4">
                    <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                    <p class="">漂亮阿姨</p>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
                <div class="ml-14 mt-4">
                  <p>謝謝回覆</p>
                </div>
              </div>
            </div>
          </div>
          <div class="-mt-14 hidden lg:col-span-3 lg:block">
            <div
              class="flex flex-col items-center gap-y-4 rounded-2.5xl border border-neutral-200 py-8"
            >
              <img src="/image/icon-rolling-pin.png" class="h-[7px] w-[65px]" alt="" />
              <p class="text-base text-primary-6">對課程有些許問題？</p>
              <button class="btn-primary">開始提問</button>
            </div>
          </div>
        </div>
      </template>

      <!-- #endregion 課前問答 -->
      <!-- #region 課程評價 -->
      <template v-if="tabName === '課程評價'">
        <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
          <div class="col-span-12 lg:col-span-3 lg:col-start-10">
            <div class="rounded-2.5xl border border-neutral-200 px-[38px] py-5 lg:px-4">
              <div class="flex items-center justify-center gap-x-1.5">
                <span class="material-icons text-4xl text-primary-3"> star </span>
                <p class="text-xl font-bold">4.5</p>
                <p class="text-base text-neutral-600">/ 5.0(10則評價)</p>
              </div>
              <div class="my-4">
                <div class="flex items-center justify-center gap-x-4">
                  <div class="">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                  </div>
                  <div class="h-1 w-7/12 bg-neutral-150"></div>
                </div>
                <div class="flex items-center justify-center gap-x-4">
                  <div class="">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <div class="h-1 w-7/12 bg-neutral-150"></div>
                </div>
                <div class="flex items-center justify-center gap-x-4">
                  <div class="">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <div class="h-1 w-7/12 bg-neutral-150"></div>
                </div>
                <div class="flex items-center justify-center gap-x-4">
                  <div class="">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <div class="h-1 w-7/12 bg-neutral-150"></div>
                </div>
                <div class="flex items-center justify-center gap-x-4">
                  <div class="">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <div class="h-1 w-7/12 bg-neutral-150"></div>
                </div>
              </div>
              <button type="button" class="btn-primary mx-auto block">
                對課程有心得？ 開始評價
              </button>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-9 lg:row-start-1">
            <div class="mb-4 rounded-2.5xl border border-secondary-2 p-5">
              <div
                class="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0"
              >
                <div class="flex items-center gap-x-4">
                  <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                  <p class="">漂亮阿姨</p>
                </div>
                <div class="flex items-center justify-between md:gap-x-4">
                  <div class="flex items-center">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
              </div>
              <div class="mt-4 md:ml-14">
                <p>
                  這個法式馬卡龍的教學真的超棒的！講解詳細，步驟清晰易懂，而且影片拍攝也非常專業，謝謝這個網站提供這麼棒的課程！
                </p>
              </div>
            </div>
            <div class="mb-4 rounded-2.5xl border border-secondary-2 p-5">
              <div
                class="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between md:gap-y-0"
              >
                <div class="flex items-center gap-x-4">
                  <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                  <p class="">漂亮阿姨</p>
                </div>
                <div class="flex items-center justify-between md:gap-x-4">
                  <div class="flex items-center">
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star </span>
                    <span class="material-icons text-base text-primary-3"> star_border </span>
                  </div>
                  <p class="text-sm text-primary-4">2023/02/07 10:04</p>
                </div>
              </div>
              <div class="mt-4 md:ml-14">
                <p>
                  這個法式馬卡龍的教學真的超棒的！講解詳細，步驟清晰易懂，而且影片拍攝也非常專業，謝謝這個網站提供這麼棒的課程！
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- #endregion 課程評價 -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabName = ref('')

const changeTabAction = (name: string) => {
  tabName.value = name
}

const activeStyle = computed(() => {
  return (name: string) => {
    if (tabName.value === name) {
      return 'active'
    }
  }
})
</script>

<style lang="scss" scoped>
.bg-paleYellow {
  background-color: #fffaec;
}
.active {
  position: relative;
  &::after {
    content: '';
    background-color: #f3da82;
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: -7px;
    left: 0;
  }
}
</style>
