<template>
  <section>
    <user-msg />
    <app-header />
    <!-- <div v-if="currBoard" :style="{ backgroundImage: 'url(' + boardBGI + ')' }" class="bgc-img"> -->
    <router-view class="bgc-img" v-if="currBoard" :style="{ backgroundImage: 'url(' + boardBGI + ')' }" />
    <!-- </div> -->
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
    boardBGI() {
      return this.$store.getters.getBoardBGI
      // const bgi = this
    },
    currBoard() {
      return this.$store.getters.currBoard
    }
  },
  components: {
    appHeader,
    userMsg
  },
}
</script>
<style>
.bgc-img {
  height: 100%;
  background-attachment: fixed;
  background-position: right bottom;
  background-size: cover;
}
</style>