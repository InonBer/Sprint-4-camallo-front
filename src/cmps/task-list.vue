<template>
    <!-- <div v-for="task in tasks"> -->
    <Container class="tasks-container" orientation="vertical" v-if="tasks" :get-child-payload="getChildPayload"
        group-name="col-items" @drop="onDrop($event)">
        <Draggable @mousedown.prevent class="task-preview" v-if="tasks" v-for="task in tasks" :key="task.id"
            :groupId="groupId">
            <task-prev @onBoardChange="onBoardChange" @onTitleChange="onTitleChange" @emptyTitle="emptyTitle"
                @click="onDetails(task.id)" :task="task" />
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
    emits: ['onDetails', 'taskAdded', 'onBoardChange', 'onTaskMode'],
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
            items = applyDrag(items, dropRes)
            this.$emit('onTaskMode', items)
        },
        onTitleChange(task) {
            const copy = JSON.parse(JSON.stringify(this.items))
            const itemsCopy = copy.map(item => {
                if (item.id === task.id) item = task
                return item
            })
            this.$emit('onTaskMode', itemsCopy)


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
        }

    },
    computed: {},
    unmounted() { },


};
</script>
 <style>
 .smooth-dnd-container {
     display: flex;
     flex-direction: column;
     gap: 8px;
     min-height: 2px;
 }
 </style>


