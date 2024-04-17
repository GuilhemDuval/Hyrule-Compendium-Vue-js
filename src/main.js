import { router } from './router/index.js'

import './assets/main.css'
import './assets/normalize.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
