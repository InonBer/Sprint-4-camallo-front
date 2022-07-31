<template>
    <section class="task-prev-container">
        <div v-if="task.cover" :style="taskPrevCover" class="task-prev-cover"></div>
        <div v-if="task.labelIds?.length" class="task-label-container" @click.stop="toggleLabelsExtended">

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
            v-if="task.description || task.comments?.length || task.checklists?.length || task.attachments?.length || task.dueDate">

            <!-- <div v-if="????isUserWatchThisTask????"><span class="icon-subscribe"></span></div> -->
            <div v-if="task.dueDate" class="task-prev-due-date"
                :style="dueDate.clr ? { backgroundColor: dueDate.clr } : { color: '#5e6c84' }">

                <div class="due-date-switch">
                    <input @click.stop="toggleDueDateDone" name="prev-date-chkbx" type="checkbox"
                        :checked="task.dueDate.isDone" />
                    <svg class="due-date-svg" width="16" height="16" role="presentation" focusable="false"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                            :fill="dueDate.clr ? '#ffffff' : '#5e6c84'"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                            :fill="dueDate.clr ? '#ffffff' : '#5e6c84'"></path>
                    </svg>
                </div>
                {{ dueDate.dateStr }}
            </div>

            <div v-if="task.description" class="task-prev-description"><span class="icon-description"></span></div>

            <div v-if="task.comments" class="task-prev-comments"><span class="icon-comment"></span>
                <span class="task-prev-comments-txt">{{ task.comments.length }}</span>
            </div>
            <div v-if="task.attachments?.length" class="task-prev-attachments"><span class="icon-attachment"></span>
                <span class="icon-attachment-txt">{{ task.attachments.length }}</span>
            </div>

            <div class="task-prev-checklist" :class="checkListDone === checkListTotal ? 'chcklist-done' : ''"
                v-if="task.checklists?.length"><span class="icon-list"></span>
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
import moment from 'moment';

export default {
    emits: ['onBoardChange'],
    props: {
        task: {
            type: Object
        },
    },
    name: 'TaskPrev',
    components: {},
    emits: ['saveTask'],
    data() {
        return {
            titleName: '',
            isEdited: true,
            currTask: null,
            dateInterval: null
        };
    },
    created() {
        this.currTask = JSON.parse(JSON.stringify(this.task))
    },
    mounted() {
        if (this.task.dueDate) {
            this.dateInterval = setInterval(() => {
                this.dueDateUpdate(JSON.parse(JSON.stringify(this.task)))
            }, 1000 * 60 * 5)
        }
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
        },
        toggleDueDateDone() {
            let copy = JSON.parse(JSON.stringify(this.task))
            copy.dueDate.isDone = !copy.dueDate.isDone
            this.dueDateUpdate(copy)
        },
        dueDateUpdate(task) {
            const due = task.dueDate.date
            const dueDateObj = task.dueDate

            const dueDay = new Date(due).getDate()
            const dueMonth = new Date(due).getMonth()
            const currDay = new Date().getDate()
            const currMonth = new Date().getMonth()

            if (dueMonth === currMonth && dueDay === currDay || dueDay === currDay + 1 || dueDay === currDay - 1) {
                dueDateObj.dateStr = moment(due).calendar(null, {
                    sameDay: `[today] h:mm A`,
                    nextDay: '[tomorrow] h:mm A',
                    lastDay: '[yesterday] h:mm A',
                })
            } else {
                let str = moment(due).format("MMM D") + ' at '
                str += moment(due).format("h:mm A")
                dueDateObj.dateStr = str
            }

            if (new Date(due).getTime() < Date.now()) {
                dueDateObj.status = 'overdue'
                dueDateObj.clr = '#EB5A46'
            } else if (dueDay === currDay) {
                dueDateObj.status = 'due soon'
                dueDateObj.clr = '#F2D600'
            }
            if (task.dueDate.isDone) {
                dueDateObj.status = 'complete'
                dueDateObj.clr = '#61BD4F'
            }

            task.dueDate = dueDateObj
            console.log('task', task);
            this.$emit('saveTask', task)
        },
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
        pos() {
            if (!this.task.checklists?.length && !this.task.comments?.length && !this.task.description && !this.task.attachments?.length && !this.task.dueDate) return "relative"
            if (this.task.checklists || this.task.comments || this.task.description || this.task.attachments || this.task.dueDate) {
                if (this.task.memberIds.length > 3) return "relative"
                return "absolute"
            }
            else return "relative"
        },
        posPad() {
            if (!this.task.checklists && !this.task.comments && !this.task.description && !this.task.attachments && !this.task.dueDate) return { marginTop: "5px" }

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
            return user?.labelsExtended
        },
        dueDate() {
            const dateStr = moment(this.task.dueDate.date).format("MMM D")
            const clr = this.task.dueDate.clr
            return { dateStr, clr }
        }
    },
    unmounted() {
        if (this.dateInterval) {
            clearInterval(this.dateInterval)
        }
    },
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