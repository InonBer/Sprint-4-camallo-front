<template>
    <div class="window-overlay">

        <section v-click-outside.stop.prevent="onClickOutside" v-if="board && task" class="task-details">
            <datesModal v-click-outside="closeDateModal" v-if="datesModalOpen" @onDueDateRemove="onDueDateRemove"
                @onDueDateSet="onDueDateSet" @closeDateModal="closeDateModal"></datesModal>
            <button class="details-exit-btn" @click="$router.push('/board/' + currBoard._id)">
                <span class="card-details-exit-btn"></span>
            </button>
            <cover v-if="task.cover" :taskCover="task.cover" @toggleCoverModal="coverModal = !coverModal" />
            <div class="task-details-header">
                <span class="icon-card-detail"></span>
                {{ task.title }}
                <div class="task-details-ingroup">in list
                    <span class="group-title" style="text-decoration: underline"> {{ group.title }}</span>
                </div>
            </div>
            <div class="details-window-main">
                <div class="details-mem">
                    <div v-if="task.memberIds?.length" class="details-mem-img-cont">
                        <h2 class="details-member-header">Members</h2>
                        <div class="img-cont-mm">
                            <img class="userImg" v-for="member in task.memberIds" :key="member._id"
                                :title="member.fullname" :src="member.imgUrl" alt="">
                        </div>
                    </div>
                    <div class="details-labels-container">
                        <template v-if="task.labelIds?.length">
                            <span class="details-labels-title">Labels</span>
                            <div v-if="task.labelIds" class="task-label-container">
                                <div @click="removeLabel(idx)" v-for="(label, idx) in task.labelIds" :key="label"
                                    class="task-label-label" :style="{ background: label.color }">
                                    {{ label.title }}
                                </div>
                                <div @click="labelModel = !labelModel" class="details-label-add-btn">+</div>
                            </div>
                        </template>
                        <section @click.stop="" class="labels-modal" v-if="labelModel" v-click-outside="() => {
                            labelModel = !labelModel
                            isChangeLabel = false
                        }">
                            <div class="modal-layout">
                                <header>
                                    <span v-if="!isChangeLabel"> Labels </span>
                                    <span v-else> Change labels </span>
                                    <span @click="labelModel = !labelModel; isChangeLabel = false"
                                        class="close-btn"></span>
                                </header>
                                <div v-if="!isChangeLabel" class="labels-modal-main">
                                    <div class="details-labels-adding-container">
                                        <div v-for="label, idx in board.labels" @click="addLabel(label)">
                                            <dive class="label-add-container">
                                                <div class="label-modal-label" :style="{ background: label.color }">
                                                    <span> {{ label.title }}</span>
                                                    <span class="label-include-v" v-if="task.labelIds?.includes(label)">
                                                    </span>
                                                </div>
                                                <button
                                                    @click.prevent.stop="isChangeLabel = true; currLabelIdx = idx; currLabelName = label.title"
                                                    class="edit-label-btn">
                                                    <span class="edit-label-icon"></span>
                                                </button>
                                            </dive>
                                        </div>
                                        <button @click="createNewLabel" class="add-label-btn">Create a new
                                            label</button>
                                    </div>
                                </div>
                                <div v-if="isChangeLabel" class="labels-modal-main">
                                    <span>Name</span>
                                    <div>
                                        <input type="text" v-focus name="txtLabel" style="width:100%"
                                            v-model="currLabelName">
                                    </div>
                                    <span>Select a color</span>
                                    <div class="labels-colors-warper">
                                        <div class="labels-colors-opt">
                                            <span class="label-color" v-for="color in labelColors"
                                                @click="currLabelColor = color" :style="{ backgroundColor: color }">
                                            </span>
                                        </div>
                                    </div>
                                    <div class="label-action-btn">
                                        <span class="save-label-btn" @click="saveLabel">Save</span>
                                        <span class="delete-label-btn" @click="deleteLabel">Delete</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div v-if="task.dueDate" class="due-date-container">
                        <p class="details-duedate-title">Due date</p>
                        <input @click="toggleDueDateDone" type="checkbox" :checked="task.dueDate.isDone" />
                        <div @click="datesModalOpen = !datesModalOpen" class="due-wrapper">
                            {{ task.dueDate.dateStr }}<span v-if="task.dueDate.status" class="due-status"
                                :style="{ backgroundColor: task.dueDate.clr }">{{
                                        task.dueDate.status
                                }}</span>
                        </div>
                    </div>
                </div>
                <div class="window-modal-content">
                    <div class="window-modal-title">
                        <span class="icon-description"></span>
                        <h3 class="description-title">Description</h3>
                    </div>
                    <p @click="isDescEdited = !isDescEdited" class="task-description-placeholder details-clr-reg-hvr "
                        v-if="task.description && !isDescEdited">{{
                                task.description
                        }}</p>
                    <p v-if="!task.description && !isDescEdited" @click="isDescEdited = !isDescEdited"
                        class="task-description-placeholder details-clr-reg-hvr without-text">Add a more detailed
                        description...</p>
                    <textarea ref="taskDesc" :value="task.description" @keydown.enter.stop.prevent="saveDescription"
                        @keydown.esc.stop.prevent="isDescEdited = false" v-focus v-if="isDescEdited"
                        class="task-text-area" cols="50" :placeholder="placeholder" rows="15"></textarea>
                    <button @click.stop.prevent="saveDescription" v-if="isDescEdited"
                        class="desc-save-btn">Save</button>
                    <button @click.stop.prevent="isDescEdited = false" v-if="isDescEdited"
                        class="desc-cancel-btn">Cancel</button>
                </div>
                <section v-if="task.attachments && task.attachments.length" class="attachment-container">
                    <header>
                        <span class="icon-attachment"></span>
                        <h3 class="description-title">Attachments</h3>
                    </header>
                    <div class="attachment-content-container" v-for="attachment in task.attachments">
                        <div class="attachment-content">
                            <img :src="attachment.imgUrl">
                            <div>
                                <span class="attach-title">{{ attachment.title }}</span>
                                <span>Added {{ attachmentDate(attachment.createdAt) }} - <span class="delete-btn"
                                        @click="onRemoveAttach(attachment.id)">Delete</span></span>
                                <span>
                                    <span class="icon-card-cover">
                                        <span v-if="attachment.imgUrl !== task.cover?.img" class="make-cover-BTN"
                                            @click=setCoverImg(attachment.imgUrl)>Make
                                            cover</span>
                                        <span v-else class="make-cover-BTN" @click="removeTaskCover">Remove cover</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <checklist v-for="checklist in task.checklists" :checklist="checklist" @onCheck="onCheck"
                        @onDeleteChecklist="onDeleteChecklist" />
                </section>
                <div class="window-modal-content">
                    <div class="window-modal-title activity-container">
                        <div class="details-activity-title">
                            <span class="icon-activity"></span>
                            <h3 class="activity-title">Activity</h3>
                            <button class="description-toggle-btn">Show details</button>
                        </div>
                    </div>
                    <div class="text-container-details">
                        <div class="chat-input-container">
                            <!-- <img class="chat-user-img"
                                src="http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                alt="" /> -->
                            <img v-if="currUser.img" class="chat-user-img" :src="currUser.img" alt="" srcset="">
                            <avatar v-else :username="currUser.fullname" />
                            <textarea ref="detailsComment" @keydown.enter.stop="onCommentAdd" class="details-textarea"
                                name="activity" id="activity" cols="85" rows="2"
                                placeholder="Write a comment..."></textarea>
                        </div>
                        <div class="comment-prev" style="position:relative">
                            <div v-if="task.comments" v-for="comment in task.comments">
                                <taskComments :comment="comment" />
                            </div>
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
                    <button @click="checklistModal = !checklistModal"><span class="icon-checklist icn"></span> Checklist
                        <addChklistModal v-click-outside="() => checklistModal = false" v-if="checklistModal"
                            @onAddChklist=onAddChklist @closeChklistModal="checklistModal = false" />
                    </button>
                    <button @click.stop.prevent="openDatesModal">
                        <span class="icon-date icn">
                            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                                    fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span> Dates
                    </button>

                    <button @click="openAttachmentModal">
                        <span class="icon-attachment icn">
                        </span>
                        Attachment
                    </button>
                    <button v-if="!task.cover" @click="coverModal = !coverModal"><span
                            class="icon-card-cover icn"></span>
                        Cover
                    </button>
                    <cover-modal :task="task" v-click-outside="() => coverModal = false" v-if="coverModal"
                        @closeCoverModal="coverModal = false" @setTaskCover="setTaskCover"
                        @removeCover="removeTaskCover" />

                    <!-- <button><span class="icon-custom-field icn"></span> Custom Fields</button> -->
                    <br>
                    <hr>
                    <h4 class="details-actions">Actions</h4>
                    <button @click.stop.prevent="onTaskDelete"><span class="icon-archive icn"></span> Archive</button>
                    <section v-click-outside="openMembersModal" v-if="memebersModal" class="member-modal">
                        <div class="member-modal-ext-btn"><span @click="memebersModal = false"> </span></div>
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
                                <span class="mmbr-include-v" v-if="task.memberIds?.includes(member)"></span>
                            </div>

                        </div>
                    </section>
                    <section v-if="attachmentModal" class="attachment-modal">
                        <div class="attachment-modal" v-click-outside="() => attachmentModal = false">
                            <header class="a-m-header">
                                Attach from…
                                <span @click.prevent="closeMenuModal" class="icon-close"></span>
                            </header>
                            <div class="a-m-content">
                                <imgUpload @onImgUpload="saveImg" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>
 <script>
import { handleError } from 'vue';
import { boardService } from '../services/board.service';
import { FastAverageColor } from 'fast-average-color';
import moment from 'moment';
import checklist from '../cmps/task-checklist/checklist.vue';
import addChklistModal from '../cmps/task-checklist/add-checklist-modal.vue';
import coverModal from '../cmps/task-cover/cover-modal.vue';
import imgUpload from '../cmps/img-upload.vue';
import cover from '../cmps/task-cover/cover.vue';
import datesModal from '../cmps/dates-modal.vue';
import taskComments from '../cmps/task-comments.vue';
import { useMouseInElement } from '@vueuse/core';
import avatar from '../cmps/avatar.vue';


export default {
    props: {},
    name: 'taskDetails',
    components: {
        checklist,
        addChklistModal,
        coverModal,
        imgUpload,
        cover,
        datesModal,
        taskComments,
        avatar
    },
    data() {
        return {
            labelModel: false,
            task: null,
            board: null,
            group: null,
            memebersModal: false,
            isDescEdited: false,
            placeholder: 'Add a more detailed description...',
            attachmentModal: false,
            groupId: null,
            checklistModal: false,
            coverModal: false,
            datesModalOpen: false,
            isChangeLabel: false,
            currLabelIdx: null,
            currLabelName: '',
            currLabelColor: null,
            labelColors: [
                '#61bd4f',
                '#f2d600',
                '#ff9f1a',
                '#eb5a46',
                '#c377e0',
                '#0079bf',
                '#00c2e0',
                '#51e898',
                '#ff78cb',
                '#344563',
            ]
        }
    },
    async created() {
        const { boardId, groupId, taskId } = this.$route.params
        this.groupId = groupId
        try {
            // this.board = await boardService.getById(boardId)
            this.board = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
            const groupIdx = this.board.groups.findIndex(group => group.id === groupId)
            this.group = this.board.groups[groupIdx]
            const taskIdx = this.group.tasks.findIndex(task => task.id === taskId)
            this.task = this.group.tasks[taskIdx]
            if (this.task.dueDate) this.dueDateUpdate()
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        createNewLabel() {
            const currLabel = boardService.getEmptyLabel()
            this.board.labels.push(currLabel)
            this.currLabelIdx = this.board.labels.length - 1
            this.currLabelColor = currLabel.color
            this.currLabelName = currLabel.title
            this.isChangeLabel = true
        },
        deleteLabel() {
            // const currLabelId = this.board.labels[this.currLabelIdx].id
            // this.board.groups.forEach(group => {
            //     group.tasks.forEach(task => {
            //         const taskLabelIdx = task.labelIds?.findIndex(label => {
            //             label.id === currLabelId
            //         })
            //         console.log('taskLabelIdx', taskLabelIdx)

            //         if (taskLabelIdx) this.removeLabel(taskLabelIdx)
            //     })
            // })

            // this.task.labelIds.filter(label=>label.id!==this.board.labels[this.currLabelIdx].id)

            this.isChangeLabel = false
            this.board.labels.splice(this.currLabelIdx, 1)
            this.saveBoard()

        },
        saveLabel() {
            console.log('Save label');
            const currLabel = this.board.labels[this.currLabelIdx]
            currLabel.color = this.currLabelColor
            currLabel.title = this.currLabelName
            this.isChangeLabel = false

            this.saveBoard()
        },
        openDatesModal() {
            this.datesModalOpen = true
        },
        onDueDateSet(date) {
            let due = {
                date,
                isDone: false,
                dateStr: '',
                status: '',
                clr: ''
            }
            this.task.dueDate = {}
            this.task.dueDate = due
            this.dueDateUpdate()
        },
        onDueDateRemove() {
            this.task.dueDate = null
            this.saveBoard('dueDateRemove')
        },
        closeDateModal() {
            this.datesModalOpen = false
        },
        toggleDueDateDone() {
            this.task.dueDate.isDone = !this.task.dueDate.isDone
            this.dueDateUpdate()
            console.log(this.task.dueDate)
        },
        dueDateUpdate() {
            const due = this.task.dueDate.date
            const dueDateObj = this.task.dueDate

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
            if (this.task.dueDate.isDone) {
                dueDateObj.status = 'complete'
                dueDateObj.clr = '#61BD4F'
            }
            this.task.dueDate = dueDateObj
            this.saveBoard()
        },
        onRemoveAttach(id) {
            console.log('id', id)
            const idx = this.task.attachments.findIndex(currAttach => currAttach.id === id)
            this.task.attachments.splice(idx, 1)
            this.saveBoard()
        },
        onCommentAdd() {
            this.task.comments = this.task.comments || []
            let comment = {
                txt: JSON.parse(JSON.stringify(this.$refs.detailsComment.value)),
                byMember: this.currUser,
                createdAt: Date.now()
            }
            this.task.comments.push(comment)
            this.$refs.detailsComment.value = ''
            this.saveBoard('commentAdd')
        },
        onClickOutside(ev) {
            if (this.checklistModal || this.attachmentModal || this.isDescEdited || this.memebersModal || this.labelModel || this.coverModal) {
                this.checklistModal = false
                this.attachmentModal = false
                this.isDescEdited = false
                this.memebersModal = false
                this.labelModel = false
                this.coverModal = false
                this.datesModalOpen = false
                this.isChangeLabel = false
                this.currLabelIdx = null
            } else this.$router.push('/board/' + this.currBoard._id)
        },
        saveImg(imgData) {
            this.task.attachments = this.task.attachments || []
            let attach = boardService.getEmptyAttachment()
            attach.title = imgData.original_filename
            attach.imgUrl = imgData.url
            attach.createdAt = imgData.created_at
            attach.uploadedBy = this.currUser
            this.task.attachments.push(attach)
            this.saveBoard()
        },
        onCheck(checklist) {
            const idx = this.task.checklists.findIndex(currCheck => {
                return currCheck.id === checklist.id
            })
            this.task.checklists[idx] = checklist
            this.saveBoard()
        },
        onDeleteChecklist(checklistId) {
            const idx = this.task.checklists.findIndex(currCheck => {
                return currCheck.id === checklistId
            })
            this.task.checklists.splice(idx, 1)
            this.saveBoard()
        },
        saveDescription() {
            this.task.description = JSON.parse(JSON.stringify(this.$refs.taskDesc.value))
            this.isDescEdited = false
            this.saveBoard("description")
        },
        onTaskDelete() {
            console.log('deleting');
            let boardCopy = JSON.parse(JSON.stringify(this.board))
            const groupIdx = boardCopy.groups.findIndex(group => group.id === this.groupId)
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(currTask => currTask.id === this.task.id)
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1)

            this.$store.dispatch({ type: 'saveBoard', board: boardCopy, action: "taskRemove" })
            this.$router.push('/board/' + boardCopy._id)
        },
        addMemberToTask(member) {
            this.task.memberIds = this.task.memberIds || []
            const isMember = this.task.memberIds.find((currMem) => currMem._id === member._id)
            if (isMember) {
                const idx = this.task.memberIds.findIndex((curr) => {
                    return curr._id === member._id
                })
                this.task.memberIds.splice(idx, 1)
                this.saveBoard("memberRemove")
            } else {
                this.task.memberIds.push(member)
                this.saveBoard("memberAdd")
            }
        },
        saveBoard(action) {
            let miniTask = {
                title: this.task.title,
                id: this.task.id
            }
            const copy = JSON.parse(JSON.stringify(this.board))
            this.$store.dispatch({ type: 'saveBoard', board: copy, action, task: miniTask })
        },
        addLabel(label) {
            if (!this.task.labelIds) this.task.labelIds = []
            const labelIdx = this.task.labelIds.findIndex(labelId => labelId.id === label.id)
            if (labelIdx !== -1) {
                this.task.labelIds.splice(labelIdx, 1)
            } else {
                this.task.labelIds.push(label)
            }
            this.saveBoard()
        },
        onAddChklist(title) {
            if (!this.task.checklists) this.task.checklists = []
            let checklist = boardService.getEmptyChklist(title)
            this.task.checklists.push(checklist)
            console.log(this.task.checklists)
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
            this.attachmentModal = false
        },
        openAttachmentModal() {
            if (this.attachmentModal) {
                this.attachmentModal = false
            } else {
                this.closeAll()
                this.attachmentModal = true
            }
        },
        setTaskCover(cover) {
            if (this.task.cover?.img === null && this.task.cover.color == cover.color) {
                this.removeTaskCover()
            } else {
                this.task.cover = cover
            }
            this.saveBoard("coverAdd")
        },
        removeTaskCover() {
            delete this.task.cover
            this.saveBoard("coverRemove")
        },
        setCoverImg(url) {
            const cover = {
                img: url,
                color: ''
            }
            const fac = new FastAverageColor();
            fac.getColorAsync(url)
                .then(color => {
                    cover.color = color.rgba;
                    this.setTaskCover(cover)
                })
                .catch(e => {
                    console.log(e);
                })
        },
        attachmentDate(createdAt) {
            return moment(createdAt).fromNow()
        },
    },
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
        currUser() {
            return this.$store.getters.currUser
        },
    },
    unmounted() { },
    watch: {
        '$route.params.id': {
            handler({ id }) {
                console.log(id);
            }
        }
    }
};
</script>

<style>
.task-description-placeholder {
    width: 512px;
    height: 56px;
    padding-left: 11.100000000000001px;
    padding-top: 5.600000000000003px;
    margin-left: 25px;
    border-radius: 3px;
}

.desc-save-btn {
    width: 52.39px;
    height: 32px;
    background-color: #0079bf;
    border: none;
    box-shadow: none;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 3px;
    margin-left: 24.9px;
}

.desc-save-btn:hover {
    background-color: #026aa7;
}

.desc-cancel-btn {
    width: 64.91px;
    height: 32px;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #172b4d;
    border: none;

}

.task-text-area {
    width: 512px;
    height: 108px;
    border-radius: 3px;
}

.task-text-area:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
}

.desc-cancel-btn:hover {
    background-color: #091e4214;
}

.comment-prev {
    margin-top: 15px;
}
</style>
