<template>
    <div class="window-overlay">
        <section class="task-details">
            <h1>hello</h1>
            <button @click="$router.go(-1)">X</button>
        </section>
    </div>
</template>
 <script>
export default {
    props: {
        group: {
            type: Object
        }
    },
    name: 'taskDetails',
    components: {},
    data() {
        return {};
    },
    created() {
        const { id } = this.$route.params
        console.log('Group', this.group);

    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 .window-overlay {
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
     width: 100%;
     height: 100%;
     background-color: #000000a3;
     z-index: 20;
 }
 
 .task-details {
     background-color: #f4f5f7;
     width: 25%;
     height: 25%;
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
 
 }
 </style>