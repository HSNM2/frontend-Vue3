<template>
  <div class="container py-6">
    <div class="mb-6">
      <h3 class="mb-2 text-xl font-bold">color</h3>
      <div class="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-8">
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-1">#FFFAEC</p>
          <p>primary-1</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-2">#F8E585</p>
          <p>primary-2</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-3">#F3DA82</p>
          <p>primary-3</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-4">#BD8964</p>
          <p>primary-4</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-5 text-white">#816856</p>
          <p>primary-5</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-primary-6 text-white">#4B3828</p>
          <p>primary-6</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-secondary-1">#F8F7F5</p>
          <p>secondary-1</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-secondary-2">#B8E1DD</p>
          <p>secondary-2</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-50">#FFFFFF</p>
          <p>neutral-50</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-100">#F3F3F3</p>
          <p>neutral-100</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-150 text-white">#ECE9E9</p>
          <p>neutral-150</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-200">#D9D9D9</p>
          <p>neutral-200</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-400">#B7B7B7</p>
          <p>neutral-400</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-500 text-white">#757575</p>
          <p>neutral-500</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-600 text-white">#6F6F6F</p>
          <p>neutral-600</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-800 text-white">#3D3D3D</p>
          <p>neutral-800</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-900 text-white">#000000</p>
          <p>neutral-900</p>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="mb-2 text-xl font-bold">button 樣式</h3>
      <div class="mb-2">
        <button class="btn-primary mr-2">btn-primary</button>
        <button class="btn-secondary">btn-secondary</button>
      </div>
      <div>
        <button class="btn-back flex items-center gap-x-2">
          <img class="" src="/image/undo.png" alt="" />
          btn-back
        </button>
        <button class="btn-back-round mt-2">
          <img class="m-auto block" src="/image/undo.png" alt="" />
        </button>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="mb-2 text-xl font-bold">form 樣式</h3>
      <VForm>
        <div class="mb-6">
          <label for="name" class="form-label">名稱 <span class="text-rose-500">*</span></label>
          <VField name="name" type="text" rules="required" label="名稱" v-slot="{ field, errors }">
            <input
              id="name"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="name" />
        </div>
        <div>
          <VField
            name="username"
            type="text"
            rules="required"
            label="帳號"
            v-slot="{ field, errors }"
          >
            <input
              id="name"
              class="form-control"
              v-bind="field"
              :class="{ invalid: !!errors.length }"
              placeholder="帳號"
            />
          </VField>
          <ErrorMessage class="invalid-feedback" name="username" />
        </div>
      </VForm>
      <div class="mt-4">
        <input
          id="draft"
          class="mr-1 h-3 w-3 appearance-none rounded-full outline outline-1 outline-offset-1 outline-primary-6 checked:bg-primary-5"
          type="radio"
        />
        <label for="draft" class="text-primary-5">Draft</label>
      </div>
    </div>
    <div class="mb-6">
      <h3 class="mb-2 text-xl font-bold">card</h3>
      <h6 class="text-md mb-2 font-bold">問答留言</h6>
      <div class="grid grid-cols-12">
        <div class="col-span-12 rounded-2.5xl border border-neutral-200 p-2 md:col-span-9 md:p-4">
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
      <h6 class="text-md mb-2 mt-6 font-bold">評價</h6>
      <div class="grid grid-cols-12">
        <div class="col-span-12 rounded-2.5xl border border-secondary-2 p-5 md:col-span-9">
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
  </div>
</template>

<script setup lang="ts"></script>
