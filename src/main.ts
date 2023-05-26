import { createApp } from 'vue'
import axios from 'axios'

import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import veeValidate from './plugins/vee-validate'
import vueLoadingOverlay from './plugins/vue-loading-overlay'
import vCalendar from './plugins/v-calendar'
import CKEditor from '@ckeditor/ckeditor5-vue'

import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(veeValidate)
app.use(vueLoadingOverlay)
app.use(vCalendar)
app.use(CKEditor)

app.mount('#app')
