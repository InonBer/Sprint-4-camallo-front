<template>
    <board-app-header />
    <div class="board-page-container">

        <div class="board-prev-page-loop">
            <h2>Boards</h2>
            <div @click="$router.push(`/board/${board._id}`)" v-for="board in boards" :key="board.id"
                :style="{ backgroundImage: 'url(' + board.style.bgi + ')' }" class="prev-cont">
                <header>{{ board.title }}</header>
            </div>
        </div>

    </div>
</template>
 <script>
import boardAppHeader from '../cmps/board-app-header.vue';
export default {
    name: 'boardPage',
    components: {
        boardAppHeader,
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        boards() {
            return this.$store.getters.getBoards
        }
    },
    unmounted() { },
};
</script>
 <style>
 .board-page-container {
     /* background-color: aqua; */
     height: 93vh;
 }
 
 .board-prev-page-loop {
     margin: 0 auto;
     width: 60%;
     padding-top: 20%;
     height: 60%;
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     gap: 20px;
 
 }
 
 .prev-cont {
     background-attachment: fixed;
     background-position: right bottom;
     background-size: cover;
     height: 96px;
     width: 194px;
     /* background-color: black; */
     border-radius: 3px;
 }
 
 .prev-cont:hover {
     cursor: pointer;
 }
 
 .prev-cont header {
     padding-left: 10px;
     padding-top: 10px;
     color: #ffffff;
     font-size: 16px;
     font-weight: 700;
     word-wrap: break-word;
     /* line-height: 20px; */
 }
 </style>