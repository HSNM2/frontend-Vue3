<template>
  <div
    :class="[
      props.style ? props.style.height : 'h-1',
      props.style ? props.style.bg : '',
      'rounded-full',
      'flex-1'
    ]"
  >
    <div
      :class="[
        'h-full',
        props.style ? props.style.progress : '',
        'rounded-full',
        'transition-all duration-500'
      ]"
      :style="{
        width: percent + '%'
      }"
    />
  </div>
  <slot :minVal="minVal" :maxVal="maxVal" :currentVal="currentVal" :percent="percent" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  minVal: { type: Number, required: true },
  maxVal: { type: Number, required: true },
  currentVal: { type: Number, required: true },
  style: { type: Object }
})
const percent = ref(0)

onMounted(() => {
  percent.value = calculatePercent(props.currentVal)
})

watch(
  () => props.currentVal,
  (newVal, oldVal) => {
    percent.value = calculatePercent(newVal)
  }
)

function calculatePercent(val: number) {
  return val <= props.minVal ? 0 : ((val - props.minVal) * 100) / (props.maxVal - props.minVal)
}
</script>
