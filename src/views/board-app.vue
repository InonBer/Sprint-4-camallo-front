<template>
  <div v-if="boards">
    <boardPreview :boards="boards"></boardPreview>

  </div>
</template>
 <script>
import boardPreview from '../cmps/board-preview.vue'
export default {
  name: 'boardApp',
  components: {
    boardPreview
  },
  data() {
    return {
    };
  },
  created() { },
  methods: {},
  computed: {
    boards() {
      console.log(this.$store.getters.fetchBoards);
      return this.$store.getters.fetchBoards
    }
  },
  unmounted() { },
};
</script>
 <style>
 </style>