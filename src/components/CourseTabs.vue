<template>
  <template v-for="item in tabs" :key="item.name">
    <div :class="item.style">
      <button
        type="button"
        class="flex items-center px-2 text-base font-bold text-primary-4 md:px-8 md:text-[18px]"
        :class="activeStyle(item.name)"
        @click="changeTabAction(item.name)"
      >
        <template v-if="$route.name === 'course'">
          <span class="hidden font-bold md:block">
            {{ item.name.substring(0, 2) }}
          </span>
          {{ item.name.substring(2, 4) }}
        </template>
        <template v-else>
          {{ item.name }}
        </template>
      </button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['changeTabView'])
const props = defineProps({
  tabs: { type: Object, required: true }
})
const route = useRoute()
const tabName = route.name === 'learn' ? ref('課程討論') : ref('課程介紹')

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

const windowWidth = ref(window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth
  })
})

watch(windowWidth, () => {
  if (windowWidth.value > 1296) {
    if (route.name === 'learn' && tabName.value === '課程內容') {
      tabName.value = '課程討論'
      emit('changeTabView', tabName.value)
    }
  }
})

defineExpose({
  changeTabAction
})
</script>

<style lang="scss" scoped>
.active {
  position: relative;
  color: #4b3828;
  &::after {
    content: '';
    background-color: #f3da82;
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: -12px;
    left: 0;
  }
}
</style>
