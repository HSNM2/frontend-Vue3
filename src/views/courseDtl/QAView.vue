<template>
  <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
    <div class="relative col-span-12 lg:col-span-5">
      <input
        type="search"
        placeholder="搜尋關鍵字"
        class="h-10 w-full rounded-2.5xl border border-neutral-200 px-4 py-2"
      />
      <span class="material-icons absolute right-6 top-1 text-lg text-neutral-600"> search </span>
    </div>
    <select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2">
      <option value="">全部問題</option>
    </select>
    <select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-2">
      <option value="">日期最新</option>
    </select>
    <div class="col-span-12 lg:col-span-3">
      <div v-if="isLogin === false" class="flex items-center justify-between px-[33.5px] lg:hidden">
        <p class="text-primary-6">對課程有些許問題？</p>
        <button class="btn-primary">開始提問</button>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-9">
      <div v-if="isLogin === false" class="h-14 rounded-2.5xl border border-neutral-200 px-7 py-4">
        <p class="text-neutral-800">請先登入才能使用留言功能～</p>
      </div>
      <template v-if="isLogin">
        <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
          <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-4">
                <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                <p class="">漂亮阿姨</p>
              </div>
              <p class="text-sm text-primary-4">2023/02/07 10:04</p>
            </div>
          </div>
          <div>
            <textarea
              name=""
              id=""
              class="w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5"
              placeholder="對本課程有疑問？請盡情發問吧！"
            ></textarea>
          </div>
          <div class="mt-2 flex justify-end">
            <button type="button" class="rounded bg-neutral-200 px-5 py-2 font-bold text-white">
              送出
            </button>
          </div>
        </div>
      </template>

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
        <template v-if="isLogin">
          <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-4">
                <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
                <p class="">漂亮阿姨</p>
              </div>
              <p class="text-sm text-primary-4">2023/02/07 10:04</p>
            </div>
          </div>
          <div>
            <textarea
              name=""
              id=""
              class="w-full rounded-2.5xl border border-neutral-100 px-4 py-4 md:px-5"
              placeholder="輸入內容..."
            ></textarea>
          </div>
          <div class="mt-2 flex justify-end">
            <button type="button" class="rounded bg-neutral-200 px-5 py-2 font-bold text-white">
              送出
            </button>
          </div>
        </template>
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
        <div v-if="isLogin === true" class="cursor-pointer p-1">
          <div class="flex items-center justify-end">
            <span class="material-icons text-base text-neutral-800"> undo </span>
            <span class="text-sm font-bold text-neutral-800">回覆</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLogin === false" class="-mt-14 hidden lg:col-span-3 lg:block">
      <div class="flex flex-col items-center gap-y-4 rounded-2.5xl border border-neutral-200 py-8">
        <img src="/image/icon-rolling-pin.png" class="h-[7px] w-[65px]" alt="" />
        <p class="text-base text-primary-6">對課程有些許問題？</p>
        <button class="btn-primary">開始提問</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isLogin: { type: Boolean, required: true }
})
</script>
<style lang=""></style>
