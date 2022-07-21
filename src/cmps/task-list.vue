<template>
    <div v-for="task in tasks">

        <task-prev @onBoardChange="onBoardChange" @emptyTitle="emptyTitle" @click="onDetails(task.id)" :task="task"
            :key="task.id" />
    </div>
    <!-- <button @click="onAddTask" class="add-btn"><span class="icon-plus"></span> Add a card</button> -->
</template>
 <script>
import taskPrev from './task-prev.vue';
import { boardService } from '../services/board.service';
export default {
    emits: ['onDetails', 'taskAdded', 'onBoardChange'],
    props: {
        tasks: {
            type: Array
        }
    },
    name: 'TaskList',
    components: {
        taskPrev
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        // onAddTask(ev) {
        //     console.log(ev);
        //     const task = boardService.getEmptyTask()
        //     this.tasks.push(JSON.parse(JSON.stringify(task)))
        //     this.$emit('taskAdded')

        // },
        onDetails(id) {
            this.$emit('onDetails', id)
        },
        emptyTitle() {
            this.tasks.pop()
            console.log('removing task');
            this.$emit('taskAdded')

        },
        onBoardChange() {
            this.$emit('onBoardChange')
        }

    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>


