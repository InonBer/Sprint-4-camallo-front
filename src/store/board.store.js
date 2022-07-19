import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'
import { boardService } from '../services/board.service.js'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const boardStore = {
    state: {
        boards: null
    },
    getters: {
        fetchBoards(state) {
            return state.boards
        }
    },
    mutations: {
        setBoards(state, { board }) {
            state.boards = board
        }

    },
    actions: {
        async getBords({ commit }) {

            const board = await boardService.query()
            try {
                commit('setBoards', { board })
                console.log('made it');
            } catch (e) {
                console.log('couldnt fetch boards ', e);
            }
        }

    },

}