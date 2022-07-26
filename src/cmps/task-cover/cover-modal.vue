<template>
    <section @click.stop="" class="cover-modal">
        <div class="modal-layout">
            <header>
                <span>
                    Cover
                </span>
                <span @click="closeCoverModal" class="close-btn"></span>
            </header>
            <div class="cover-modal-main">
                <button v-if="task.cover" @click="removeCover" class="cover-rmv-btn">Remove cover</button>
                <p>Colors</p>
                <div class="colors-container">
                    <button v-for="color in colors" :style="{ backgroundColor: color }" 
                    @click="setCoverClr(color)">
                    </button>
                </div>
                <p>Photos</p>
                <input name='imgSearch' type="text" @input.prevent="searchImgs" v-model="photosFilterBy" placeholder="Photos" />
                <div v-if="photos" class="imgs-container">
                    <div v-for="photo in photos" :style="{ backgroundImage: `url(${photo})` }"
                    @click="setCoverImg(photo)">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
 <script>
import { utilService } from '../../services/util.service';
import { unsplashService } from '../../services/unsplash.service';

export default {
    name: 'cover-modal',
    components: {},
    data() {
        return {
            colors: ['#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
                '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#172B4D'],
            photos: null,
            photosFilterBy: 'Photos'
        };
    },
    created() {
        this.bounce = utilService.debounce(this.getPhotos)
        this.getPhotos()
    },
    props:{
        task:Object
    },
    emits: ['closeCoverModal','setTaskCover','removeCover'],
    methods: {
        setCoverClr(clr) {
            const cover = {
                img:null,
                color:clr
            }
            this.$emit('setTaskCover',cover)
        },
        setCoverImg(url){
            const cover = {
                img:url,
                color:'#7BC86C'
            }
            this.$emit('setTaskCover',cover)
        },
        removeCover(){
            this.$emit('removeCover')
        },
        closeCoverModal() {
            this.$emit('closeCoverModal')
        },
        searchImgs() {
            this.bounce()
        },
        async getPhotos() {
            try {
                let photos = await unsplashService.query(this.photosFilterBy)
                photos = photos.splice(0,9)
                this.photos = photos.map(photo => photo.urls.regular)
                console.log(photos)
            } catch (error) {
                console.log(error);
            }

        },
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>