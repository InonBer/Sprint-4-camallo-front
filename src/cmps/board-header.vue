<template>
    <header class="board-header-container">
        <section class="board-header" v-if="board">
            <span class="board-header-title">{{board?board.title:'Board title'}}</span>
            <button @click="starBoard" class="opacity-button star-btn">
            <span class="icon-star" :class="board.isStarred?'starred':''"></span></button>
            <span class="btn-divider"></span>
            <button class="opacity-button">Boards</button>
            <span class="btn-divider"></span>            
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