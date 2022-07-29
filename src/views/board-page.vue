<template>
    <board-app-header />
    <div class="board-page-container">
        <div class="main-boards-container">
            <article v-if="boards">
                <h2>
                    <span class="boards-svg">
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 3C7 2.44772 7.44772 2 8 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H8C7.44772 4 7 3.55228 7 3Z"
                                fill="currentColor"></path>
                            <path
                                d="M3 7C2.44772 7 2 7.44772 2 8V9C2 9.55228 2.44772 10 3 10C3.55228 10 4 9.55228 4 9V8C4 7.44772 3.55228 7 3 7Z"
                                fill="currentColor"></path>
                            <path
                                d="M2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12V13C4 13.5523 3.55228 14 3 14C2.44772 14 2 13.5523 2 13V12Z"
                                fill="currentColor"></path>
                            <path
                                d="M2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16V19C2.89543 19 2 18.1046 2 17V16Z"
                                fill="currentColor"></path>
                            <path
                                d="M12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4H13C13.5523 4 14 3.55228 14 3C14 2.44772 13.5523 2 13 2H12Z"
                                fill="currentColor"></path>
                            <path
                                d="M15 3C15 2.44772 15.4477 2 16 2H17C18.1046 2 19 2.89543 19 4H16C15.4477 4 15 3.55228 15 3Z"
                                fill="currentColor"></path>
                            <path
                                d="M4 2C2.89543 2 2 2.89543 2 4V5C2 5.55228 2.44772 6 3 6C3.55228 6 4 5.55228 4 5V4H5C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2H4Z"
                                fill="currentColor"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7 5C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H7ZM8 7C7.44772 7 7 7.44771 7 8V17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17V8C12 7.44772 11.5523 7 11 7H8ZM14 8C14 7.44772 14.4477 7 15 7H18C18.5523 7 19 7.44772 19 8V13C19 13.5523 18.5523 14 18 14H15C14.4477 14 14 13.5523 14 13V8Z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                    Boards
                </h2>
                <div class="board-prev-page-loop">
                    <div @click="$router.push(`/board/${board._id}`)" v-for="board in boards" :key="board._id"
                        :style="{ backgroundImage: 'url(' + board.style.bgi + ')' }" class="prev-cont">
                        <div @click.stop.prevent="removeBoard(board._id)" class="admin-remove-btn"
                            v-if="currUser.isAdmin"><span class="remove-btn-icon"></span>
                        </div>
                        <header>{{ board.title }}</header>
                        <button class="boards-star-btn" @click.stop="toggleStar(board._id)"><span class="boards-star"
                                :class="board.isStarred ? 'starred' : ''"></span></button>
                    </div>
                    <div class="conss">
                        <div @click="onCreate" class="prev-cont">
                            <header>New Board</header>
                        </div>
                        <div v-click-outside="() => { isCreating = false }" v-if="isCreating"
                            class="header-creating-container">
                            <header class="header-header">Create</header>
                            <div @click="isChoosingBoard = true ; isCreating = false" class="header-create-button">

                                <h2 class="title"><span class="title-icon-create"><svg width="24" height="24"
                                            role="presentation" focusable="false" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                                                fill="currentColor"></path>
                                        </svg></span>Create board</h2>
                                <p>A board is made up of cards ordered on lists. Use it to manage projects,track
                                    information,or organize
                                    anything.</p>
                            </div>
                        </div>
                        <div class="create-screen-container-board-page"
                            v-click-outside="() => { isChoosingBoard = false }" v-if="isChoosingBoard">
                            <button @click="closeAllCreate" class="super-exit-buttin">X</button>
                            <header class="create-screen-header">Create board</header>
                            <hr>
                            <div :style="{ backgroundImage: 'url(' + BGImage + ')' }" class="create-img-background">
                                <img @load="show" src="../assets/prevImg.png" alt="">
                            </div>
                            <div class="create-screen-imgs-container">
                                <img @click="setBgi(img.full)" v-for="(img, idx) in imgsToDisplay" :key="idx" :src="img.thumb"
                                    alt="">
                            </div>
                            <div>
                                <form class="board-create-form" action="">
                                    <label name="Board Title*" style="text-align:start"> Board Title <span>*</span>
                                        <input v-model="boardTitle" type="text">
                                        <div class="create-title-req" v-if="boardTitle.length === 0"> <span>👋</span>
                                            Board
                                            title is required
                                        </div>
                                    </label>
                                    <button @click.stop.prevent="onBoardCreate"
                                        class="create-screen-button">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <article v-if="boards && starredBoards">
                <h3>
                    <span class="starred-boards-icon">
                    </span>
                    Starred
                </h3>
                <div class="board-prev-page-loop">
                    <div @click.stop.prevent="$router.push(`/board/${board._id}`)" v-for="board in starredBoards"
                        :key="board._id" :style="{ backgroundImage: 'url(' + board.style.bgi + ')' }" class="prev-cont">
                        <div @click="removeBoard(board._id)" class="admin-remove-btn" v-if="currUser.isAdmin"><span
                                class="remove-btn-icon"></span>
                        </div>
                        <header>{{ board.title }}</header>
                        <button class="boards-star-btn" @click.stop="toggleStar(board._id)"><span
                                class="boards-star starred"></span></button>
                    </div>
                </div>
            </article>
        </div>


    </div>
</template>
 <script>
import boardAppHeader from '../cmps/board-app-header.vue';
import { boardService } from '../services/board.service';

export default {
    name: 'boardPage',
    components: {
        boardAppHeader,
    },
    data() {
        return {
            boardTitle: '',
            isCreating: false,
            imgsToDisplay: [],
            emptyBoard: null,
            isChoosingBoard: false,
            backGroundPrev: '',
            BGC: '#1e6584',
        };
    },
    async created() {
        try {
            const imgs = await boardService.getBgcImgs()
            this.imgsToDisplay = imgs
        } catch (e) {
            console.log(e);
        }
        this.emptyBoard = boardService.getEmptyBoard()
    },
    methods: {
        removeBoard(id) {
            this.$store.dispatch('removeBoard', { id })
        },
        toggleStar(id) {
            const idx = this.boards.findIndex(currBoard => currBoard._id === id)
            const board = JSON.parse(JSON.stringify(this.boards[idx]))
            board.isStarred = !board.isStarred
            this.$store.dispatch('updateBoard', { board })
        },
        closeAllCreate() {
            this.isCreating = false
            this.isChoosingBoard = false
            this.boardTitle = ''
            this.backGroundPrev = ''
        },
        setBgi(img) {
            this.backGroundPrev = img
        },
        onCreate() {
            this.boardTitle = ''
            this.isCreating = !this.isCreating
        },
        onBoardCreate() {
            let board = boardService.getEmptyBoard()
            board.title = JSON.parse(JSON.stringify(this.boardTitle))
            board.style.bgi = JSON.parse(JSON.stringify(this.backGroundPrev))
            this.isCreating = false
            this.isChoosingBoard = false
            this.boardTitle = ''
            this.backGroundPrev = ''
            this.$store.dispatch('addNewBoard', { board })
        },
    },
    computed: {
        boards() {
            return this.$store.getters.getBoards
        },
        unStarredBoards() {
            return this.boards.filter(board => !board.isStarred)
        },
        starredBoards() {
            return this.boards.filter(board => board.isStarred)
        },
        BGImage() {
            if (this.backGroundPrev === '') return this.imgsToDisplay[0]
            else return this.backGroundPrev
        },
        currUser() {
            return this.$store.getters.currUser
        }

    },
    unmounted() { },
};
</script>
 <style>
 .create-screen-container-board-page {
     position: absolute;
     display: flex;
     z-index: 100;
     flex-direction: column;
     width: 304px;
     height: auto;
     will-change: top, left;
     padding-left: 12px;
     padding-right: 12px;
     font-size: 14px;
     line-height: 20px;
     font-weight: 400;
     background-color: #ffffff;
     justify-content: center;
     border-radius: 3px;
     box-shadow: 0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
     box-sizing: border-box;
     gap: 5px;
 }
 </style>