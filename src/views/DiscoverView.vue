<template>
  <div class="container py-6">
    <div class="mb-6">
      <h2 class="mb-2 text-xl font-bold">color</h2>
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
          <p class="h-8 w-24 border border-sky-500 bg-neutral-200">#D9D9D9</p>
          <p>neutral-200</p>
        </div>
        <div>
          <p class="h-8 w-24 border border-sky-500 bg-neutral-400">#B7B7B7</p>
          <p>neutral-400</p>
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
        <button class="btn-back mr-2">btn-back</button>
        <button class="btn-back2 mr-2"><span class="material-icons"> undo </span></button>
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
    </div>
    <div class="mb-6">
      <h3 class="mb-2 text-xl font-bold">card</h3>
      <div>
        <div class="rounded border border-neutral-200 p-4">
          <div class="rounded px-5 py-6">
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
          <div class="rounded bg-secondary-2 px-5 py-6">
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
          <div class="rounded bg-neutral-100 px-5 py-6">
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
    </div>
  </div>
</template>

<script setup lang="ts"></script>
