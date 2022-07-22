<template>
  <board-app-header />
  <div v-if="board" class="board-app bgc-img" :style="{ backgroundImage: 'url(' + boardBGI + ')' }">
    <board-header :board="board" />
    <group-list @groupAdded="groupAdded" @onBoardChange="onBoardChange" @onDetails="onDetails" v-if="board"
      :groups="groups" />
    <router-view />
  </div>
</template>
 <script>
import { boardService } from '../services/board.service';
import groupList from "../cmps/group-list.vue"
import boardHeader from '../cmps/board-header.vue'
import boardAppHeader from '../cmps/board-app-header.vue';

export default {
  name: 'boardApp',
  components: {
    boardHeader,
    groupList,
    boardAppHeader
  },
  data() {
    return {
      board: null
    }
  },
  async created() {
    console.log('created');
    // const { id } = this.$route.params

    // try {
    //   this.board = await boardService.getById(id)
    // } catch (err) {
    //   console.error(err)
    // }
  },
  emits:['onBoardChange'],
  methods: {
    onDetails(ids) {
      ids.boardId = this.board._id
      const { boardId, groupId, taskId } = ids
      this.$router.push(this.$route.fullPath + `/group/${groupId}/task/${taskId}`)
    },
    groupAdded() {
      this.$store.dispatch('saveBoard', { board: this.board })
    },
    onBoardChange() {
      this.$store.dispatch('saveBoard', { board: this.board })
    }
  },
  computed: {
    // boards() {
    //   console.log(this.$store.getters.getBoards);
    //   return this.$store.getters.getBoards
    // },
    groups() {
      return this.board.groups
    },
    boardBGI() {
      return this.board.style.bgi
    },
  },
  unmounted() { },
  watch: {
    '$route.params': {
      async handler({ boardId }) {
        try {
          this.board = await boardService.getById(boardId)
          this.$store.dispatch({ type: 'setCurrBoard', id: boardId })
        } catch (err) {
          console.error(err)
        }
      },
      immediate: true


    }
  }

};
</script>
 <style>
 </style>