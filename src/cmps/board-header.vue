<template>
    <header class="board-header-container">
        <section class="board-header" v-if="board">
            <span class="board-header-title">{{ board ? board.title : 'Board title' }}</span>
            <button @click="starBoard" class="opacity-button star-btn">
                <span class="icon-star" :class="board.isStarred ? 'starred' : ''"></span></button>
            <span class="btn-divider"></span>
            <button class="opacity-button">Boards</button>
            <span class="btn-divider"></span>
            <button class="opacity-button">Boards</button>
        </section>
        <section class="board-header">
            <button class="opacity-button open-btn" id="main" @click="isSidebarOpen = true">
                <span class="icon-overflow"></span>
                Show menu
            </button>
        </section>
    </header>
    <sidebar v-if="isSidebarOpen" :class="{ open: isOpen }" @onCloseNav="closeSidebar" />
</template>
 <script>
 import sidebar from './board-sidebar.vue';
 export default {
     props: {
         board: Object
     },
     name: 'boardHeader',
     components: {
         sidebar
     },
     data() {
         return {
             isSidebarOpen: false
         };
     },
     computed: {
         isOpen() {
             return (this.isSidebarOpen) ? true : false
         }
     },
     created() { },
     methods: {
         closeSidebar() {
             this.isSidebarOpen = false
         },
 
         starBoard() {
             this.board.isStarred = !this.board.isStarred
             this.$store.dispatch({ type: 'saveBoard', board: this.board })
         },
 
     },
 };
 </script>