<template>
    <div v-if="board" class="window-overlay">
        <section class="task-details">
            <div class="task-details-header">
                <div class="task-details-title"><span class="icon-card-detail"></span>{{ task.title }}</div>
            </div>
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

                                <div class="label-modal-label" v-for="label in board.labels"
                                    @click="addLabel(label.color)" :style="{ background: label.color }"> <span> {{
                                            label.title
                                    }}</span></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="window-modal-content">
                    <div class="window-modal-title">
                        <span class="icon-description"></span>
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

                            <h3><span class="icon-activity"></span>Activity</h3>
                            <button>Show Details</button>
                        </div>
                    </div>
                    <div class="text-container-details">
                        <p>user img</p>
                        <textarea class="details-textarea" name="activity" id="activity" cols="85" rows="2"></textarea>
                    </div>
                </div>
            </div>
            <div class="side-bar-details">
                <div class="details-btn-container">
                    <p>Add to card</p>
                    <button><span class="icon-member"></span> Members</button>
                    <button><span class="icon-label"></span> Labels</button>
                    <button><span class="icon-checklist"></span> Checklist</button>
                    <button><span class="icon-date"></span> Dates</button>
                    <button><span class="icon-attachment"></span> Attachment</button>
                    <button><span class="icon-card-cover"></span> Cover</button>
                    <button><span class="icon-custom-field"></span> Custom Fields</button>
                </div>
            </div>


            <!-- 
            <pre v-if="task">
                {{ task }}
            </pre> -->
            <!-- <button @click="$router.go(-1)">X</button> -->
            <button class="details-exit-btn" @click="$router.push('/board/' + $route.params.boardId)"><span
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
            group: null,
        }
    },
    async created() {
        const { boardId, groupId, taskId } = this.$route.params
        try {
            this.board = await boardService.getById(boardId)
            const groupIdx = this.board.groups.findIndex(group => group.id === groupId)
            this.group = this.board.groups[groupIdx]
            const taskIdx = this.group.tasks.findIndex(task => task.id === taskId)
            this.task = this.group.tasks[taskIdx]
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        saveBoard() {
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
        },
        addLabel(color) {
            console.log('task', this.task)
            if (!this.task.labelIds) this.task.labelIds = []
            if (this.task.labelIds.includes(color)) return
            this.task.labelIds.push(color)
            this.saveBoard()
        },
        removeLabel(idx) {
            this.task.labelIds.splice(idx, 1)
            this.saveBoard()
        },
    },
    computed: {
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
 </style>