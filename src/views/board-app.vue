<template>
  <div v-if="board" class="board-app bgc-img" :style="{ backgroundImage: 'url(' + boardBGI + ')' }">
    <boardHeader />
    <boardGroupList @groupAdded="groupAdded" @taskAdded="taskAdded" @onDetails="onDetails" v-if="board"
      :groups="groups" />
    <router-view ></router-view>
  </div>
</template>
 <script>
import { boardService } from '../services/board.service';
import boardGroupList from "../cmps/board-group-list-prev.vue"
import boardHeader from '../cmps/board-header.vue'

export default {
  name: 'boardApp',
  components: {
    boardHeader,
    boardGroupList,
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
  methods: {
    onDetails(ids) {
      ids.boardId = this.board._id
      const { boardId, groupId, taskId } = ids
      // console.log(this.$route.fullPath)
      this.$router.push(this.$route.fullPath + '/group/g101/task/c101')
      // this.$router.push({ name: 'taskDetails', params: { boardId: boardId, groupId: groupId, taskId: taskId } })
      // this.$router.push(`/board/${ids.boardId}/group/${ids.groupId}/task/${ids.taskId}`)
    },
    groupAdded() {
      this.$store.dispatch('saveBoard', { board: this.board })
    },
    taskAdded() {
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
    // currBoard() {
    //   return this.$store.getters.currBoard
    // }
  },
  unmounted() { },
  watch: {
    '$route.params': {
      async handler({ boardId }) {
        try {
          this.board = await boardService.getById(boardId)
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