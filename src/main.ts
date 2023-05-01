import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import veeValidate from './plugins/vee-validate'
import vueLoadingOverlay from './plugins/vue-loading-overlay'

import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(veeValidate)
app.use(vueLoadingOverlay)

app.mount('#app')
