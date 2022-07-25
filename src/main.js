import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import { clickOutsideDirective } from '../src/directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)

app.directive('click-outside', clickOutsideDirective)

app.use(router)
app.use(store)
app.use(ElementPlus)


app.mount('#app')
