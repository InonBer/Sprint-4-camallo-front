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

    },
    getters: {
        getBoards(state) {
            return state.boards
        },
        currBoard(state) {
            return state.currBoard
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
        },
        saveTaskMove(state, { group }) {
            const idx = state.currBoard.groups.findIndex(currGroup => group.id === currGroup.id)
            state.currBoard.groups.splice(idx, 1, group)
        },
        toggleLabelsExtended(rootState) {
            if (!rootState.userStore.currUser.labelsExtended) {
                rootState.userStore.currUser.labelsExtended = true
            } else {
                rootState.userStore.currUser.labelsExtended = false
            }

        }
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
        async saveBoard({ commit, state, rootState }, { board, action, task }) {
            try {
                console.log(rootState.userStore.currUser);
                let activity = boardService.getActivityByType(action, rootState.userStore.currUser, task)
                board.activities.unshift(activity)
                socketService.emit('on-UserDrag', board)
                commit({ type: 'saveBoard', board })
                commit({ type: 'setCurrBoard', board })
                const boardToSave = await boardService.save(board)

            } catch (err) {
                console.error(err)
            }
        },
        async setCurrBoard({ state, commit }, { id }) {
            // const idx = state.boards.findIndex(currBoard => currBoard._id === id) 
            // const board =  JSON.parse(JSON.stringify(state.boards[idx]))
            // commit('setCurrBoard', { board })

            try {
                const board = await boardService.getBoardById(id)
                commit('setCurrBoard', { board })
            } catch (err) {
                console.log(err);
            }
        },
        async updateBoard({ commit }, { board }) {
            try {
                const updatedBoard = await boardService.save(board)
                commit('saveBoard', { board })
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
            console.log('Recived a socket');
            if (state.currBoard._id === board._id) {
                commit("setCurrBoard", { board })
            }
        },
        toggleLabelsExtended({ commit }) {
            commit('toggleLabelsExtended')
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