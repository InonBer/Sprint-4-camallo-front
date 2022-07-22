<template>
    <header class="board-header-container">
        <section class="board-header" v-if="board">
            <span class="board-header-title">{{board?board.title:'Board title'}}</span>
            <!-- <span class="board-header-title">sprint 4</span> -->
            <button @click="starBoard" class="opacity-button star-btn"><span class="icon-star" :class="board.isStarred?'starred':''"></span></button>|
            <button class="opacity-button">Boards</button>|
            <button class="opacity-button">Boards</button>
        </section>
    </header>
</template>
 <script>
export default {
    props:{
        board:Object
    },
    name: 'boardHeader',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        starBoard(){
            this.board.isStarred = !this.board.isStarred
            this.$store.dispatch({type:'saveBoard',board:this.board})
        }
    },
};
</script>