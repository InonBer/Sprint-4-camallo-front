import { userService } from '../../services/user.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../../services/socket.service'
import { boardService } from '../../services/board.service.js'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const boardStore = {
    state: {
        boards: null,
        filterBy: null
    },
    getters: {
        getBoards(state) {
            return state.boards
        }
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

            const idx = state.boards.findIndex((currBoard) => currBoard._id === board._id)
            console.log(idx);
            if (idx !== -1) state.boards.splice(idx, 1, board)
            else {
                console.log('entered else')
                console.log(board);
                state.boards.push(board)
                console.log(state.boards);
            }
        },
        //   setFilter(state, { filterBy }) {
        //     state.filterBy = { ...filterBy }
        //   }
    },
    actions: {
        async loadBoards({ commit }) {
            console.log('in actions ');
            const boards = await boardService.query()
            console.log(boards);
            try {
                commit('setBoards', { boards })
                console.log('made it');
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
        async saveBoard({ commit }, { board }) {
            try {
                board = await boardService.save(board)
                commit({ type: 'saveBoard', board })
            } catch (err) {
                console.error(err)
            }
        },

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