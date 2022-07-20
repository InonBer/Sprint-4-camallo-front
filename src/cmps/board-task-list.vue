<template>
    <div v-for="task in tasks">

        <boardTaskPrev @click="$router.push(`/task/${task.id}`)" :task="task" :key="task.id" />
    </div>
    <button @click="onAddTask" class="add-btn">+ Add a card</button>
</template>
 <script>
import boardTaskPrev from './board-task-prev.vue';
import { boardService } from '../services/board.service';
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
    methods: {
        onAddTask() {
            const task = boardService.getEmptyTask()
            this.tasks.push(JSON.parse(JSON.stringify(task)))

        }

    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>


