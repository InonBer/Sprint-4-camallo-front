<template>
  <header class="app-header" :style="{ backgroundColor: BGC }">
    <div class="header-content">
      <h2 @click="$router.push('/')" class=" header-logo"><img src="../assets/icon-test-white.png" alt="" srcset="">
        Camallo
      </h2>
      <button @click="isRecentModalOpen = !isRecentModalOpen" class="header-button">Boards
        <img src="../assets/arrow-down.png" alt="arw-dwn" />
        <recentModal v-if="isRecentModalOpen" :boards="boards" :title="'Boards'"
          v-click-outside="() => { isRecentModalOpen = false }" />
      </button>
      <button @click="isStarredModalOpen = !isStarredModalOpen" class="header-button">Starred
        <img src="../assets/arrow-down.png" alt="arw-dwn" />
        <recentModal v-if="isStarredModalOpen" :boards="starredBoards" :title="'Starred boards'"
          v-click-outside="() => { isStarredModalOpen = false }" />
      </button>
      <div class="conss">
        <button @click="onCreate" class="header-create-button">Create</button>
        <div v-click-outside="() => { isCreating = false }" v-if="isCreating" class="header-creating-container">
          <header class="header-header">Create</header>
          <div @click="isChoosingBoard = true ; isCreating = false" class="header-create-button">

            <h2 class="title"><span class="title-icon-create"><svg width="24" height="24" role="presentation"
                  focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                    fill="currentColor"></path>
                </svg></span>Create board</h2>
            <p>A board is made up of cards ordered on lists. Use it to manage projects,track information,or organize
              anything.</p>
          </div>
        </div>
        <div class="create-screen-container" v-click-outside="() => { isChoosingBoard = false }" v-if="isChoosingBoard">
          <button @click="closeAllCreate" class="super-exit-buttin">X</button>
          <header class="create-screen-header">Create board</header>
          <hr>
          <div :style="{ backgroundImage: 'url(' + BGImage + ')' }" class="create-img-background">
            <img @load="show" src="../assets/prevImg.png" alt="">
          </div>
          <div class="create-screen-imgs-container">
            <img @click="setBgi(img)" v-for="(img, idx) in imgsToDisplay" :key="idx" :src="img" alt="">
          </div>
          <div>
            <form class="board-create-form" action="">
              <label name="Board Title*" style="text-align:start"> Board Title <span>*</span>
                <input v-model="boardTitle" type="text">
                <div class="create-title-req" v-if="boardTitle.length === 0"> <span>👋</span> Board title is required
                </div>
              </label>
              <button @click.stop.prevent="onBoardCreate" class="create-screen-button">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="header-end">

      <!-- <input type="text" placeholder=" Search"> -->

      <el-input v-model="searchtxt" placeholder="Search" :prefix-icon="Search" />
      <div style="width:32px; height:32px">
        <avatar @click="logout" :username="currUser.fullname" />
      </div>
    </div>
  </header>

</template>
<script>
import { Search } from '@element-plus/icons-vue'
import { boardService } from '../services/board.service';
import { FastAverageColor } from 'fast-average-color';
import { userService } from '../services/user.service';
import recentModal from './recent-modal.vue'
import avatar from './avatar.vue'
export default {
  props: {

  },
  name: 'app-header',
  components: {
    recentModal,
    avatar
  },
  data() {
    return {
      boardTitle: '',
      isCreating: false,
      imgsToDisplay: [],
      emptyBoard: null,
      isChoosingBoard: false,
      backGroundPrev: '',
      BGC: '#1e6584',
      isRecentModalOpen: false,
      searchtxt: '',
      isStarredModalOpen: false
    };
  },
  async created() {
    try {
      const imgs = await boardService.getBgcImgs()
      this.imgsToDisplay = imgs
    } catch (e) {
      console.log(e);
    }
    this.emptyBoard = boardService.getEmptyBoard()
    // setTimeout(()=>{
    //   this.headerColor()
    // },500)
  },
  methods: {
    test(ev) {
      console.log(ev);
    },
    logout() {
      userService.logout()
      this.$store.dispatch('userLogout')
      this.$router.push('/')
    },
    closeAllCreate() {
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''
    },
    setBgi(img) {
      this.backGroundPrev = img
    },
    onBoardCreate() {
      if (this.boardTitle.length < 1) return
      let board = boardService.getEmptyBoard()
      board.title = JSON.parse(JSON.stringify(this.boardTitle))
      board.style.bgi = JSON.parse(JSON.stringify(this.backGroundPrev))
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''
      this.$store.dispatch('addNewBoard', { board })
    },
    onCreate() {
      this.boardTitle = ''
      this.isCreating = !this.isCreating
    },
    // setBoardImg(img) {
    //   this.emptyBoard.style.bgi = 'img'
    //   this.emptyBoard.style.bgi = img
    //   console.log(this.emptyBoard);
    // },
    // headerColor() {
    //   const board = this.$store.getters.currBoard
    //   board.style.bgi
    //   const fac = new FastAverageColor();
    //   fac.getColorAsync(board.style.bgi)
    //     .then(color => {
    //       this.BGC = color.rgba;
    //     })
    // }
  },
  computed: {

    BGImage() {
      if (this.backGroundPrev === '') return this.imgsToDisplay[0]
      else return this.backGroundPrev
    },
    Search() {
      return Search
    },
    boards() {
      return this.$store.getters.getBoards
    },
    currUser() {
      return this.$store.getters.currUser
    },
    starredBoards() {
      return this.boards.filter((board) => {
        return board.isStarred
      })
    }
  },
  unmounted() { },
}
</script>
<style>
</style>