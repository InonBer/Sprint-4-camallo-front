<template>
    <section class="task-prev-container">
        <div v-if="task.labelIds" class="task-label-container">

            <div v-for="label in task.labelIds" :key="label" class="task-label" :style="{ background: label }">
                <span></span>
            </div>
        </div>
        <div @click.stop.prevent v-if="!task.isEdited" class="task-prev">{{ task.title }}</div>
        <form @click.stop.prevent @submit="onTitleChange" v-if="task.isEdited" action="">
            <input type="text" v-model="task.title" placeholder="Task name">
        </form>
        <div class="task-prev-details">

            <!-- <div v-if="????isUserWatchThisTask????"><span class="icon-subscribe"></span></div> -->

            <div v-if="task.description" class="task-prev-description"><span class="icon-description"></span></div>

            <div v-if="task.comments" class="task-prev-comments"><span class="icon-comment"></span>{{
                    task.comments.length
            }}</div>

            <div class="task-prev-checklist" v-if="task.checklists"><span class="icon-list"></span>{{ checkListDone
            }}/{{ task.checklists.length }}
            </div>

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
        return {
        };
    },
    created() { },
    methods: {
        onTitleChange(ev) {
            console.log(ev);
            if (this.task.title.length === 0) {
                console.log('im here')
                this.$emit('emptyTitle')
            }
            this.task.isEdited = !this.task.isEdited;
        }
    },
    computed: {
        checkListDone() {
            return this.task.checklists.reduce((acc, task) => {
                if (task.isDone) acc++
                return acc;
            }, 0)
        },
        bgc() {
            console.log(this.task.labelIds[0]);
            return "#61bd4f"
            return this.task.labelIds[0]
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
 
 .task-label-container {
     display: flex;
     flex-direction: row;
     gap: 4px;
 }
 
 .task-label {
     border-radius: 4px;
     width: 40px;
     height: 8px;
 }
 </style>