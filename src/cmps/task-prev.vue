<template>
    <section class="task-prev-container">
        <div v-if="currTask.labelIds" class="task-label-container">

            <div v-for="label in task.labelIds" :key="label" class="task-label" :style="{ background: label }">
                <span></span>
            </div>
        </div>
        <div @contextmenu.stop.prevent="currTask.isEdited = !currTask.isEdited" v-if="!currTask.isEdited"
            class="task-prev">{{
                    currTask.title
            }}</div>
        <form @click.stop.prevent @keyup.enter.stop.prevent="onTitleChange($event), enterForTask($event)"
            v-if="currTask.isEdited" action="">
            <!-- <input type="text" v-model="task.title" placeholder="Task name"> -->
            <textarea ref="taskTitle" @click.stop.prevent="focusOnTitle" type="text" v-model="currTask.title"
                :placeholder="currTask.title" dir="auto" placeholder="Enter a title for this card…"
                style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 54px;"></textarea>
        </form>
        <div class="task-prev-details" v-if="currTask.description || currTask.comments || currTask.checklists">

            <!-- <div v-if="????isUserWatchThisTask????"><span class="icon-subscribe"></span></div> -->

            <div v-if="currTask.description" class="task-prev-description"><span class="icon-description"></span></div>

            <div v-if="currTask.comments" class="task-prev-comments"><span class="icon-comment"></span>
                <span class="task-prev-comments-txt">{{ task.comments.length }}</span>
            </div>
            <div v-if="currTask.attachments" class="task-prev-attachments"><span class="icon-attachment"></span>{{
                    task.attachments.length
            }}
            </div>

            <div class="task-prev-checklist" v-if="currTask.checklists"><span class="icon-list"></span>
                <span class="task-prev-checklist-txt">{{ checkListDone
                }}/{{ checkListTotal }}</span>
            </div>


        </div>
        <div class="task-members-container" :class="pos" v-if="currTask.memberIds">
            <img v-for="member in task.memberIds" class="task-member-img" :key="member._id" :title="member.fullname"
                :src="member.imgUrl" alt="">
        </div>
    </section>

</template>
 <script>
export default {
    emits: ['onBoardChange'],
    props: {
        task: {
            type: Object
        }
    },
    name: 'TaskPrev',
    components: {},
    data() {
        return {
            titleName: '',
            isEdited: true,
            currTask: null,

        };
    },
    created() {
        this.currTask = JSON.parse(JSON.stringify(this.task))
    },
    methods: {
        onTitleChange(ev) {
            this.currTask.isEdited = !this.currTask.isEdited;
            this.$emit('saveTask', this.currTask)

        },
        focusOnTitle() {
            this.$refs.taskTitle.focus()
        },
        enterForTask() {
            if (this.isEdited) return
            this.$emit('enterClicked')
        }
    },
    computed: {
        checkListDone() {
            return this.currTask.checklists.reduce((acc, checklist) => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) acc++
                });
                return acc;
            }, 0)
        },
        checkListTotal() {
            return this.currTask.checklists.reduce((acc, checklist) => {
                acc += checklist.todos.length
                return acc;
            }, 0)
        },
        bgc() {
            console.log(this.currTask.labelIds[0]);
            return "#61bd4f"
            return this.task.labelIds[0]
        },
        removeTask() {
            console.log('wasda');
        },
        pos() {
            if (this.task.checklists || this.task.comments || this.task.description) {
                if (this.task.memberIds.length > 3) return "relative"
                return "absolute"
            }
            else return "relative"
        },

    },
    unmounted() { },
};
</script>
 <style>
 .task-members-container {
     bottom: 0;
     /* height: 100%; */
     display: flex;
     flex-direction: row;
     align-items: flex-end;
     padding-top: 2px;
     /* padding-top: 10px; */
     /* margin-bottom: 10px; */
 }
 
 .task-member-img {
     width: 28px;
     height: 28px;
     /* padding-bottom: 10px; */
     margin-bottom: 5.2px;
     border-radius: 50%;
 }
 
 .task-prev-container textarea {
     border: none
 }
 </style>