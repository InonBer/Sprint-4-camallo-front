import { httpService } from './http.service.js'
import { storageService } from './async-storage.service'
// import { userService } from './user.service'
import Axios from 'axios'

const axios = Axios.create({
  // withCredentials: true
})
import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

// import axios from 'axios'
import { utilService } from './util.service'
// import { storageService } from './async-storage-service'

const KEY = 'board_db'
const ENDPOINT = 'board'

// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/board' : '//localhost:3030/api/board/'

export const boardService = {
  query,
  getById,
  remove,
  save,
  getColorsToDisplay,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyChklist,
  getTaskById,
  getBoardById,
  getBgcImgs,
  addTask,
  saveGroup,
  addGroup,
  getEmptyTodo,
  getEmptyAttachment,
  getActivityByType,

}

function getColorsToDisplay() {
  let colors = []
  for (var i = 0; i < 11; i++) {
    const color = utilService.getRandomColor()
    colors.push(color)

  }
  return colors
}

async function query() {
  return await httpService.get(ENDPOINT)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  // const boards = JSON.parse(localStorage.getItem(KEY))

  // if (boards) {
  //   return Promise.resolve(boards)
  // } else {
  // const boardToSend = _createBoard()
  //   const boardToSend = _createBoards()
  //   return Promise.resolve(boardToSend)
  // }
  // return storageService.query(KEY)
}

async function addGroup(board, groups) {
  let boardCopy = JSON.parse(JSON.stringify(board))
  boardCopy.groups = groups
  return save(boardCopy)
}

// function getActivityByType(type){
//   switch (type) {
//     case 'task':

//       return {

//       }

//     case 'task':
//       return 
//     default:

// }
// }

async function saveGroup(board, group) {
  const idx = board.groups.findIndex((currGroup) => {
    return currGroup.id == group.id
  })
  board.groups[idx] = group
  return save(board)

}

function getEmptyTodo(title) {
  const todo = {
    id: utilService.makeId(),
    title,
    isDone: false
  }
  return todo
}
async function getBgcImgs() {
  try {
    const res = await axios.get('https://api.unsplash.com/search/photos?page=1&query=mountains&client_id=2wV121X0Ot4ARXG44lcENmjEvAkccm1BugKXKX1yuck')
    const imgs = res.data.results.map((data) => {
      return data.urls.full
    })
    return imgs
  } catch (err) {
    console.log(err);
  }
}

async function addTask(board, groupId, task) {
  const idx = board.groups.findIndex((group) => {
    return group.id === groupId
  })
  board.groups[idx].tasks.push(task)

  return save(board)
}

async function getById(id) {
  return await httpService.get(`board/${id}`)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  return storageService.remove(KEY, id)
}


async function save(board) {
  // console.log(board._id ? storageService.put(KEY, board) : storageService.post(KEY, board));
  console.log(board);
  const boardCopy = JSON.parse(JSON.stringify(board))
  if (board._id) {
    return httpService.put('board/' + board._id, boardCopy)
  } else {
    return httpService.post('board/', boardCopy)
  }
}

function getActivityByType(type, user, onItem = null) {
  console.log(type);

  let activity = {
    id: utilService.makeId(),
    txt: '',
    byMember: user,
    createdAt: new Date(),
    task: onItem
  }
  console.log(activity.byMember);
  switch (type) {
    case "description":
      activity.txt = 'Modified the description'
      return activity
    case "taskAdd":
      activity.txt = 'Added a task'
      return activity
    case "taskRemove":
      activity.txt = 'Removed a task'
      return activity
    case "groupRemove":
      activity.txt = 'Removed a group'
      return activity
    case "memberAdd":
      activity.txt = 'Added a member'
      return activity
    case "memberRemove":
      activity.txt = 'Removed a member'
      return activity
    case "attachmentAdd":
      activity.txt = 'Added a attachment'
      return activity
    case "attachmentRemove":
      activity.txt = 'Removed a attachment'
      return activity
    case "groupAdd":
      activity.txt = 'Added a group'
      return activity
    case "bgChange":
      activity.txt = 'Changed the background'
      return activity
    case undefined:
      activity.txt = 'Had some modifications done'
      return activity
    case "coverAdd":
      activity.txt = 'Added a cover'
      return activity
    case "coverRemove":
      activity.txt = 'Removed a cover'
      return activity

  }


}

function getEmptyGroup() {
  const group = {
    id: utilService.makeId(),
    title: '',
    titleEdit: true,
    archivedAt: 1589983468418,
    tasks: [],
    style: {}
  }
  return group
}

function getEmptyChklist(title) {
  return {
    id: utilService.makeId(),
    title: title,
    todos: []
  }
}

async function getBoardById(boardId) {
  try {
    const boards = await query()
    const idx = boards.findIndex((board) => {
      return board._id === boardId
    })
    return Promise.resolve(boards[idx])


  } catch (error) {
    console.log(error);
  }
}

function getTaskById(boardId, groupId, taskId) {
  const boards = JSON.parse(localStorage.getItem(KEY))
  const boardIdx = boards.findIndex((board) => {
    return board._id === boardId
  })
  const groupIdx = boards[boardIdx].groups.findIndex((group) => {
    return group.id === groupId
  })
  const task = boards[boardIdx].groups[groupIdx].tasks.find(task => {
    return task.id === taskId
  })
  return Promise.resolve(task)
}

function getEmptyTask() {
  const task = {
    id: utilService.makeId(),
    title: "",
    isEdited: true
  }
  return task
}

function getEmptyAttachment() {
  return {
    title: '',
    id: utilService.makeId(),
    imgUrl: '',
    createdAt: '',
    uploadedBy: {},
  }
}

function getEmptyBoard() {
  const board = {
    title: '',
    archivedAt: '',
    createdAt: new Date(),
    isStarred: true,
    createdBy: {
      _id: "u101",
      fullname: "Tal Tarablus",
      imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
    },
    style: {},
    labels: [
      {
        "id": "l10",
        "title": "Done",
        "color": "#61bd4f"
      },
      {
        "id": "l102",
        "title": "Progress",
        "color": "#f2d600"
      },
      {
        "id": "l103",
        "title": "ASAP",
        "color": "#ff9f1a"
      },
      {
        "id": "l104",
        "title": "Waiting",
        "color": "#0079bf"
      },
      {
        "id": "l105",
        "title": "On Hold",
        "color": "#c377e0"
      }
    ],
    members: [
      {
        _id: "u101",
        fullname: "Tal Tarablus",
        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
      },
      {
        _id: "u111",
        email: "michael.lawson@reqres.in",
        fullname: "Michael Lawson",
        imgUrl: "https://reqres.in/img/faces/7-image.jpg"
      },
      {
        _id: "u112",
        email: "lindsay.ferguson@reqres.in",
        fullname: "Lindsay Ferguson",
        imgUrl: "https://reqres.in/img/faces/8-image.jpg"
      },
      {
        _id: "u113",
        email: "tobias.funke@reqres.in",
        fullname: "Tobias Funke",
        imgUrl: "https://reqres.in/img/faces/9-image.jpg"
      },
      {
        _id: "u114",
        email: "byron.fields@reqres.in",
        fullname: "Byron Fields",
        imgUrl: "https://reqres.in/img/faces/10-image.jpg"
      },
      {
        _id: "u115",
        email: "george.edwards@reqres.in",
        fullname: "George Edwards",
        imgUrl: "https://reqres.in/img/faces/11-image.jpg"
      },
      {
        _id: "u116",
        email: "rachel.howell@reqres.in",
        fullname: "Rachel Howell",
        imgUrl: "https://reqres.in/img/faces/12-image.jpg"
      }
    ],
    groups: [],
    activities: [],
  }
  return board
}

// async function add(board) {
//   const addedReview = await storageService.post('board', board)
//   // const addedReview = await httpService.post(`review`, review)

//   // review.byUser = userService.getLoggedinUser()
//   // review.aboutUser = await userService.getById(review.aboutUserId)
//   // reviewChannel.postMessage({type: 'addReview', review: addedReview})

//   return addedReview
// }


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

function _createBoards() {
  const boards = [
    {
      "_id": "b101",
      "title": "Testing Board",
      "archivedAt": 1589983468418,
      "createdAt": 1589983468418,
      "isStarred": false,
      "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
      },
      "style": {
        "bgi": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/3c139dc0109ed363aec31ed157086458/photo-1658054926223-9816e297d4f9.jpg"
      },
      "labels": [
        {
          "id": "l101",
          "title": "Done",
          "color": "#61bd4f"
        },
        {
          "id": "l102",
          "title": "Progress",
          "color": "#EB5A46"
        },
        {
          "id": "l103",
          "title": "ASAP",
          "color": "#C377E0"
        },
        {
          "id": "l104",
          "title": "Waiting",
          "color": "#F2D600"
        },
        {
          "id": "l105",
          "title": "On Hold",
          "color": "#0079BF"
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
          "id": "g102",
          "title": "Group 2",
          "titleEdit": false,
          "tasks": [
            {
              "id": "c103",
              "title": "Do that",
              "archivedAt": 1589983468418
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
                  "createdAt": 1590999817436,
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
              "memberIds": [
                "u101"
              ],
              "labelIds": [
                "#61bd4f",
                "#EB5A46"
              ],
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
          "style": {

          }
        },
        {
          "id": "g101",
          "title": "Group 1",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "c101",
              "title": "TEST!!! logo"
            },
            {
              "id": "c102",
              "title": "Add Samples"
            }
          ],
          "style": {

          }
        }
      ],
      "activities": [
        {
          "id": "a101",
          "txt": "Changed Color",
          "createdAt": 154514,
          "byMember": {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
          },
          "task": {
            "id": "c101",
            "title": "Replace Logo"
          }
        }
      ]
    },
    {
      "_id": "b102",
      "title": "Testing Board2",
      "archivedAt": 1589983468418,
      "createdAt": 1589983468418,
      "isStarred": true,
      "createdBy": {
        "_id": "b102",
        "fullname": "dani dodo",
        "imgUrl": "http://some-img"
      },
      "style": {
        "bgi": "https://images.unsplash.com/photo-1635752597702-65e7b9a44207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDc5NDh8MHwxfHNlYXJjaHwzfHxhbHBha2F8ZW58MHwwfHx8MTY1ODU4MTg5OQ&ixlib=rb-1.2.1&q=80&w=1080",
        "bgc": null
      },
      "labels": [
        {
          "id": "l10",
          "title": "Done",
          "color": "#61bd4f"
        },
        {
          "id": "l102",
          "title": "Progress",
          "color": "#EB5A46"
        },
        {
          "id": "l103",
          "title": "ASAP",
          "color": "#C377E0"
        },
        {
          "id": "l104",
          "title": "Waiting",
          "color": "#F2D600"
        },
        {
          "id": "l105",
          "title": "On Hold",
          "color": "#0079BF"
        }
      ],
      "members": [
        {
          "_id": "u101",
          "fullname": "Tal Tarablus",
          "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        {
          "_id": "u111",
          "email": "michael.lawson@reqres.in",
          "fullname": "Michael Lawson",
          "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
          "_id": "u112",
          "email": "lindsay.ferguson@reqres.in",
          "fullname": "Lindsay Ferguson",
          "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
          "_id": "u113",
          "email": "tobias.funke@reqres.in",
          "fullname": "Tobias Funke",
          "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
          "_id": "u114",
          "email": "byron.fields@reqres.in",
          "fullname": "Byron Fields",
          "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
          "_id": "u115",
          "email": "george.edwards@reqres.in",
          "fullname": "George Edwards",
          "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
          "_id": "u116",
          "email": "rachel.howell@reqres.in",
          "fullname": "Rachel Howell",
          "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
        }
      ],
      "groups": [
        {
          "id": "g101",
          "title": "Incoming Bugs",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "c104",
              "title": "Lightbox loading issue on Safari\n\n",
              "status": "in-progress",
              "description": "description",
              "comments": [
                {
                  "id": "ZdPnm",
                  "txt": "also @yaronb please CR this",
                  "createdAt": 1590999817436,
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
              "memberIds": [

              ],
              "labelIds": [
                "#61bd4f",
                "#EB5A46"
              ],
              "attachments": [
                {
                  "title": "attachment",
                  "id": "LdDkr",
                  "imgUrl": "https://res.cloudinary.com/mister-toy-camay/image/upload/v1658778589/clock_lvomcz.png",
                }
              ],

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
              },
              "isEdited": false
            },
            {
              "id": "c101",
              "title": "Notifications Not Sending #4\n\n",
              "isEdited": false,
              "labelIds": [
                "#C377E0"
              ]
            },
            {
              "id": "akHSu",
              "title": "Multiple select broken\n",
              "isEdited": false,
              "labelIds": [
                "#C377E0"
              ]
            },
            {
              "id": "btQxN",
              "title": "Drag and drop issues in Chrome\n",
              "isEdited": false,
              "labelIds": [
                "#0079BF"
              ]
            },
            {
              "id": "qQqFV",
              "title": "Download icon redering issue\n\n",
              "isEdited": false,
              "labelIds": [
                "#F2D600",
                "#EB5A46"
              ]
            },
            {
              "id": "qCi6Y",
              "title": "Tab to comment goes to wrong field\n\n\n",
              "isEdited": false,
              "labelIds": [
                "#C377E0",
                "#0079BF"
              ]
            },
            {
              "id": "C2m55",
              "title": "Video load issues\n\n",
              "isEdited": false,
              "labelIds": [
                "#EB5A46"
              ]
            }
          ],
          "style": {

          }
        },
        {
          "id": "g102",
          "title": "In progress",
          "titleEdit": false,
          "tasks": [
            {
              "id": "c102",
              "title": "Localization\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                {
                  "_id": "u111",
                  "email": "michael.lawson@reqres.in",
                  "fullname": "Michael Lawson",
                  "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
                }
              ],
              "labelIds": [
                "#EB5A46"
              ]
            },
            {
              "id": "c103",
              "title": "\"Like\" button in comments\n",
              "archivedAt": 1589983468418,
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                }
              ],
              "labelIds": [
                "#EB5A46"
              ]
            },
            {
              "id": "OPAhg",
              "title": "Operation: All The Bugs\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u115",
                  "email": "george.edwards@reqres.in",
                  "fullname": "George Edwards",
                  "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
                }
              ],
              "labelIds": [
                "#61bd4f",
                "#F2D600"
              ]
            },
            {
              "id": "izFiX",
              "title": "Make JSON pretty\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u113",
                  "email": "tobias.funke@reqres.in",
                  "fullname": "Tobias Funke",
                  "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
                }
              ],
              "labelIds": [
                "#F2D600"
              ]
            }
          ],
          "style": {

          }
        },
        {
          "id": "SfUMf",
          "title": "QA",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "kI8sm",
              "title": "Embed all the things\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                }
              ],
              "labelIds": [
                "#61bd4f"
              ]
            },
            {
              "id": "hcK2J",
              "title": "Pop-over max with issue on mobile\n\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                },
                {
                  "_id": "u113",
                  "email": "tobias.funke@reqres.in",
                  "fullname": "Tobias Funke",
                  "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
                }
              ],
              "labelIds": [
                "#EB5A46",
                "#F2D600"
              ]
            },
            {
              "id": "4GW34",
              "title": "animated gif support\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u115",
                  "email": "george.edwards@reqres.in",
                  "fullname": "George Edwards",
                  "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
                }
              ],
              "labelIds": [
                "#F2D600",
                "#0079BF"
              ]
            }
          ],
          "style": {

          }
        },
        {
          "id": "gp9U8",
          "title": "Live",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "4fbRX",
              "title": "Emoji support\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u116",
                  "email": "rachel.howell@reqres.in",
                  "fullname": "Rachel Howell",
                  "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
                }
              ],
              "labelIds": [
                "#0079BF"
              ]
            },
            {
              "id": "56aws",
              "title": "Matirial design for Android\n\n\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                },
                {
                  "_id": "u115",
                  "email": "george.edwards@reqres.in",
                  "fullname": "George Edwards",
                  "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
                }
              ],
              "labelIds": [
                "#0079BF",
                "#EB5A46"
              ]
            },
            {
              "id": "jFKzd",
              "title": "New icons for web\n\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                }
              ],
              "labelIds": [
                "#0079BF",
                "#F2D600"
              ]
            },
            {
              "id": "fJDOT",
              "title": "Pasting from clipboard\n\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u115",
                  "email": "george.edwards@reqres.in",
                  "fullname": "George Edwards",
                  "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
                }
              ],
              "labelIds": [
                "#C377E0"
              ]
            }
          ],
          "style": {

          }
        },
        {
          "id": "JhjzW",
          "title": "Ready for launch",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "ODjp5",
              "title": "Slow log-in issue\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u114",
                  "email": "byron.fields@reqres.in",
                  "fullname": "Byron Fields",
                  "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
                },
                {
                  "_id": "u115",
                  "email": "george.edwards@reqres.in",
                  "fullname": "George Edwards",
                  "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
                },
                {
                  "_id": "u116",
                  "email": "rachel.howell@reqres.in",
                  "fullname": "Rachel Howell",
                  "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
                }
              ],
              "labelIds": [
                "#EB5A46",
                "#C377E0"
              ]
            },
            {
              "id": "ZZa2h",
              "title": "Improved API documentation\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u114",
                  "email": "byron.fields@reqres.in",
                  "fullname": "Byron Fields",
                  "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
                }
              ],
              "labelIds": [
                "#61bd4f"
              ]
            },
            {
              "id": "uRuCT",
              "title": "HTML 5 suppurt\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u113",
                  "email": "tobias.funke@reqres.in",
                  "fullname": "Tobias Funke",
                  "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
                },
                {
                  "_id": "u114",
                  "email": "byron.fields@reqres.in",
                  "fullname": "Byron Fields",
                  "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
                }
              ],
              "labelIds": [
                "#61bd4f"
              ]
            },
            {
              "id": "pGIxo",
              "title": "ISO app redesighn\n",
              "isEdited": false,
              "memberIds": [
                {
                  "_id": "u101",
                  "fullname": "Tal Tarablus",
                  "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                },
                {
                  "_id": "u111",
                  "email": "michael.lawson@reqres.in",
                  "fullname": "Michael Lawson",
                  "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
                },
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                },
                {
                  "_id": "u113",
                  "email": "tobias.funke@reqres.in",
                  "fullname": "Tobias Funke",
                  "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
                }
              ],
              "labelIds": [
                "#EB5A46",
                "#C377E0",
                "#0079BF",
                "#F2D600"
              ]
            }
          ],
          "style": {

          }
        }
      ],
      "activities": [
        {
          "id": "a101",
          "txt": "Changed Color",
          "createdAt": 154514,
          "byMember": {
            "_id": "u101",
            "fullname": "dani dodo",
            "imgUrl": "http://some-img"
          },
          "task": {
            "id": "c101",
            "title": "create filter"
          }
        }
      ]
    },
    {
      "title": "jhgghjhjhjh",
      "archivedAt": "",
      "createdAt": "2022-07-23T17:06:00.431Z",
      "isStarred": true,
      "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
      },
      "style": {
        "bgi": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDc5NDh8MHwxfHNlYXJjaHw0fHxtb3VudGFpbnN8ZW58MHx8fHwxNjU4NTcwODAw&ixlib=rb-1.2.1&q=80"
      },
      "labels": [
        {
          "id": "l10",
          "title": "Done",
          "color": "#61bd4f"
        },
        {
          "id": "l102",
          "title": "Progress",
          "color": "#EB5A46"
        },
        {
          "id": "l103",
          "title": "ASAP",
          "color": "#C377E0"
        },
        {
          "id": "l104",
          "title": "Waiting",
          "color": "#F2D600"
        },
        {
          "id": "l105",
          "title": "On Hold",
          "color": "#0079BF"
        }
      ],
      "members": [
        {
          "_id": "u101",
          "fullname": "Tal Tarablus",
          "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        {
          "_id": "u111",
          "email": "michael.lawson@reqres.in",
          "fullname": "Michael Lawson",
          "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
          "_id": "u112",
          "email": "lindsay.ferguson@reqres.in",
          "fullname": "Lindsay Ferguson",
          "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
          "_id": "u113",
          "email": "tobias.funke@reqres.in",
          "fullname": "Tobias Funke",
          "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
          "_id": "u114",
          "email": "byron.fields@reqres.in",
          "fullname": "Byron Fields",
          "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
          "_id": "u115",
          "email": "george.edwards@reqres.in",
          "fullname": "George Edwards",
          "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
          "_id": "u116",
          "email": "rachel.howell@reqres.in",
          "fullname": "Rachel Howell",
          "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
        }
      ],
      "groups": [
        {
          "id": "g101",
          "title": "Group 1",
          "titleEdit": false,
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
          "style": {

          }
        },
        {
          "id": "g102",
          "title": "Group 2",
          "titleEdit": false,
          "tasks": [
            {
              "id": "c103",
              "title": "Do that",
              "archivedAt": 1589983468418
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
                  "createdAt": 1590999817436,
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
              "memberIds": [
                {
                  "_id": "u111",
                  "email": "michael.lawson@reqres.in",
                  "fullname": "Michael Lawson",
                  "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
                },
                {
                  "_id": "u112",
                  "email": "lindsay.ferguson@reqres.in",
                  "fullname": "Lindsay Ferguson",
                  "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
                }
              ],
              "labelIds": [
                "#61bd4f",
                "#EB5A46"
              ],
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
          "style": {

          }
        }
      ],
      "activities": [
        {
          "id": "a101",
          "txt": "Changed Color",
          "createdAt": 154514,
          "byMember": {
            "_id": "u101",
            "fullname": "dani dodo",
            "imgUrl": "http://some-img"
          },
          "task": {
            "id": "c101",
            "title": "create filter"
          }
        }
      ],
      "_id": "BHkk6"
    },
    {
      "title": "new",
      "archivedAt": "",
      "createdAt": "2022-07-23T17:10:17.712Z",
      "isStarred": true,
      "createdBy": {
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
      },
      "style": {
        "bgi": "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDc5NDh8MHwxfHNlYXJjaHw5fHxtb3VudGFpbnN8ZW58MHx8fHwxNjU4NTcwODAw&ixlib=rb-1.2.1&q=80"
      },
      "labels": [
        {
          "id": "l10",
          "title": "Done",
          "color": "#61bd4f"
        },
        {
          "id": "l102",
          "title": "Progress",
          "color": "#f2d600"
        },
        {
          "id": "l103",
          "title": "ASAP",
          "color": "#ff9f1a"
        },
        {
          "id": "l104",
          "title": "Waiting",
          "color": "#0079bf"
        },
        {
          "id": "l105",
          "title": "On Hold",
          "color": "#c377e0"
        }
      ],
      "members": [
        {
          "_id": "u101",
          "fullname": "Tal Tarablus",
          "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
        },
        {
          "_id": "u111",
          "email": "michael.lawson@reqres.in",
          "fullname": "Michael Lawson",
          "imgUrl": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
          "_id": "u112",
          "email": "lindsay.ferguson@reqres.in",
          "fullname": "Lindsay Ferguson",
          "imgUrl": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
          "_id": "u113",
          "email": "tobias.funke@reqres.in",
          "fullname": "Tobias Funke",
          "imgUrl": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
          "_id": "u114",
          "email": "byron.fields@reqres.in",
          "fullname": "Byron Fields",
          "imgUrl": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
          "_id": "u115",
          "email": "george.edwards@reqres.in",
          "fullname": "George Edwards",
          "imgUrl": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
          "_id": "u116",
          "email": "rachel.howell@reqres.in",
          "fullname": "Rachel Howell",
          "imgUrl": "https://reqres.in/img/faces/12-image.jpg"
        }
      ],
      "groups": [
        {
          "id": "lWTZ2",
          "title": "asfasf",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [

          ],
          "style": {

          }
        },
        {
          "id": "1kCq7",
          "title": "asdsa",
          "titleEdit": false,
          "archivedAt": 1589983468418,
          "tasks": [
            {
              "id": "lnzUj",
              "title": "asfsafasf\ndwads\n",
              "isEdited": false
            }
          ],
          "style": {

          }
        }
      ],
      "activities": [

      ],
      "_id": "oMhHn"
    }
  ]
  localStorage.setItem(KEY, JSON.stringify(boards))
  return boards
}
