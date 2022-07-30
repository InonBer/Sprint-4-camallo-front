<template>
  <section class="sec-basis">
    <user-msg />
    <router-view />
  </section>
</template>

<script>

import { store } from './store/store'
import userMsg from './cmps/user-msg.vue'
// import { userService } from './services/user.service'


export default {

  created() {
    this.$store.dispatch({ type: 'loadBoards' })
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
.sec-basis {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>