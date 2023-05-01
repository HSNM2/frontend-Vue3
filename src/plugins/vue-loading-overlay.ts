import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.component('VLoading', Loading)
  }
}
