<template>
  <div class="container">
    <div class="flex items-center justify-center py-5">
      <div class="mr-2 flex items-center justify-center">
        <span
          class="mr-1 h-6 w-6 rounded-full border-2 border-neutral-500 text-center text-sm text-neutral-500"
        >
          1</span
        >
        <span class="material-icons hidden rounded-full bg-primary-4"> done </span>
        <p class="text-lg text-neutral-500">訂單確認</p>
      </div>
      <div class="mr-2 h-1 w-1/5 bg-neutral-500"></div>
      <div class="mr-2 flex items-center justify-center">
        <span
          class="mr-1 h-6 w-6 rounded-full border-2 border-neutral-500 text-center text-sm text-neutral-500"
        >
          2</span
        >
        <span class="material-icons hidden rounded-full bg-primary-4"> done </span>
        <p class="text-lg text-neutral-500">付款資訊</p>
      </div>
      <div class="mr-2 h-1 w-1/5 bg-neutral-500"></div>
      <div class="mr-2 flex items-center justify-center">
        <span
          class="mr-1 h-6 w-6 rounded-full border-2 border-neutral-500 text-center text-sm text-neutral-500"
        >
          3</span
        >
        <span class="material-icons hidden rounded-full bg-primary-4"> done </span>
        <p class="text-lg text-neutral-500">訂單完成</p>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts"></script>
