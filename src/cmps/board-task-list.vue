<template>
    <div v-for="task in tasks">

        <boardTaskPrev @click="onDetails(task.id)" :task="task" :key="task.id" />
    </div>
    <button @click="onAddTask" class="add-btn"><span class="icon-plus"></span> Add a card</button>
</template>
 <script>
import boardTaskPrev from './board-task-prev.vue';
import { boardService } from '../services/board.service';
export default {
    emits: ['onDetails'],
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
    methods: {
        onAddTask() {
            const task = boardService.getEmptyTask()
            this.tasks.push(JSON.parse(JSON.stringify(task)))
            this.$emit('taskAdded')

        },
        onDetails(id) {
            this.$emit('onDetails', id)
        }

    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>


