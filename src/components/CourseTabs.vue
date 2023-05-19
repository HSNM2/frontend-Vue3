<template>
  <button
    v-for="item in tabs"
    :key="item.name"
    type="button"
    class="flex items-center px-2 text-base font-bold text-primary-4 md:px-8"
    :class="activeStyle(item.name)"
    @click="changeTabAction(item.name)"
  >
    <span class="hidden font-bold md:block">
      {{ item.name.substring(0, 2) }}
    </span>
    {{ item.name.substring(2, 4) }}
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const emit = defineEmits(['changeTabView'])
const props = defineProps({
  tabs: { type: Object, required: true }
})
const tabName = ref('課程介紹')

const changeTabAction = (name: string) => {
  tabName.value = name
  emit('changeTabView', name)
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
