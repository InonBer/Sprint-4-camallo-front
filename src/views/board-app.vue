<template>
  <div v-if="board">
    <boardPreview v-if="board" :board="board"></boardPreview>
  </div>

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
    const { id } = this.$route.params
    try {
      this.board = await boardService.getById(id)
    } catch (err) {
      console.error(err)
    }
  },
  methods: {},
  computed: {
    boards() {
      // console.log(this.$store.getters.getBoards);
      // return this.$store.getters.getBoards
    }
  },
  unmounted() { },
};
</script>
 <style>
 </style>