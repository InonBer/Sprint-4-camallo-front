<template>
    <div class="window-overlay">
    </div>
    <section v-if="board" class="task-details">
        <div class="task-details-header">
            <span class="icon-card-detail"></span>
            {{ task.title }}
            <div class="task-details-ingroup">in list
                <span class="group-title">{{ group.title }}</span>
            </div>
        </div>
        <div class="details-window-main">


            <div class="details-mem">
                <div class="details-mem-img-cont">
                    <h2 class="details-member-header">Members</h2>
                    <div class="img-cont-mm">

                        <img class="userImg" v-for="member in task.memberIds" :key="member._id" :title="member.fullname"
                            :src="member.imgUrl" alt="">
                    </div>
                </div>

                <div class="details-labels-container">
                    <template v-if="task.labelIds?.length">
                        <span class="details-labels-title">Labels</span>
                        <div v-if="task.labelIds" class="task-label-container">
                            <div @click="removeLabel(idx)" v-for="(label, idx) in task.labelIds" :key="label"
                                class="task-label-label" :style="{ background: label }">
                            </div>
                            <div @click="labelModel = !labelModel" class="details-label-add-btn">+</div>
                        </div>
                    </template>
                    <div class="details-label-to-add-container" v-if="labelModel">
                        <h2 class="details-label-header">Labels</h2>
                        <hr>
                        <h2 class="nd-label-header" style="">labels</h2>
                        <hr>

                        <div class="details-labels-adding-container">
                            <div class="label-modal-label" v-for="label in board.labels" @click="addLabel(label.color)"
                                :style="{ background: label.color }">
                                <span> {{ label.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="window-modal-content">
                <div class="window-modal-title">
                    <span class="icon-description"></span>
                    <h3 class="description-title">Description</h3>
                </div>
                <p @click="isDescEdited = !isDescEdited" class="task-description"
                    v-if="task.description && isDescEdited">{{
                            task.description
                    }}</p>
                <textarea @keydown.enter.prevent="saveDescription" v-if="!isDescEdited"
                    class="task-description-textarea details-clr-reg-hvr" name="description" id=""
                    v-model="task.description" placeholder="Add a more detailed description..." cols="30"
                    rows="10"></textarea>
                <!-- <p v-if="!task.description" class="window-modal-warn">You have unsaved edits on this field. </p> -->
            </div>
            <div class="window-modal-content">
                <div class="window-modal-title activity-container">
                    <div class="details-activity-title">
                        <span class="icon-activity"></span>
                        <h3 class="activity-title">Activity</h3>
                        <button class="description-toggle-btn">Show Details</button>
                    </div>
                </div>
                <div class="text-container-details">
                    <div class="chat-input-container">
                        <img class="chat-user-img"
                            src="http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            alt="" />
                        <textarea class="details-textarea" name="activity" id="activity" cols="85" rows="2"
                            placeholder="Write a comment..."></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="side-bar-details">
            <div class="details-btn-container">
                <h3 class="sidebar-heading">Add to card</h3>
                <button @click.stop.prevent="openMembersModal"><span class="icon-member icn"></span>
                    Members</button>
                <button @click="labelModel = !labelModel"><span class="icon-label icn"></span> Labels</button>
                <button><span class="icon-checklist icn"></span> Checklist</button>
                <button><span class="icon-date icn"></span> Dates</button>
                <button><span class="icon-attachment icn"></span> Attachment</button>
                <button><span class="icon-card-cover icn"></span> Cover</button>
                <button><span class="icon-custom-field icn"></span> Custom Fields</button>
                <section v-if="memebersModal" class="member-modal">
                    <div class="member-modal-header">
                        <header>Members</header>
                    </div>
                    <div class="member-modal-input">
                        <input placeholder="Search embers" type="text">

                    </div>
                    <h4>Board Members</h4>
                    <div class="board-members-details">
                        <div @click.stop.prevent="addMemberToTask(member)" v-for="member in board.members"
                            :key="member._id" class="inner-container-details">
                            <img :src="member.imgUrl" alt="">
                            <span>{{ member.fullname }} </span>
                        </div>

                    </div>
                </section>
            </div>
        </div>
        <!-- <button @click="$router.go(-1)">X</button> -->
        <button class="details-exit-btn" @click="$router.push('/board/' + currBoard._id)">
            <span class="card-details-exit-btn"></span>
        </button>
    </section>

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
             memebersModal: false,
             isDescEdited: false
         }
     },
     async created() {
         const { boardId, groupId, taskId } = this.$route.params
         try {
             this.board = await boardService.getById(boardId)
             console.log(this.board);
             const groupIdx = this.board.groups.findIndex(group => group.id === groupId)
             this.group = this.board.groups[groupIdx]
             const taskIdx = this.group.tasks.findIndex(task => task.id === taskId)
             this.task = this.group.tasks[taskIdx]
         } catch (e) {
             console.log(e);
         }
     },
     methods: {
         saveDescription() {
             console.log('yhere');
             this.isDescEdited = false
             this.saveBoard()
         },
         addMemberToTask(member) {
             this.task.memberIds = this.task.memberIds || []
             const isMember = this.task.memberIds.find((currMem) => currMem._id === member._id)
             if (isMember) {
                 const idx = this.task.memberIds.findIndex((curr) => {
                     return curr._id === member._id
                 })
                 this.task.memberIds.splice(idx, 1)
             } else {
                 this.task.memberIds.push(member)
             }
             this.saveBoard()
         },
         saveBoard() {
             const copy = JSON.parse(JSON.stringify(this.board))
             this.$store.dispatch({ type: 'saveBoard', board: copy })
         },
         addLabel(color) {
             console.log('task', this.task)
             if (!this.task.labelIds) this.task.labelIds = []
             if (this.task.labelIds.includes(color)) return
             this.task.labelIds.push(color)
             this.saveBoard()
         },
         openMembersModal() {
             if (this.memebersModal) {
                 this.memebersModal = false
             } else {
                 this.closeAll()
                 this.memebersModal = true
             }
         },
         removeLabel(idx) {
             this.task.labelIds.splice(idx, 1)
             this.saveBoard()
         },
         closeAll() {
             this.labelModel = false
             this.memebersModal = false
         },
     },
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
