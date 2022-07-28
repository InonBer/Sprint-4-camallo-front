import { userService } from '../../services/user.service'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../../services/socket.service'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        watchedUser: null,
        currUser: userService.getLoggedinUser()
    },
    getters: {
        currUser(state) {
            return state.currUser
        },
    },
    mutations: {
        setCurrUser(state, { user }) {
            state.currUser = user
        },
        userLogout(state) {
            state.currUser = null
        },
        toggleLabelsExtended(state) {
            if (!state.currUser.labelsExtended) {
                state.currUser.labelsExtended = true
            } else {
                state.currUser.labelsExtended = false
            }

        }
    },
    actions: {
        setCurrUser({ commit }, { user }) {
            console.log(user);
            commit('setCurrUser', { user })
        },
        loginUser({ commit }, { user }) {
            commit('setCurrUser', { user })
        },
        userLogout({ commit }) {
            commit('userLogout')
        },
        async onGuestLogin({ commit }, { guest }) {
            try {
                const user = await userService.login(guest)
                console.log('loggin in!!!');
                console.log('user!!!!!', user)

                commit('setCurrUser', { user })
            } catch (e) {
                console.log(e);
            }
        },
        toggleLabelsExtended({ commit }) {
            commit('toggleLabelsExtended')
        }

    },

}