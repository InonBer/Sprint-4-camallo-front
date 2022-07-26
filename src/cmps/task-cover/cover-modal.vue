<template>
    <section @click.stop="" class="cover-modal">
        <div class="modal-layout">
            <header>
                <span>
                    Cover
                </span>
                <span class="close-btn"></span>
            </header>
            <div class="cover-modal-main">
                <p>Colors</p>
                <div class="cubes-container">
                    <button v-for="color in colors" :style={backgroundColor:color} 
                    @click="setCoverClr(color)"></button>
                </div>
                <p>Photos</p>
            </div>
        </div>
    </section>
</template>
 <script>
export default {
    name: 'cover-modal',
    components: {},
    data() {
        return {
            colors: ['#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
                '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#172B4D']
        };
    },
    created() { },
    emits: ['closeCoverModal'],
    methods: {
        setCoverClr(clr) {
            console.log(clr)
        },
        closeCoverModal() {
            this.$emit('closeCoverModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>