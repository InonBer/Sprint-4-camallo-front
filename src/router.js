import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import boardApp from './views/board-app.vue'
import taskDetails from './views/task-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board/:id?',
    name: 'boardApp',
    component: boardApp,
    children: [
      {
        path: '/group/:id/task:id',
        component: taskDetails,
      }
    ]
  },
  // {
  //   path: '/board/:boardId/task/:taskId',
  //   name: 'boardApp',
  //   component: taskDetails
  // },


]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

