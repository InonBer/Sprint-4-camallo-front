<template>
  <header class="app-header">
    <div class="header-content">
      <h2 class="header-logo">Camallo</h2>
      <button class="header-button">Workspaces <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Recent <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Starred <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Templates <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button @click="onBoardCreate" class="header-create-button">Create</button>

      <select @change="changeLink" v-if="boards" id="boards" name="board-list">
        <option v-for="board in boards" :key="board._id" :value="board._id"> {{ board.title }}</option>
        <!-- <option :value="boards[0]._id">{{ boards[0].title }}</option>
        <option :value="boards[1]._id">{{ boards[1].title }}</option> -->

        <!-- <option v-for="board in bards" value=""></option> -->
      </select>

    </div>
    <div class="header-end">

      <input type="text">
      <button class="header-create-button">Bell</button>
      <button class="header-create-button">icon</button>
    </div>
  </header>

</template>
<script>
import { boardService } from '../services/board.service';
export default {
  props: {

  },
  name: 'app-header',
  components: {},
  data() {
    return {};
  },
  created() { },
  methods: {
    changeLink(ev) {
      // this.$router.push('/')
      this.$router.push(`/board/${ev.target.value}`);
      // setTimeout(() => {
      // }, 0)
    },
    onBoardCreate() {
      try {
        const board = boardService.getEmptyBoard()
        this.$store.dispatch('saveBoard', { board })
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards
    }
  },
  unmounted() { },
}
</script>
