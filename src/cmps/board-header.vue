<template>
    <header class="board-header-container">
        <section class="board-header" v-if="board">
            <span class="board-header-title">{{board?board.title:'bye'}}</span>
            <!-- <span class="board-header-title">sprint 4</span> -->
            <button class="opacity-button"><span class="star-icon"></span></button>|
            <button class="opacity-button">Boards</button>|
            <button class="opacity-button">Boards</button>
        </section>
    </header>
</template>
 <script>
export default {
    name: 'boardHeader',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        board(){
            return this.$store.getters.currBoard
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>