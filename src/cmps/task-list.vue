<template>
    <!-- <div v-for="task in tasks"> -->
    <Container class="tasks-container" orientation="vertical" v-if="tasks" :get-child-payload="getChildPayload"
        group-name="col-items" @drop="onDrop($event), test($event)">
        <Draggable @mousedown.prevent class="task-preview" v-if="tasks" v-for="task in tasks" :key="task.id"
            :groupId="groupId">
            <task-prev @enterClicked="enterClicked" @onBoardChange="onBoardChange" @saveTask="saveTask" :key="task.id"
                @emptyTitle="emptyTitle" @click="onDetails(task.id)" :task="task" />
        </Draggable>
    </Container>
    <!-- </div> -->
    <!-- <button @click="onAddTask" class="add-btn"><span class="icon-plus"></span> Add a card</button> -->
</template>
 <script>
import taskPrev from './task-prev.vue';
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/dnd-service';
import { boardService } from '../services/board.service';
export default {
    emits: ['onDetails', 'taskAdded', 'onBoardChange', 'onTaskMove'],
    props: {
        tasks: {
            type: Array
        },
        groupId: String
    },
    name: 'TaskList',
    components: {
        taskPrev,
        Container,
        Draggable,
    },
    data() {
        return {
        };
    },
    created() {

    },
    methods: {
        onDrop(dropRes) {
            let items = JSON.parse(JSON.stringify(this.tasks))
            console.log(this.currBoard);
            items = applyDrag(items, dropRes)
            this.$emit('onTaskMove', items)
        },
        test(dropRes) {
        },
        saveTask(task) {
            this.$emit('saveTask', task)
        },
        getChildPayload(idx) {
            return this.tasks[idx]
        },

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
        },
        enterClicked() {
            this.$emit('enterClicked')
        }

    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        }
    },
    unmounted() { },


};
</script>
 <style>
 .smooth-dnd-container {
     display: flex;
     flex-direction: column;
     gap: 6px;
     min-height: 2px;
 }
 
 .tilted {
     background-color: black;
     transform: rotate(90deg);
 }
 </style>


