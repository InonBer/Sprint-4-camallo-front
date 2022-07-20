<template>

    <boardHeader />
    <boardGroupList v-if="board" :groups="groups" />


    <!-- <pre v-if="boards">
        
    {{ boards }}
  </pre> -->
</template>
 <script>
import boardGroupList from "../cmps/board-group-list-prev.vue"
import boardHeader from '../cmps/board-header.vue'
export default {
    name: 'boardPrev',
    props: {
        board: {
            type: Object,
        },
        // boards: {
        //     type: Object
        // }
    },
    components: {
        boardHeader,
        boardGroupList,
    },
    data() {
        return {
        };
    },
    created() {
        console.log(this.board);
    },
    methods: {},
    computed: {
        groups() {
            return this.board.groups
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>