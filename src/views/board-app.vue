<template>

  <boardPreview v-if="board" :board="board"></boardPreview>
  <router-view></router-view>

</template>
 <script>
import boardPreview from '../cmps/board-preview.vue'
import { boardService } from '../services/board.service';
export default {
  name: 'boardApp',
  components: {
    boardPreview
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
  methods: {},
  computed: {
    boards() {
      // console.log(this.$store.getters.getBoards);
      // return this.$store.getters.getBoards
    }
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