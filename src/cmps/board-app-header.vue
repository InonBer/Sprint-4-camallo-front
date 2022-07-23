<template>
  <header class="app-header">
    <div class="header-content">
      <h2 @click="$router.push('/')" class=" header-logo">Camallo</h2>
      <button class="header-button">Recent <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Starred <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <div class="conss">
        <button @click="onCreate" class="header-create-button">Create</button>
        <div v-if="isCreating" class="header-creating-container">
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
        <div class="create-screen-container" v-if="isChoosingBoard">
          <button @click="closeAllCreate" class="super-exit-buttin">X</button>
          <header class="create-screen-header">Create board</header>
          <hr>
          <div :style="{ backgroundImage: 'url(' + BGImage + ')' }" class="create-img-background">
            <img src="../assets/prevImg.png" alt="">
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


      <select @change="changeLink" v-if="boards" id="boards" name="board-list">
        <option v-for="board in boards" :key="board._id" :value="board._id"> {{ board.title }}</option>
        <!-- <option :value="boards[0]._id">{{ boards[0].title }}</option>
        <option :value="boards[1]._id">{{ boards[1].title }}</option> -->

        <!-- <option v-for="board in bards" value=""></option> -->
      </select>

    </div>
    <div class="header-end">

      <!-- <input type="text" placeholder=" Search"> -->

      <el-input v-model="searchtxt" size="small" placeholder="Search" :prefix-icon="Search" />
      <button class="header-create-button">Bell</button>
      <button class="header-create-button">icon</button>
    </div>
  </header>

</template>
<script>
import { Search } from '@element-plus/icons-vue'
import { boardService } from '../services/board.service';

export default {
  props: {

  },
  name: 'app-header',
  components: {},
  data() {
    return {
      boardTitle: '',
      isCreating: false,
      imgsToDisplay: [],
      emptyBoard: null,
      searchtxt: '',
      isChoosingBoard: false,
      backGroundPrev: ''
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

  },
  methods: {
    closeAllCreate() {
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''

    },
    changeLink(ev) {
      // this.$router.push('/')
      this.$store.dispatch('setCurrBoard', { id: ev.target.value })
      this.$router.push(`/board/${ev.target.value}`);
      // setTimeout(() => {
      // }, 0)
    },
    setBgi(img) {

      this.backGroundPrev = img
    },
    onBoardCreate() {
      let board = boardService.getEmptyBoard()
      board.title = JSON.parse(JSON.stringify(this.boardTitle))
      board.style.bgi = JSON.parse(JSON.stringify(this.backGroundPrev))
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''
      this.$store.dispatch('saveBoard', { board })

    },
    onCreate() {
      this.boardTitle = ''
      this.isCreating = !this.isCreating
    },
    setBoardImg(img) {
      this.emptyBoard.style.bgi = 'img'
      this.emptyBoard.style.bgi = img
      console.log(this.emptyBoard);
    }
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
    }
  },
  unmounted() { },
}
</script>
<style>
.create-screen-button {
  width: 100%;
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #ffffff;
  height: 25px;
  border-radius: 3px;
}


.create-screen-button:hover {
  cursor: pointer;
  background-color: #026aa7;
}

.create-title-req {
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.create-screen-container {
  position: fixed;
  display: flex;
  z-index: 100;
  flex-direction: column;
  width: 304px;
  height: auto;
  will-change: top, left;
  padding-left: 12px;
  padding-right: 12px;
  left: 150px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  background-color: #ffffff;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  box-sizing: border-box;
  gap: 5px;

}

.create-img-background {
  margin: 0 auto;
  width: 200px;
  height: 120px;
  background: none;
  background-position: center center;
  background-size: cover;
  border-radius: 3px;
  box-shadow: 0 7px 15px rgb(0 0 0 / 15%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-img-background img {
  width: 186px;
  height: 103px
}

.create-screen-container div:not(.create-img-background) {
  width: 100%;
}

.create-screen-imgs-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
  padding-top: 10px;
  border-top: rgba(158, 158, 158, 0.329) solid 1px;

}

.create-screen-imgs-container img {
  width: 64px;
  height: 40px;
  border-radius: 3px;
}

.board-create-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1px
}

.create-screen-header {
  padding-top: 8px;
  color: #5e6c84;
  height: 40px;
  margin: 0 auto;
  width: 80%;
  border-bottom: #5e6c8442 solid 0.3px;
}
</style>