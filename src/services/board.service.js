import { httpService } from './http.service.js'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'

import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

// import axios from 'axios'
import { utilService } from './util.service'
// import { storageService } from './async-storage-service'

const KEY = 'boards_db'
const ENDPOINT = 'board'

// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/board' : '//localhost:3030/api/board/'

export const boardService = {
  query,
  getById,
  remove,
  save,
  getEmptyBoard,
}

async function query(filterBy = {}) {
  // return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  const board = storageService.query(KEY)
  // const board = localStorage.getItem()
  console.log('board', board);
  if (board && board.length) {
    return board
  } else {
    const boardToSend = _createBoard()
    console.log('boardToSend', boardToSend)

    return Promise.resolve(boardToSend)
  }
  // return storageService.query(KEY)
}

async function getById(id) {
  // return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  return storageService.getById(KEY, id)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  return storageService.remove(KEY, id)
}

async function save(board) {
  // return board._id
  //   ? await httpService.put(`${ENDPOINT}/${board._id}`, board)
  //   : await httpService.post(ENDPOINT, board)
  return board._id ? storageService.put(KEY, board) : storageService.post(KEY, board)
}

function getEmptyBoard() {
  return Promise.resolve({
    _id: utilService.makeId(),
    title: '',
    archivedAt: null,
    createdBy: {},
    style: {},
    labels: [],
    members: [],
    groups: [],
    activities: [],
  })
}

// async function add(board) {
//   const addedReview = await storageService.post('board', board)
//   // const addedReview = await httpService.post(`review`, review)

//   // review.byUser = userService.getLoggedinUser()
//   // review.aboutUser = await userService.getById(review.aboutUserId)
//   // reviewChannel.postMessage({type: 'addReview', review: addedReview})

//   return addedReview
// }


function _createBoard() {
  const board = {
    "_id": "b101",
    "title": "Testing Board",
    "archivedAt": 1589983468418,
    "createdAt": 1589983468418,
    "createdBy": {
      "_id": "u101",
      "fullname": "Abi Abambi",
      "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
      {
        "id": "l101",
        "title": "Done",
        "color": "#61bd4f"
      },
      {
        "id": "l102",
        "title": "Progress",
        "color": "#61bd33"
      }
    ],
    "members": [
      {
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "Group 1",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "id": "c101",
            "title": "Replace logo"
          },
          {
            "id": "c102",
            "title": "Add Samples"
          }
        ],
        "style": {}
      },
      {
        "id": "g102",
        "title": "Group 2",
        "tasks": [
          {
            "id": "c103",
            "title": "Do that",
            "archivedAt": 1589983468418,
          },
          {
            "id": "c104",
            "title": "Help me",
            "status": "in-progress",
            "description": "description",
            "comments": [
              {
                "id": "ZdPnm",
                "txt": "also @yaronb please CR this",
                "createdAt": 1590999817436.0,
                "byMember": {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
              }
            ],
            "checklists": [
              {
                "id": "YEhmF",
                "title": "Checklist",
                "todos": [
                  {
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                  }
                ]
              }
            ],
            "memberIds": ["u101"],
            "labelIds": ["l101", "l102"],
            "createdAt": 1590999730348,
            "dueDate": 16156215211,
            "byMember": {
              "_id": "u101",
              "username": "Tal",
              "fullname": "Tal Tarablus",
              "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            "style": {
              "bgColor": "#26de81"
            }
          }
        ],
        "style": {}
      }
    ],
    "activities": [
      {
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u101",
          "fullname": "Abi Abambi",
          "imgUrl": "http://some-img"
        },
        "task": {
          "id": "c101",
          "title": "Replace Logo"
        }
      }
    ],
    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
  }

  return board

}



// function query() {
//   // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
//   // return httpService.get(`review${queryStr}`)

//   const board = localStorage.getItem()
//   if (board) {
//     return board
//   } else {
//     const boardToSend = _createBoard()
//     return Promise.resolve(boardToSend)
//   }
//   // return storageService.query('board')
// }



// const reviewChannel = new BroadcastChannel('reviewChannel')

// ;(() => {
//   // reviewChannel.addEventListener('message', (ev) => {
//   //   console.log('msg event', ev)
//   //   store.commit(ev.data)
//   // })
//   setTimeout(()=>{
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//       console.log('GOT from socket', review)
//       store.commit({type: 'addReview', review})
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//       showSuccessMsg(`New review about me ${review.txt}`)
//     })
//   }, 0)

// })()