<template>
    <section class="task-prev-container">
        <div class="task-prev">{{ task.title }}</div>

    </section>
</template>
 <script>
export default {
    props: {
        task: {
            type: Object
        }
    },
    name: 'TaskPrev',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>