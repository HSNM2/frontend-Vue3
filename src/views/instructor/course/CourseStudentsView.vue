<template>
  <div class="mb-4 flex items-center justify-between rounded bg-neutral-50 p-4">
    <h1 class="font-bold text-neutral-800">學員列表</h1>
  </div>
  <div class="rounded bg-neutral-50 p-6">
    <table
      class="w-full table-auto border-separate border-spacing-0 rounded border text-neutral-800"
    >
      <thead class="text-sm">
        <tr>
          <th class="border-b p-3">狀態</th>
          <th class="border-b p-3">圖示</th>
          <th class="border-b p-3">名稱</th>
          <th class="border-b p-3">信箱</th>
          <th class="border-b p-3">加入日期</th>
          <th class="border-b p-3">進度</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-neutral-100">
          <td class="border-b p-3 text-center">
            <div
              class="mx-auto flex w-fit items-center rounded bg-green-100 p-1 px-2 text-xs text-green-600"
            >
              <span class="me-2 h-2 w-2 rounded-full bg-green-600"></span>已加入
            </div>
          </td>
          <td class="border-b p-3 text-center">
            <img src="https://fakeimg.pl/40/" class="mx-auto rounded-full" alt="圖示" />
          </td>
          <td class="border-b p-3 text-center">paper</td>
          <td class="border-b p-3 text-center">paper@gmail.com</td>
          <td class="border-b p-3 text-center">2021-05-02</td>
          <td class="border-b p-3 text-end">2 完成 / 2 個單元</td>
        </tr>
        <tr class="hover:bg-neutral-100">
          <td class="border-b p-3 text-center">
            <div
              class="mx-auto flex w-fit items-center rounded bg-rose-100 p-1 px-2 text-xs text-rose-600"
            >
              <span class="me-2 h-2 w-2 rounded-full bg-rose-600"></span>退款中
            </div>
          </td>
          <td class="border-b p-3 text-center">
            <img src="https://fakeimg.pl/40/" class="mx-auto rounded-full" alt="圖示" />
          </td>
          <td class="border-b p-3 text-center">ruby</td>
          <td class="border-b p-3 text-center">ruby0002@gmail.com</td>
          <td class="border-b p-3 text-center">2021-05-20</td>
          <td class="border-b p-3 text-end">0 個單元</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup></script>
