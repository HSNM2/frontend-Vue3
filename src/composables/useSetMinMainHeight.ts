import { nextTick, onMounted } from 'vue'

export default function useSetMinMainHeight() {
  onMounted(() => {
    nextTick(() => {
      if (document.querySelector('main')) {
        ;(document.querySelector('main') as HTMLElement).style.minHeight = `calc(100vh - ${
          (document.querySelector('header') as HTMLElement).offsetHeight
        }px - ${(document.querySelector('footer') as HTMLElement).offsetHeight}px)`
      }
    })
  })
}
