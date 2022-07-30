<template>
  <section class="group-card-container">
    <header class="card-header">
      <form @submit="onTitleChange" v-click-outside="onTitleChange" v-if="isEdited">
        <!-- <input ref="groupTitle" @click.stop.prevent="focusOnTitle" type="text" :placeholder="group.title"
          v-model="groupTitle"> -->
        <textarea ref="groupTitle" @keydown.enter.stop="onTitleChange" v-focus name="" id="" v-model="groupTitle"
          cols="30" @click.stop.prevent="focusOnTitle" :placeholder="group.title" rows="1"></textarea>
      </form>
      <span @click="isEdited = !isEdited" v-if="!isEdited">
        {{ group.title }}
      </span>
      <span @click.stop="isGroupMenuOpen = !isGroupMenuOpen" class="icon-menu">
      </span>
      <group-menu-modal @removeGroup="removeGroup" v-if="isGroupMenuOpen"
        v-click-outside="() => isGroupMenuOpen = false" @closeMenuModal="isGroupMenuOpen = false" />

    </header>
    <div class="group-card-scroll">
      <task-list @enterClicked="onAddTask" @onTaskMove="onTaskMove" @saveTask="saveTask" @taskAdded="onBoardChange"
        @onBoardChange="onBoardChange" @onDetails="onDetails" :tasks="group.tasks" :groupId="group.id" />
    </div>
    <div v-if="!isTaskCreating" @click="onTaskAdding" class="add-btn"><span class="icon-plus"></span> Add a
      card</div>
    <div v-if="isTaskCreating" class="text-area-create-container">
      <div v-click-outside="() => { isTaskCreating = false }" class="text-area-cont">
        <textarea @keydown.enter.stop.prevent="onAddTask" @click.prevent.stop="$refs.taskTitleCreate.focus()"
          ref="taskTitleCreate" class="task-create-text" name="" id="" placeholder="Enter a title for this card..."
          cols="30" rows="10"></textarea>
      </div>
      <div class="create-btn-container">
        <button class="add-crd-btn" @click.stop.prevent="onAddTask">Add card</button>
        <div @click.stop.prevent="isTaskCreating = false" class="x-icon-container"> <span class="x-icon"></span></div>
      </div>
    </div>


  </section>
</template>
 <script>
import taskList from './task-list.vue';
import { boardService } from '../services/board.service';
import GroupMenuModal from './group-menu-modal.vue';
export default {
  emits: ['onBoardChange', 'onTaskMove', 'saveGroup'],
  props: {
    group: {
      type: Object
    },
    idx: Number
  },
  name: 'GroupPrev',
  components: {
    taskList,
    GroupMenuModal
  },
  data() {
    return {
      isEdited: null,
      groupTitle: null,
      isTaskCreating: false,
      isGroupMenuOpen: false,
    };
  },
  created() {
    this.isEdited = this.group.titleEdit
    this.groupTitle = JSON.parse(JSON.stringify(this.group.title))
  },
  emits: ['onDetails'],
  methods: {
    removeGroup() {
      let board = JSON.parse(JSON.stringify(this.currBoard))
      const idx = board.groups.findIndex(group => group.id === this.group.id)
      board.groups.splice(idx, 1)
      this.$store.dispatch('saveBoard', { board, action: "groupRemove" })
    },
    onTaskAdding() {
      this.isTaskCreating = true
      // this.$refs.taskTitleCreate.focus()
    },
    focusOnTitle() {
      this.$refs.groupTitle.focus()

    },
    saveTask(task) {
      let group = JSON.parse(JSON.stringify(this.group))
      const idx = this.group.tasks.findIndex((currTask) => {
        return currTask.id === task.id;
      })
      group.tasks[idx] = task
      // this.$store.dispatch('addTask', { group, id: group.id })
      this.$emit('saveGroup', group)
    },
    onTaskMove(tasks) {
      this.$emit('onTaskMove', tasks, this.group.id)
    },

    onTitleChange() {
      this.isEdited = false
      let group = JSON.parse(JSON.stringify(this.group))
      group.titleEdit = false
      group.title = this.groupTitle
      this.$emit('saveGroup', group)
    },
    onDetails(id) {
      const ids = {
        taskId: id,
        groupId: this.group.id
      }
      this.$emit('onDetails', ids)
    },
    onAddTask() {
      if (this.$refs.taskTitleCreate.value.length < 1) {
        this.$refs.taskTitleCreate.focus()
        return
      }
      let copy = JSON.parse(JSON.stringify(this.group))
      let task = boardService.getEmptyTask()
      let title = JSON.parse(JSON.stringify(this.$refs.taskTitleCreate.value))
      task.title = title
      this.$refs.taskTitleCreate.value = ''
      task.isEdited = false
      copy.tasks.push(task)
      this.$store.dispatch('addTask', { group: copy, id: task.id })
      // this.isTaskCreating = false

    },
    onBoardChange() {
      this.$emit('onBoardChange')
    },

  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    }
  },
  unmounted() {
    clearInterval(this.interval)
  },


};
</script>
 <style>
 .group-card-scroll {
   /* display: flex; */
   flex-direction: column;
   gap: 8px;
 }
 
 .text-area-cont textarea:focus {
   border: none;
   outline: none;
 }
 
 .task-create-text {
   margin-bottom: 4px;
   max-height: 162px;
   min-height: 54px;
   height: 66px;
   border-radius: 3px;
   box-shadow: #00000017 0px 1px 5px 2px;
   border: none;
   width: 256px;
   color: #172b4d;
   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
   font-size: 14px;
   font-weight: 400;
   padding: 6px 8px 2px;
 
 }
 
 .x-icon-container {
   width: 32px;
   height: 32px;
   text-align: center;
   padding-top: 1.9000000000000004px;
   cursor: pointer;
 }
 
 
 
 .text-area-create-container {
   display: flex;
   flex-direction: column;
 
 
 }
 
 .text-area-create-container .add-crd-btn {
   width: 80px;
   height: 32px;
   color: white;
   background-color: #0079bf;
   border: none;
   border-radius: 3px;
   margin-top: 8px;
   cursor: pointer;
 }
 
 .text-area-create-container .add-crd-btn:hover {
   background-color: #026aa7;
 
 }
 
 .create-btn-container {
   padding-left: 5px;
   display: flex;
   align-items: center;
   gap: 5px;
 
 }
 
 .text-area-cont {
   height: 66px;
   width: 100%;
   display: flex;
 
   justify-content: center;
   /* background-color: white; */
   /* padding: 6px 8px 2px; */
 }
 </style>