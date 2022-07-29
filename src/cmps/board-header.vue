<template>
    <header class="board-header-container">
        <section class="board-header" v-if="board">
            <span class="board-header-title">{{ board ? board.title : 'Board title' }}</span>
            <button @click="starBoard" class="opacity-button star-btn">
                <span class="icon-star" :class="board.isStarred ? 'starred' : ''"></span></button>
            <span class="btn-divider"></span>
            <button class="opacity-button board-header-board">Boards</button>
            <span class="btn-divider"></span>
            <!-- <button class="opacity-button">Boards</button>
            <span class="btn-divider"></span> -->
            <section class="members">
                <img v-if="currUser.img" class="userImg" :src="currUser.img" alt="">
                <avatar v-else :username="currUser.fullname" />
                <img class="userImg" v-for="(user, idx) in board.members.slice(0, 4)" :key="user._id"
                    :src=board.members[idx].imgUrl />
            </section>
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
 import avatar from './avatar.vue';
 export default {
     props: {
         board: Object
     },
     name: 'boardHeader',
     components: {
         sidebar,
         avatar
     },
     data() {
         return {
             isSidebarOpen: false
         };
     },
     computed: {
         isOpen() {
             return (this.isSidebarOpen) ? true : false
         }, currUser() {
             return this.$store.getters.currUser
         },
     },
     created() { },
     methods: {
         closeSidebar() {
             this.isSidebarOpen = false
         },
 
         starBoard() {
             const boardCopy = JSON.parse(JSON.stringify(this.board))
             boardCopy.isStarred = !this.board.isStarred
             this.$store.dispatch('saveBoard', { board: boardCopy })
         },
 
     },
 };
 </script>