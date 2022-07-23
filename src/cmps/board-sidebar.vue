<template>
    <section class="sidebar">
        <header>
            <span class="close-btn" @click="onCloseNav">×</span>
            <h3 class="board-menu-header-title js-board-menu-title-text">{{ boardMenuTitle }}</h3>
        </header>
        <hr class="board-menu-header-divider">

        <div class="content-wrapper">
            <section v-if="headerTitle === ''" class="content-to-show">


                <div class="sidebar-btn-container">
                    <a class="board-menu-navigation-item-link" @click="onChangeBackground"> Change background</a>

                </div>
                <hr class="board-menu-header-divider">

                <div class="sidebar-activities">
                    <div class="activities-title">
                        <p><span class="icon-activity"></span> Activities</p>
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
                        <input type="text" @input.prevent="getPhotos" v-model="photosFilterBy" placeholder="Photos">
                        <!-- <input type="text" placeholder="Photos" @input="getPhotos"> -->
                        <span class="icon-search"></span>
                    </div>
                    <div v-if="photos" class="board-backgrounds-list">
                        <ul v-for="photo in photos" key="photo">
                            <pre>{{ photo }}</pre>
                            <!-- <li class="photo" :style="{ backgroundImage: `url${photo}` }"></li> -->
                        </ul>
                    </div>
                    <div class="board-backgrounds-photos-footer"></div>
                    <div class="unsplash-disclaimer">
                        By using images from Unsplash, you agree to their
                        <a href="http://unsplash.com/license" target="_blank" rel="noopener noreferrer"></a>
                        and
                        <a href="http://unsplash.com/terms" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
            </section>
            <section v-else-if="headerTitle === 'Color'" class="change-background">


            </section>
        </div>

    </section>
</template>
 <script>
import { unsplashService } from '../services/unsplash.service'
export default {
    name: 'board-sidebar',

    components: {},
    data() {
        return {
            boardMenuTitle: 'Menu',
            headerTitle: '',
            headerIndex: 0,
            photosFilterBy: 'london',
            photos: null,
        };
    },
    created() {
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
        async getPhotos() {
            console.log('this.photosFilterBy', this.photosFilterBy)

            try {
                const photos = await unsplashService.query(this.photosFilterBy)
                this.photos = photos.map(photo => photo.urls.regular)
            } catch (error) {

            }

        }
    },
    computed: {
        photosFilterBy(d) {

            console.log('d', d)

        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>
