<template>
    <div v-for="task in tasks">

        <boardTaskPrev :task="task" :key="task.id" />
    </div>
    <button class="add-btn">+ Add Cast</button>
</template>
 <script>
import boardTaskPrev from './board-task-prev.vue';
export default {
    props: {
        tasks: {
            type: Array
        }
    },
    name: 'TaskList',
    components: {
        boardTaskPrev
    },
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