<template>
  <div
    @click="handleBackdropClick"
    :class="{ hidden: !modelValue }"
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-96 items-center">
      <div ref="modalContent" class="relative w-full rounded bg-white p-6 shadow">
        <div class="text-end">
          <i @click="updateModalValue(false)" class="material-icons cursor-pointer text-black"
            >close</i
          >
        </div>
        <h2 class="mb-6 text-center text-lg text-neutral-800">
          <slot name="title"></slot>
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

function updateModalValue(value: boolean) {
  emit('update:modelValue', value)
}

const modalContent = ref<HTMLInputElement | null>(null)
function handleBackdropClick(event: Event) {
  if (modalContent.value && !modalContent.value.contains(event.target as Node)) {
    updateModalValue(false)
  }
}
</script>
