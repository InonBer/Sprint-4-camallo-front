<template>
  <board-app-header />
  <div v-if="currBoard" class="board-app bgc-img" :style="boardBGI">
    <board-header :board="currBoard" />
    <group-list @onTaskMove="onTaskMove" @groupAdded="groupAdded" @onBoardChange="onBoardChange" @onDetails="onDetails"
      v-if="currBoard" :groups="currBoard.groups" />
    <router-view />
  </div>
</template>
 <script>
import { boardService } from '../services/board.service';
import groupList from "../cmps/group-list.vue"
import boardHeader from '../cmps/board-header.vue'
import boardAppHeader from '../cmps/board-app-header.vue';

export default {
  emits: ['onTaskMove'],
  name: 'boardApp',
  components: {
    boardHeader,
    groupList,
    boardAppHeader
  },
  data() {
    return {
      board: null,
    }
  },
  created() {
    console.log('created');
    // const { id } = this.$route.params
    // try {
    //   this.board = await boardService.getById(id)
    // } catch (err) {
    //   console.error(err)
    // }
  },
  emits: ['onBoardChange'],
  methods: {
    onTaskMove(groups) {
      console.log(groups);
      let boardCopy = JSON.parse(JSON.stringify(this.currBoard))
      boardCopy.groups = JSON.parse(JSON.stringify(groups))
      this.$store.dispatch('saveBoard', { board: boardCopy })
    },
    onDetails(ids) {
      ids.boardId = this.currBoard._id
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
    currBoard() {
      return this.$store.getters.currBoard
    },

    // groups() {
    //   return this.currBoard.groups
    // },
    boardBGI() {
      if (this.currBoard.style.bgi) {
        return { backgroundImage: `url('  ${this.currBoard.style.bgi}  ')` }
      }
      else return { backgroundColor: 'rgb(' + this.currBoard.style.bgc + ')' }
    },
  },
  unmounted() { },
  watch: {
    '$route.params': {
      async handler({ boardId }) {
        try {
          // this.board = await boardService.getById(boardId)
          // console.log(board);
          this.$store.dispatch({ type: 'setCurrBoard', id: boardId })
        } catch (err) {
          console.error(err)
        }
      },
      immediate: true,
      deep: true


    }
  }

};
</script>
 <style>
 </style>