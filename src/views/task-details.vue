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

                                <div v-for="label in task.labelIds" :key="label" class="task-label-label"
                                    :style="{ background: label }">
                                </div>
                            </div>

                            <div @click="labelModel = !labelModel" class="details-lebel-add-btn">+</div>
                            <div v-if="labelModel">
                                {{ currBoard.labels.length }}
                            </div>
                        </div>
                    </div>
                    <div class="window-modal-content">
                        <div class="window-modal-title">
                            <h3>Description</h3>
                        </div>
                        <p class="window-modal-warn">You have unsaved edits on this field. </p>
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
        };
    },
    async created() {
        const { boardId, groupId, taskId } = this.$route.params
        try {
            const task = await boardService.getTaskById(boardId, groupId, taskId)
            this.task = task
        } catch (e) {
            console.log(e);
        }

    },
    methods: {},
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        }
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
 
 .task-label-label {
     border-radius: 4px;
     width: 64px;
     height: 32px;
 }
 </style>