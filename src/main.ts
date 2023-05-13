import { createApp } from 'vue'
import axios from 'axios'

import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import veeValidate from './plugins/vee-validate'
import vueLoadingOverlay from './plugins/vue-loading-overlay'
import vCalendar from './plugins/v-calendar'

import './assets/main.scss'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

app.use(createPinia())
app.use(router)

app.use(veeValidate)
app.use(vueLoadingOverlay)
app.use(vCalendar)

app.mount('#app')
