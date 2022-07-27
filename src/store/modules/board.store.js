import { userService } from '../../services/user.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../../services/socket.service'
import { boardService } from '../../services/board.service.js'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const boardStore = {
    state: {
        boards: null,
        filterBy: null,
        currBoard: null,
        currUser: {
            id: "I101",
            fullname: "Inon Bereshit",
            imgUrl: "https://trello-members.s3.amazonaws.com/62d03408f2…cf6a3ee86/53b4fffdf23f7ae5407de6d7dc77bffb/50.png"
        }
    },
    getters: {
        getBoards(state) {
            return state.boards
        },
        // getBoardBGI(state) {
        //     return state.currBoard.style.bgi
        // },
        currBoard(state) {
            console.log(state.currBoard);
            return state.currBoard
        },
        currUser(state) {
            return state.currUser
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        removeBoard(state, { id }) {
            const idx = state.boards.findIndex((board) => board._id === id)
            state.boards.splice(idx, 1)
        },
        saveBoard(state, { board }) {
            const idx = state.boards.findIndex((currBoard) => {
                return currBoard._id === board._id
            })
            if (idx !== -1) {
                state.boards[idx] = JSON.parse(JSON.stringify(board))

                // state.boards.splice(idx, 1, board)
            }
            else {
                state.boards.push(JSON.parse(JSON.stringify(board)))
            }
        },
        setCurrBoard(state, { board }) {
            state.currBoard = board
            console.log('state.currBoard', state.currBoard)

        },
        saveTaskMove(state, { group }) {
            const idx = state.currBoard.groups.findIndex(currGroup => group.id === currGroup.id)
            state.currBoard.groups.splice(idx, 1, group)
        },
        //   setFilter(state, { filterBy }) {
        //     state.filterBy = { ...filterBy }
        //   }
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query()
            try {
                commit('setBoards', { boards })
            } catch (err) {
                console.log('couldn\'t fetch boards ', err);
            }
        },
        async removeBoard({ commit }, { id }) {
            try {
                await boardService.remove(id)
                commit({ type: 'removeBoard', id })
            } catch (err) {
                console.error(err)
            }
        },
        async saveBoard({ commit, state }, { board, action, task }) {
            try {
                let activity = boardService.getActivityByType(action, state.currUser, task)
                board.activities.push(activity)
                commit({ type: 'saveBoard', board })
                commit({ type: 'setCurrBoard', board })
                const boardToSave = await boardService.save(board)
            } catch (err) {
                console.error(err)
            }
        },
        async setCurrBoard({ commit }, { id }) {
            try {
                const board = await boardService.getBoardById(id)
                commit('setCurrBoard', { board })
            } catch (err) {
                console.log(err);
            }
        },
        async updateBoard({ commit }, { board }) {
            try {
                const updatedBoard = await boardService.update(board)
                commit('saveBoard', { board: updatedBoard })
            }
            catch (err) {
                console.log(err);
            }
        },
        async saveTaskMove({ commit, state }, { group }) {
            try {
                commit('saveTaskMove', { group })
                // console.log(board)
                // commit('setCurrBoard', { board })
            } catch (err) {
                console.log(err);
            }
        },
        async addTask({ commit, state }, { group, id }) {
            try {
                let boardCopy = JSON.parse(JSON.stringify(state.currBoard))
                const idx = boardCopy.groups.findIndex(currGroup => currGroup.id === group.id)
                boardCopy.groups[idx] = group
                commit({ type: 'saveBoard', board: boardCopy })
                commit('setCurrBoard', { board: boardCopy })
                const board = await boardService.save(boardCopy)
            } catch (error) {
                console.log(error);
            }
        },
        async addGroup({ commit, state }, { groups }) {
            console.log('doing shit');
            try {
                let boardCopy = JSON.parse(JSON.stringify(state.currBoard))
                boardCopy.groups = groups
                commit({ type: 'saveBoard', board: boardCopy })
                commit({ type: 'setCurrBoard', board: boardCopy })
                const board = await boardService.addGroup(boardCopy, groups)
            } catch (error) {
                console.log(error);
            }
        },
        async addNewBoard({ commit }, { board }) {
            try {
                const boardCopy = JSON.parse(JSON.stringify(board))
                const boardToAdd = await boardService.save(boardCopy)
                console.log('boardToAdd', boardToAdd);
                commit('saveBoard', { board: boardToAdd })
            } catch (err) {
                console.log(err);
            }
        },
        onBoardSocketRecived({ commit, state }, { board }) {
            if (state.currBoard._id === board._id) {
                commit("setCurrBoard", { board })
            }
            // commit("saveBoard", { board })


        }



        // async setFilter({ commit }, { filterBy }) {
        //     try {
        //         const boards = await boardService.query(filterBy)
        //         commit({ type: 'setBoards', boards })
        //         commit({ type: 'setFilter', filterBy })
        //     } catch (err) {
        //         console.error(err)
        //     }
        // },
    },

}