<template>
    <board-app-header />
    <div v-if="board" class="board-app bgc-img" :style="{ backgroundImage: 'url(' + boardBGI + ')' }">
        <board-header :board="board" />
        <group-list v-if="board" :groups="board.groups" />
        <router-view />
    </div>
</template>
 <script>
import groupList from "../cmps/group-list.vue"
import boardHeader from '../cmps/board-header.vue'
import boardAppHeader from '../cmps/board-app-header.vue';

export default {
    name: 'boardPagePrev',
    components: {
        boardHeader,
        groupList,
        boardAppHeader
    },
    props: {
        board: Object
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },

        // groups() {
        //   return this.currBoard.groups
        // },
        boardBGI() {
            return this.board.style.bgi
        },
    },
    unmounted() { },


};
</script>
 <style>
 </style>