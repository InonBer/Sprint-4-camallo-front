import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import boardApp from './views/board-app.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'boardApp',
    component: boardApp
  },

]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

