import { createApp } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { router } from './router.js'
import { store } from './store/store.js'
import { clickOutsideDirective, focusDirective } from '../src/directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)

app.directive('click-outside', clickOutsideDirective)
app.directive('focus', focusDirective)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.component('Datepicker', Datepicker);


app.mount('#app')
