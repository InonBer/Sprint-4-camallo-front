import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

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



export const boardService = {
  add,
  query,
  remove
}



function query() {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)

  const board = localStorage.getItem('board')
  if (board) {
    return board
  } else {
    const boardToSend = _createBoard()
    return Promise.resolve(boardToSend)
  }
  // return storageService.query('board')
}

async function remove(boardId) {
  await storageService.delete('board', boardId)
  // await httpService.delete(`review/${reviewId}`)
  // reviewChannel.postMessage({ type: 'removeReview', reviewId })

}
async function add(board) {
  const addedReview = await storageService.post('board', board)
  // const addedReview = await httpService.post(`review`, review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // reviewChannel.postMessage({type: 'addReview', review: addedReview})

  return addedReview
}


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