<template>
    <section class="task-prev-container">
        <div v-if="task.cover" :style="taskPrevCover" class="task-prev-cover"></div>
        <div v-if="task.labelIds" class="task-label-container" @click.stop="toggleLabelsExtended">

            <div v-for="label in task.labelIds" :key="label" class="task-label" :class="labelsExtended ? 'ext' : ''"
                :style="{ background: label.color }">
                <span v-if="labelsExtended">{{ label.title }}</span>
            </div>
        </div>
        <div @contextmenu.stop.prevent="currTask.isEdited = !currTask.isEdited" v-if="!currTask.isEdited"
            class="task-prev">{{
                    task.title
            }}</div>
        <form @click.stop.prevent @keyup.enter.stop.prevent="onTitleChange($event), enterForTask($event)"
            v-if="currTask.isEdited" action="">
            <!-- <input type="text" v-model="task.title" placeholder="Task name"> -->
            <textarea ref="taskTitle" @click.stop.prevent="focusOnTitle"
                v-click-outside="() => { currTask.isEdited = false }" type="text" v-model="currTask.title"
                :placeholder="currTask.title" dir="auto" placeholder="Enter a title for this card…"
                style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 54px;"></textarea>
        </form>
        <div class="task-prev-details"
            v-if="task.description || task.comments?.length || task.checklists?.length || task.attachments?.length">

            <!-- <div v-if="????isUserWatchThisTask????"><span class="icon-subscribe"></span></div> -->

            <div v-if="task.description" class="task-prev-description"><span class="icon-description"></span></div>

            <div v-if="task.comments" class="task-prev-comments"><span class="icon-comment"></span>
                <span class="task-prev-comments-txt">{{ task.comments.length }}</span>
            </div>
            <div v-if="task.attachments?.length" class="task-prev-attachments"><span class="icon-attachment"></span>
                <span class="icon-attachment-txt">{{ task.attachments.length }}</span>
            </div>

            <div class="task-prev-checklist" v-if="task.checklists?.length"><span class="icon-list"></span>
                <span class="task-prev-checklist-txt">{{ checkListDone
                }}/{{ checkListTotal }}</span>
            </div>


        </div>
        <div class="task-members-container" :class="pos" :style="posPad" v-if="task.memberIds">
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
        },
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

            let copy = JSON.parse(JSON.stringify(this.task))
            copy.title = this.currTask.title
            this.currTask.isEdited = !this.currTask.isEdited;
            this.$emit('saveTask', copy)

        },
        focusOnTitle() {
            this.$refs.taskTitle.focus()
        },
        enterForTask() {
            if (this.isEdited) return
            this.$emit('enterClicked')
        },
        toggleLabelsExtended() {
            this.$store.dispatch({ type: 'toggleLabelsExtended' })
        }
    },
    computed: {
        checkListDone() {
            return this.task.checklists.reduce((acc, checklist) => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) acc++
                });
                return acc;
            }, 0)
        },
        checkListTotal() {
            return this.task.checklists?.reduce((acc, checklist) => {
                acc += checklist.todos.length
                return acc;
            }, 0)
        },
        bgc() {
            return "#61bd4f"
            return this.task.labelIds[0]
        },
        pos() {
            if (!this.task.checklists?.length && !this.task.comments?.length && !this.task.description && !this.task.attachments?.length) return "relative"
            if (this.task.checklists || this.task.comments || this.task.description || this.task.attachments) {
                if (this.task.memberIds.length > 3) return "relative"
                return "absolute"
            }
            else return "relative"
        },
        posPad() {
            if (!this.task.checklists && !this.task.comments && !this.task.description && !this.task.attachments) return { marginTop: "5px" }

        },
        taskPrevCover() {
            if (this.task.cover.img) {
                return {
                    backgroundColor: this.task.cover.color,
                    backgroundImage: `url(${this.task.cover.img})`,
                    'min-height': '144.5px'
                }
            } else {
                return {
                    backgroundColor: this.task.cover.color
                }
            }
        },
        labelsExtended() {
            const user = this.$store.getters.currUser
            return user.labelsExtended
        }
    },
    unmounted() { },
}
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