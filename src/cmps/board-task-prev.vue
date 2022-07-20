<template>
    <section class="task-prev-container">
        <div v-if="task.labelIds">{{ task.labelIds.length }}</div>
        <div class="task-prev">{{ task.title }}</div>
        <div class="task-prev-details">
            <div class="task-prev-checklist" v-if="task.checklists">{{ checkListDone }}/{{ task.checklists.length }}
            </div>
            <div v-if="task.comments" class="task-prev-comments">{{ task.comments.length }}</div>
            <div v-if="task.description" class="task-prev-description">D</div>
        </div>
        <h2 class="task-pen-icon">pen</h2>
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
    computed: {
        checkListDone() {
            return this.task.checklists.reduce((acc, task) => {
                if (task.isDone) acc++
                return acc;
            }, 0)
        }
    },
    unmounted() { },
};
</script>
 <style>
 .task-prev-container:hover {
     background-color: #091e4214;
 }
 
 .task-prev {
     justify-self: flex-start;
     align-self: flex-start;
 }
 
 .task-prev-details {
     display: flex;
     flex-direction: row;
     justify-self: flex-start;
     align-self: center;
 
 }
 </style>