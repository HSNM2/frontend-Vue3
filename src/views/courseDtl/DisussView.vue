<template>
  <div class="mb-16 grid grid-cols-12 gap-x-6 gap-y-4 px-3">
    <div class="relative col-span-12 lg:col-span-8">
      <input
        type="search"
        placeholder="搜尋關鍵字"
        class="h-10 w-full rounded-2.5xl border border-neutral-200 px-4 py-2"
      />
      <span class="material-icons absolute right-6 top-1 text-lg text-neutral-600"> search </span>
    </div>
    <select class="col-span-6 h-10 rounded-2.5xl border border-neutral-200 px-4 py-2 lg:col-span-4">
      <option value="">全部問題</option>
    </select>

    <div class="col-span-12">
      <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:pt-4">
        <div class="">
          <div class="flex flex-col gap-y-2">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
              <p class="">漂亮阿姨</p>
            </div>
            <div>
              <label for="" class="mr-4 text-base text-primary-5"
                ><input
                  type="radio"
                  value="currentChapter"
                  v-model="checkedChapter"
                />目前章節</label
              >
              <label for="" class="text-base text-primary-5"
                ><input type="radio" value="allChapter" v-model="checkedChapter" />全部章節</label
              >
            </div>
          </div>
        </div>

        <div class="md:mt-4">
          <textarea
            name=""
            id=""
            class="w-full rounded-2.5xl border border-neutral-200 px-4 py-4 md:px-5"
            placeholder="對本課程有疑問？請盡情發問吧！"
          ></textarea>
        </div>
        <div class="mt-2 flex justify-end">
          <button type="button" class="btn-primary w-[112px]">提問</button>
        </div>
      </div>

      <div class="mt-4 rounded-2.5xl border border-neutral-200 p-2 md:p-4">
        <div class="rounded-2.5xl px-4 py-4 md:px-5 md:py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full" src="https://picsum.photos/40/40" alt="" />
              <p class="">漂亮阿姨</p>
            </div>
            <div class="flex items-center gap-x-4">
              <span class="rounded-[14px] bg-primary-2 px-2.5 py-1 text-sm">第三章</span>
              <p class="text-sm text-primary-4">2023/02/07 10:04</p>
            </div>
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
        <div class="flex justify-end py-3">
          <button type="button" class="btn-secondary w-[112px] px-0">
            <div class="flex justify-center">
              <span class="material-icons text-neutral-900"> undo </span>
              <span class="text-neutral-900">回覆</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const checkedChapter = ref('currentChapter')
</script>
<style lang=""></style>
