<template>
    <div v-if="task" class="window-overlay">
        <section class="task-details">
            <div class="task-details-header">
                <div class="task-details-title">{{ task.title }}</div>
                <div class="task-details-ingroup">in list <span class="grouptitle">group.title</span>
                </div>
                <div class="details-window-main">
                    <div class="details-mem">
                        <div class="details-member-list">
                            <p>nember 1</p>
                            <p>member 2</p>
                            <p>member 2</p>
                        </div>
                        <div class="details-labels-container">
                            <h3 class="details-label-header">Labels</h3>
                            <div v-if="task.labelIds" class="task-label-container">

                                <div @click="removeLabel(idx)" v-for="(label, idx) in task.labelIds" :key="label"
                                    class="task-label-label" :style="{ background: label }">
                                </div>
                            </div>

                            <div @click="labelModel = !labelModel" class="details-lebel-add-btn">+</div>
                            <div class="details-label-to-add-container" v-if="labelModel">
                                <h2 class="details-label-header">Labels</h2>
                                <hr>
                                <h2 class="nd-label-header" style="">labels</h2>
                                <hr>
                                <div class="details-labels-adding-container">

                                    <div class="label-modal-label" v-for="label in currBoard.labels"
                                        @click="addLabel(label.color)" :style="{ background: label.color }"> <span> {{
                                                label.title
                                        }}</span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="window-modal-content">
                        <div class="window-modal-title">
                            <h3>Description</h3>
                        </div>
                        <p class="task-description" v-if="task.description">{{ task.description }}</p>
                        <textarea class="task-description-textarea" name="description" id="" v-model="task.description"
                            cols="30" rows="10"></textarea>
                        <p v-if="!task.description" class="window-modal-warn">You have unsaved edits on this field. </p>
                    </div>
                    <div class="window-modal-content">
                        <div class="window-modal-title">
                            <div class="details-activity-title">
                                <h3>Activity</h3>
                                <button>Show Details</button>
                            </div>
                        </div>
                        <div class="text-container-details">
                            <p>user img</p>
                            <textarea class="details-textarea" name="activity" id="activity" cols="85"
                                rows="2"></textarea>
                        </div>
                    </div>

                </div>
                <div class="side-bar-details">
                    <div class="details-btn-container">
                        <p>Add to card</p>
                        <button>Members</button>
                        <button>Labels</button>
                        <button>Checklist</button>
                        <button>Dates</button>
                        <button>Attachment</button>
                        <button>Cover</button>
                        <button>Custom Fields</button>
                    </div>
                </div>

            </div>
            <!-- 
            <pre v-if="task">
                {{ task }}
            </pre> -->
            <!-- <button @click="$router.go(-1)">X</button> -->
            <button class="details-exit-btn" @click="$router.push('/board/' + route.params.boardId)"><span
                    class=" card-details-exit-btn icons"></span></button>
        </section>
    </div>
</template>
 <script>
import { handleError } from 'vue';
import { boardService } from '../services/board.service';

export default {
    props: {

    },
    name: 'taskDetails',
    components: {},
    data() {
        return {
            labelModel: false,
            task: null,
            board: null,
            group: null
        };
    },
    async created() {
        const { boardId, groupId, taskId } = this.$route.params
        try {
            const task = await boardService.getTaskById(boardId, groupId, taskId)
            this.task = task
            // this.board = JSON.parse(JSON.stringify(this.$store.getters.getCurrBoard))
            // const idx = this.board.groups.findIndex(group => group.id === groupId)
            // this.group = this.board.groups[idx]
        } catch (e) {
            console.log(e);
        }

    },
    methods: {
        async saveBoard(task) {


        },
        addLabel(color) {
            if (this.task.labelIds.includes(color)) return
            this.task.labelIds.push(color)
            const copy = JSON.parse(JSON.stringify(this.task))
            const { boardId, groupId } = this.$route.params
        },
        removeLabel(idx) {
            this.task.labelIds.splice(idx, 1)
            // console.log(idx);
        },
        onSendToSave(task) {
            const { boardId, groupId } = this.$route.params
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },

    },
    unmounted() { },
    watch: {
        '$route.params.id': {
            handler(id) {
                console.log(id);
            }
        }
    }
};
</script>
 <style>
 .task-prev-container:hover {
     background-color: #091e4214;
 }
 
 .task-description {
     padding-left: 60px
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
 
 .task-description-textarea {
     margin-left: 60px;
 }
 
 .task-label-container {
     display: flex;
     flex-direction: row;
     gap: 4px;
 }
 
 .task-label-label {
     border-radius: 4px;
     width: 64px;
     height: 32px;
 }
 
 .details-label-to-add-container {
     /* left: 693.188px; */
     left: 160px;
     top: 160px;
     background: #fff;
     border-radius: 3px;
     box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
     overflow: hidden;
     position: absolute;
     height: 350px;
     /* -webkit-transform: translateZ(0); */
     width: 304px;
     z-index: 70;
 }
 
 .details-labels-adding-container {
     display: flex;
     flex-direction: column;
     gap: 4px;
     width: 100%;
 }
 
 .details-label-header {
     padding-top: 6px;
     text-align: center;
 }
 
 .label-modal-label {
     width: 90%;
     border-radius: 5px;
     margin: 0 auto;
     height: 30px;
 }
 
 .nd-label-header {
     padding-left: 10px;
     padding-bottom: 5px
 }
 
 .label-modal-label span {
     padding-left: 16px;
     line-height: 25px;
     font-weight: bold;
     color: white
 }
 
 .label-modal-label:hover {
     cursor: pointer;
 
 }
 </style>