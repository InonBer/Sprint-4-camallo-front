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
                        <div @click.stop.prevent="onActivityShow = !onActivityShow" class="activity-show-btn"><span>{{
                                isActivityShowing
                        }}</span></div>
                    </div>
                    <div v-if="currBoard?.activities.length && onActivityShow" v-for="activity in currBoard.activities"
                        class="sidebar-act-cnt">
                        <div class="sb-act">
                            <avatar :username="activity.byMember.fullname" />
                            <div>{{ activity?.byMember.fullname }} <span>{{ activity.txt }}</span>
                                <br /><span>{{ activityDate(activity.createdAt) }}</span>
                            </div>


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
import { userService } from '../services/user.service';
import { debounce } from '../services/util.service';
import moment from 'moment';
import avatar from './avatar.vue'
export default {
    name: 'board-sidebar',

    components: {
        avatar
    },
    data() {
        return {
            boardMenuTitle: 'Menu',
            headerTitle: '',
            onActivityShow: false,
            headerIndex: 0,
            photosFilterBy: 'Mountains',
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
        this.searchImgs()
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
        },
        activityDate(createdAt) {
            return moment(createdAt).fromNow()
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
        isActivityShowing() {
            if (!this.onActivityShow) return "Show"
            else return "Hide"
        }

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
 
 .activities-title {
     display: flex;
     flex-direction: row;
 }
 
 .sb-act img {
 
     align-self: center
 }
 
 .sb-act div {
     justify-self: center;
     align-self: start;
     font-size: 14px;
     font-weight: 700;
 }
 
 .sb-act span {
     font-size: 14px;
     font-weight: 400;
 }
 
 .activity-show-btn {
     /* justify-self: flex-end; */
     align-self: center;
     justify-self: flex-end;
     background-color: rgb(129 129 129 / 19%);
     align-self: center;
     display: flex;
     align-items: center;
     border-radius: 3px;
     margin-left: 131px;
     justify-content: center;
     cursor: pointer;
     width: 50px;
     height: 30px;
     user-select: none;
 
 }
 </style>
