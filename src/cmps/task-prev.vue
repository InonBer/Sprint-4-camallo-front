<template>
    <section class="task-prev-container">
        <div v-if="task.labelIds" class="task-label-container">

            <div v-for="label in task.labelIds" :key="label" class="task-label" :style="{ background: label }">
                <span></span>
            </div>
        </div>
        <div @click.stop.prevent v-if="!task.isEdited" class="task-prev">{{ task.title }}</div>
        <form @click.stop.prevent @keyup.enter.stop.prevent="onTitleChange($event)" v-if="task.isEdited" action="">
            <!-- <input type="text" v-model="task.title" placeholder="Task name"> -->
            <textarea type="text" v-model="titleName" :placeholder="task.title" dir="auto"
                placeholder="Enter a title for this card…"
                style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 54px;"></textarea>
        </form>
        <div class="task-prev-details" v-if="task.description || task.comments || task.checklists">

            <!-- <div v-if="????isUserWatchThisTask????"><span class="icon-subscribe"></span></div> -->

            <div v-if="task.description" class="task-prev-description"><span class="icon-description"></span></div>

            <div v-if="task.comments" class="task-prev-comments"><span class="icon-comment"></span>{{
                    task.comments.length
            }}
            </div>

            <div class="task-prev-checklist" v-if="task.checklists"><span class="icon-list"></span>{{ checkListDone
            }}/{{ task.checklists.length }}
            </div>

        </div>
        <div class="task-members-container" v-if="task.memberIds">
            <img class="task-member-img" :src="task.byMember.imgUrl" alt="">
        </div>
        <h2 class="task-pen-icon">pen</h2>
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
            titleName: ''
        };
    },
    created() { },
    methods: {
        onTitleChange(ev) {
            const copy = JSON.parse(JSON.stringify(this.titleName))
            this.task.title = copy
            this.task.isEdited = !this.task.isEdited;
            console.log(this.task.title.length);
            if (this.task.title.length <= 1) {
                console.log('im here')
                this.$emit('emptyTitle')
            } else {
                this.$emit('onBoardChange')

            }

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
 .task-members-container {
     position: absolute;
     bottom: 0;
     /* height: 100%; */
     display: flex;
     flex-direction: row;
     align-items: flex-end;
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
 </style>