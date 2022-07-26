<template>
    <section v-click-outside="onCloseNav" class="sidebar">
        <header>
            <span class="close-btn" @click="onCloseNav">×</span>
            <h3 class="board-menu-header-title js-board-menu-title-text">{{ boardMenuTitle }}</h3>
        </header>
        <hr class="board-menu-header-divider">

        <div class="content-wrapper">
            <section v-if="headerTitle === ''" class="content-to-show">


                <div class="sidebar-btn-container">
                    <div class="bgc-sidebar-img" :style="boardBGI"></div>
                    <div class="board-menu-navigation-item-link" @click="onChangeBackground">Change background</div>

                </div>
                <hr class="board-menu-header-divider">

                <div class="sidebar-activities">
                    <div class="activities-title">
                        <p><span class="icon-activity"></span> Activities</p>
                    </div>
                    <div v-for="activity in currBoard.activities" class="sidebar-act-cnt">
                        <div class="sb-act">
                            <img class="act-memImg" :src="activity.byMember.imgUrl" alt="">
                            <div>{{ activity.byMember.fullname }} <span>{{ activity.txt }}</span></div>
                        </div>
                    </div>
                </div>
            </section>
            <section v-else-if="headerTitle === 'change background'" class="change-background">

                <div @click="onSelectBackground('Photos')">
                    <img src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg"
                        alt="" />
                    <p>Photos</p>
                </div>
                <div @click="onSelectBackground('Colors')">
                    <img src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg" alt="" />
                    <p>Colors</p>
                </div>
            </section>
            <section v-else-if="headerTitle === 'Photos'">
                <div class="board-background-photos">
                    <div class="search-photos">
                        <input type="text" @input.prevent="searchImgs" v-model="photosFilterBy" placeholder="Photos">
                        <span class="icon-search"></span>
                    </div>
                    <div v-if="photos" class="board-backgrounds-list">
                        <ul v-for="photo in photos" key="photo">
                            <li class="photo" @click="changeBoardBackground(photo)"
                                :style="{ backgroundImage: `url(${photo})` }"></li>
                        </ul>
                    </div>
                    <div class="board-backgrounds-photos-footer"></div>
                    <div class="unsplash-disclaimer">
                        By using images from Unsplash, you agree to their
                        <a href="http://unsplash.com/license" target="_blank" rel="noopener noreferrer">license</a>
                        and
                        <a href="http://unsplash.com/terms" target="_blank" rel="noopener noreferrer">Terms of
                            Service</a>
                    </div>
                </div>
            </section>
            <section v-else-if="headerTitle === 'Colors'">
                <div class="board-background-photos">

                    <div v-if="colors" class="board-backgrounds-list">
                        <ul v-for="color in colors" key="color">
                            <li class="photo" @click="changeBoardBackgroundColor(color)"
                                :style="{ backgroundColor: `rgb(${color})` }"></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
 <script>
import { unsplashService } from '../services/unsplash.service'
import { debounce } from '../services/util.service';
export default {
    name: 'board-sidebar',

    components: {},
    data() {
        return {
            boardMenuTitle: 'Menu',
            headerTitle: '',
            headerIndex: 0,
            photosFilterBy: '',
            photos: null,
            colors: [
                '0, 121, 191',
                '210, 144, 52',
                '81, 152, 57',
                '76, 70, 50',
                '137, 96, 158',
                '205, 90, 145',
                '75, 191, 107',
                '0, 174, 204',
                '131, 140, 145',
                '255,255,255'
            ]
        };
    },
    created() {
        this.bounce = debounce(this.getPhotos)
    },
    methods: {
        onCloseNav() {
            this.$emit("onCloseNav")
        },
        onChangeBackground() {
            this.headerTitle = 'change background'
            this.boardMenuTitle = 'change background'
        },
        onSelectBackground(option) {
            this.headerTitle = option
            this.boardMenuTitle = (option === 'Photos') ? `${option} by Unsplash` : option
        },
        searchImgs() {
            this.bounce()
        },
        async getPhotos() {
            console.log('this.photosFilterBy', this.photosFilterBy)

            try {
                const photos = await unsplashService.query(this.photosFilterBy)
                this.photos = photos.map(photo => photo.urls.regular)
            } catch (error) {
                console.log(error);
            }

        },
        changeBoardBackground(photoUrl) {
            let boardCopy = JSON.parse(JSON.stringify(this.currBoard))
            boardCopy.style.bgc = null
            boardCopy.style.bgi = photoUrl
            this.$store.dispatch('saveBoard', { board: boardCopy })
        },
        changeBoardBackgroundColor(color) {
            let boardCopy = JSON.parse(JSON.stringify(this.currBoard))
            boardCopy.style.bgi = null
            boardCopy.style.bgc = color
            this.$store.dispatch('saveBoard', { board: boardCopy })


        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
        boardBGI() {
            if (this.currBoard.style.bgi) {
                return { backgroundImage: `url('  ${this.currBoard.style.bgi}  ')` }
            }
            else return { backgroundColor: 'rgb(' + this.currBoard.style.bgc + ')' }
        },

    },
    unmounted() { },
};
</script>
 <style>
 .act-memImg {
     width: 32px;
     height: 32px;
     border-radius: 50%;
 }
 
 .sidebar-act-cnt {
     display: flex;
     flex-direction: column;
     gap: 5px;
 }
 
 .sb-act {
     height: 76px;
     display: flex;
     flex-direction: row;
     gap: 8px;
 
 }
 
 .sb-act img {
 
     align-self: center
 }
 
 .sb-act div {
     justify-self: center;
     align-self: center;
     font-size: 14px;
     font-weight: 700;
 }
 
 .sb-act span {
     font-size: 14px;
     font-weight: 400;
 }
 </style>
