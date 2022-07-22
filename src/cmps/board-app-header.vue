<template>
  <header class="app-header">
    <div class="header-content">
      <h2 @click="$router.push('/')" class=" header-logo">Camallo</h2>
      <button class="header-button">Recent <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Starred <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <div class="conss">
        <button @click="onCreate" class="header-create-button">Create</button>
        <div v-if="isCreating" class="header-creating-container">
          <h2>Create</h2>
          <div class="create-input-div">

            <form @submit.prevent="onBoardCreate">
              <input type="text" v-model="boardTitle" placeholder="Board name?">
            </form>
          </div>
          <div class="header-imgs-container">
            <img @click="setBoardImg(img)" v-for="(img, idx) in imgsToDisplay" :key="idx" :src="img" alt="">

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
      searchtxt: ''
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
    changeLink(ev) {
      // this.$store.dispatch('setCurrBoard', { id: ev.target.value })
      // this.$router.push('/')
      this.$router.push(`/board/${ev.target.value}`);
      // setTimeout(() => {
      // }, 0)
    },
    onBoardCreate() {
      try {
        this.emptyBoard.title = JSON.parse(JSON.stringify(this.boardTitle))
        this.$store.dispatch('saveBoard', { board: this.emptyBoard })
        this.isCreating = false
        this.boardTitle = ''
      } catch (error) {
        console.log(error);
      }
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
