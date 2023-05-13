import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.use(VCalendar, {})
  }
}
