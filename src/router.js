import { createRouter, createWebHashHistory } from 'vue-router'
import boardPage from './views/board-page.vue'
import home from './views/home.vue'
import boardApp from './views/board-app.vue'
import taskDetails from './views/task-details.vue'
import login from './views/login.vue'
import signup from './views/signup.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board-page',
    name: 'boardPage',
    component: boardPage
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },

  {
    path: '/board/:boardId?/',
    name: 'boardApp',
    component: boardApp,
    children: [
      {
        path: 'group/:groupId/task/:taskId?',
        component: taskDetails,
        name: "taskDetails"
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

