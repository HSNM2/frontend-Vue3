import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import App from './App.vue'
import router from './router'

import veeValidate from './plugins/vee-validate'

import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(veeValidate)
app.component('v-loading', Loading)

app.mount('#app')
