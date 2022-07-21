<template>
  <section>
    <user-msg />
    <router-view class="main-app-height"/>
  </section>
</template>

<script>

import { store } from './store/store'
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
    userMsg
  },
}
</script>
<style>
</style>