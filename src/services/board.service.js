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
  getTaskById,
  getBoardById,
  getBgcImgs,
  addTask,
  saveGroup,
  addGroup,

}
function getColorsToDisplay() {
  let colors = []
  for (var i = 0; i < 10; i++) {
    const color = utilService.getRandomColor()
    colors.push(color)

  }
  return colors
}
async function query() {
  // return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  const boards = JSON.parse(localStorage.getItem(KEY))

  if (boards) {
    return Promise.resolve(boards)
  } else {
    // const boardToSend = _createBoard()
    const boardToSend = _createBoards()


    return Promise.resolve(boardToSend)
  }
  // return storageService.query(KEY)
}
async function addGroup(board, groups) {
  let boardCopy = JSON.parse(JSON.stringify(board))
  boardCopy.groups = groups
  return save(boardCopy)
}
async function saveGroup(board, group) {
  console.log(board);
  console.log(group);
  const idx = board.groups.findIndex((currGroup) => {
    return currGroup.id == group.id
  })
  board.groups[idx] = group
  return save(board)

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

  const boards = JSON.parse(localStorage.getItem(KEY))
  const idx = boards.findIndex((board) => {
    return id === board._id
  })
  return Promise.resolve(boards[idx])
  // return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  // return storageService.getById(KEY, id)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  return storageService.remove(KEY, id)
}

async function save(board) {
  // console.log(board._id ? storageService.put(KEY, board) : storageService.post(KEY, board));
  if (board._id) {
    const boards = JSON.parse(localStorage.getItem(KEY))
    const idx = boards.findIndex((currBoard) => {
      return currBoard._id === board._id
    })
    boards[idx] = board
    localStorage.setItem(KEY, JSON.stringify(boards))
    return Promise.resolve(board)
  } else {
    board._id = utilService.makeId()
    const boards = JSON.parse(localStorage.getItem(KEY))
    boards.push(board)
    localStorage.setItem(KEY, JSON.stringify(boards))
    return Promise.resolve(board)
    // return storageService.post(KEY, board)
  }


  // return board._id
  //    await httpService.put(`${ENDPOINT}/${board._id}`, board)
  //    await httpService.post(ENDPOINT, board)
  return board._id ? storageService.put(KEY, board) : storageService.post(KEY, board)
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
function getBoardById(boardId) {
  const boards = JSON.parse(localStorage.getItem(KEY))
  const idx = boards.findIndex((board) => {
    return board._id === boardId
  })
  return Promise.resolve(boards[idx])
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

function getEmptyBoard() {
  const board = {
    title: '',
    createdat: new Date(),
    createdBy: {
      _id: "u101",
      fullname: "Abi Abambi",
      imgUrl: "http://some-img"
    },
    style: {},
    labels: [
      {
        id: "l101",
        title: "Done",
        color: "#61bd4f"
      },
      {
        id: "l102",
        title: "Progress",
        color: "#61bd33"
      }
    ],
    members: [
      {
        _id: "u101",
        fullname: "Abi Abambi",
        imgUrl: "http://some-img"
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
      _id: "b101",
      title: "Testing Board",
      archivedAt: 1589983468418,
      createdAt: 1589983468418,
      isStarred: false,
      createdBy: {
        _id: "u101",
        fullname: "Abi Abambi",
        imgUrl: "http://some-img"
      },
      style: {
        bgi: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/3c139dc0109ed363aec31ed157086458/photo-1658054926223-9816e297d4f9.jpg',
      },
      labels: [
        {
          id: "l101",
          title: "Done",
          color: "#61bd4f"
        },
        {
          id: "l102",
          title: "Progress",
          color: "#c83131"
        },
        {
          id: "l103",
          title: "ASAP",
          color: "#bd4f9d"
        },
        {
          id: "l104",
          title: "Waiting",
          color: "#b6bd4f"
        },
        {
          id: "l105",
          title: "On Hold",
          color: "#4f6dbd"
        }
      ],
      members: [
        {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl: "https://www.google.com"
        }
      ],
      groups: [
        {
          id: "g101",
          title: "Group 1",
          titleEdit: false,
          archivedAt: 1589983468418,
          tasks: [
            {
              id: "c101",
              title: "TEST!!! logo"
            },
            {
              id: "c102",
              title: "Add Samples"
            }
          ],
          style: {}
        },
        {
          id: "g102",
          title: "Group 2",
          titleEdit: false,
          tasks: [
            {
              id: "c103",
              title: "Do that",
              archivedAt: 1589983468418,
            },
            {
              id: "c104",
              title: "Help me",
              status: "in-progress",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: "u101",
                    fullname: "Tal Tarablus",
                    imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                  }
                }
              ],
              checklists: [
                {
                  id: "YEhmF",
                  title: "Checklist",
                  todos: [
                    {
                      id: "212jX",
                      title: "To Do 1",
                      isDone: false
                    }
                  ]
                }
              ],
              memberIds: ["u101"],
              labelIds: ["#61bd4f", "#c83131"],
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: "u101",
                username: "Tal",
                fullname: "Tal Tarablus",
                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
              },
              style: {
                bgColor: "#26de81"
              }
            }
          ],
          style: {}
        }
      ],
      activities: [
        {
          id: "a101",
          txt: "Changed Color",
          createdAt: 154514,
          byMember: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
          },
          task: {
            id: "c101",
            title: "Replace Logo"
          }
        }
      ],
    }, {
      _id: "b102",
      title: "Testing Board2",
      archivedAt: 1589983468418,
      createdAt: 1589983468418,
      isStarred: true,
      createdBy: {
        _id: "b102",
        fullname: "dani dodo",
        imgUrl: "http://some-img"
      },
      style: {
        bgi: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixid=MnwzNDc5NDh8MHwxfHNlYXJjaHwxfHxsb25kb258ZW58MHx8fHwxNjU4MzIzODQ1&ixlib=rb-1.2.1',

      },
      labels: [
        {
          id: "l10",
          title: "Done",
          color: "#61bd4f"
        },
        {
          id: "l102",
          title: "Progress",
          color: "#c83131"
        },
        {
          id: "l103",
          title: "ASAP",
          color: "#bd4f9d"
        },
        {
          id: "l104",
          title: "Waiting",
          color: "#b6bd4f"
        },
        {
          id: "l105",
          title: "On Hold",
          color: "#4f6dbd"
        }
      ],
      members: [
        {
          _id: "u101",
          fullname: "Tal Tarablus",
          imgUrl: "https://www.google.com"
        }
      ],
      groups: [
        {
          id: "g101",
          title: "Group 1",
          titleEdit: false,
          archivedAt: 1589983468418,
          tasks: [
            {
              id: "c101",
              title: "Replace logo"
            },
            {
              id: "c102",
              title: "Add Samples"
            }
          ],
          style: {}
        },
        {
          id: "g102",
          title: "Group 2",
          titleEdit: false,
          tasks: [
            {
              id: "c103",
              title: "Do that",
              archivedAt: 1589983468418,
            },
            {
              id: "c104",
              title: "Help me",
              status: "in-progress",
              description: "description",
              comments: [
                {
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: "u101",
                    fullname: "Tal Tarablus",
                    imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                  }
                }
              ],
              checklists: [
                {
                  id: "YEhmF",
                  title: "Checklist",
                  todos: [
                    {
                      id: "212jX",
                      title: "To Do 1",
                      isDone: false
                    }
                  ]
                }
              ],
              memberIds: ["u101"],
              labelIds: ["#61bd4f", "#c83131"],
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: "u101",
                username: "Tal",
                fullname: "Tal Tarablus",
                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
              },
              style: {
                bgColor: "#26de81"
              }
            }
          ],
          style: {}
        }
      ],
      activities: [
        {
          id: "a101",
          txt: "Changed Color",
          createdAt: 154514,
          byMember: {
            _id: "u101",
            fullname: "dani dodo",
            imgUrl: "http://some-img"
          },
          task: {
            id: "c101",
            title: "create filter"
          }
        }
      ],
    }
  ]
  localStorage.setItem(KEY, JSON.stringify(boards))
  return boards
}