import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'



import { router } from './router.js'
import { store } from './store/store.js'
import { clickOutsideDirective, focusDirective } from '../src/directives'
import ElementPlus from 'element-plus'
import App from './App.vue'

const app = createApp(App)
app.use(BootstrapVue3)
app.directive('click-outside', clickOutsideDirective)
app.directive('focus', focusDirective)
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')