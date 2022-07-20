<template>
  <section>
    <user-msg />
    <app-header :boards="boards" />
    <router-view />
  </section>
</template>

<script>

import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
// import { userService } from './services/user.service'


export default {

  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    // console.log('Vue App created')
    // const user = userService.getLoggedinUser()
    // if (user)  store.commit({type: 'setLoggedinUser', user})
  },
  methods: {

  },
  computed: {
    boards() {
      return this.$store.getters.getBoards
    },
  },
  components: {
    appHeader,
    userMsg
  },
}
</script>