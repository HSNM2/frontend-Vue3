<template>
  <div
    class="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-black/30 p-4 md:inset-0"
  >
    <div class="relative m-auto flex h-full max-h-full w-full items-center md:w-2/6">
      <div ref="modalContent" class="relative w-full rounded-md bg-white p-6 shadow">
        <div class="text-end">
          <span class="material-icons cursor-pointer text-black" @click="$emit('close-modal')"
            >close</span
          >
        </div>
        <div class="">
          <h2 class="mb-2 text-center text-2xl font-bold text-primary-5">課程評價</h2>
          <div class="flex items-center justify-center">
            <template v-for="(item, index) in 5" :key="index">
              <span
                class="material-icons text-xl text-primary-3"
                @mouseover="mouseoverAction(index + 1)"
                @mouseout="tempScore = currentScore"
                @click="getScore(index + 1)"
              >
                {{ getStar(index) }}
              </span>
            </template>
          </div>
          <p class="text-center font-bold">點擊星星來評等，若未點選，則預設五顆星</p>
          <div class="my-4">
            <textarea
              rows="4"
              class="w-full border border-neutral-200 px-4 py-4 md:px-5"
              placeholder="對這門課有心得？寫下你的心得，給老師一點鼓勵吧！"
              v-model="rating.content"
            ></textarea>
          </div>
          <button
            type="button"
            class="btn-primary ms-auto block rounded-none text-center"
            :disabled="rating.content === ''"
            @click="saveAction"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['save-action', 'close-modal'])
const props = defineProps({
  tempRating: {
    type: Object,
    required: true
  }
})

const rating = ref(JSON.parse(JSON.stringify(props.tempRating)))
const tempScore = ref(rating.value.score)
const currentScore = ref(rating.value.score)

const mouseoverAction = (score: number) => {
  tempScore.value = score
}

const getScore = (score: number) => {
  currentScore.value = score
}

const getStar = (index: number) => {
  if (index + 1 <= tempScore.value) {
    return 'star'
  } else {
    return 'star_border'
  }
}

const saveAction = () => {
  rating.value.score = tempScore.value
  emits('save-action', rating.value)
}
</script>
