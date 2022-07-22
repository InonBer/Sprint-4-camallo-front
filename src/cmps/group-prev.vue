<template>
  <section class="group-card-container">
    <form @submit="onTitleChange" v-if="isEdited">
      <input style="margin-left:10px" class="card-header" type="text" :placeholder="group.title" v-model="groupTitle">
    </form>
    <header @click="isEdited = !isEdited" v-if="!isEdited" class="card-header"><span>{{
        groupTitle
    }}</span>
    </header>
    <div class="group-card-scroll">
      <task-list @onTaskMode="onTaskMode" @saveTask="saveTask" @taskAdded="onBoardChange" @onBoardChange="onBoardChange"
        @onDetails="onDetails" :tasks="group.tasks" :groupId="group.id" />
    </div>
    <button @click="onAddTask" class="add-btn"><span class="icon-plus"></span> Add a card</button>


  </section>
</template>
 <script>
import taskList from './task-list.vue';
import { boardService } from '../services/board.service';
export default {
  emits: ['onBoardChange', 'onTaskMode'],
  props: {
    group: {
      type: Object
    },
    idx: Number
  },
  name: 'GroupPrev',
  components: {
    taskList
  },
  data() {
    return {
      isEdited: null,
      groupTitle: null

    };
  },
  created() {
    this.isEdited = this.group.titleEdit
    this.groupTitle = JSON.parse(JSON.stringify(this.group.title))
  },
  emits: ['onDetails'],
  methods: {
    saveTask(task) {
      let group = JSON.parse(JSON.stringify(this.group))
      const idx = this.group.tasks.findIndex((currTask) => {
        return currTask.id === task.id;
      })
      group.tasks[idx] = task
      this.$store.dispatch('addTask', { group, id: group.id })
    },
    onTaskMode(tasks) {

      const copy = JSON.parse(JSON.stringify(tasks))
      this.$emit('onTaskMode', copy, this.group.id)
      // this.items.tasks = JSON.parse(JSON.stringify(tasks))
      // let groupCopy = JSON.parse(JSON.stringify(this.group))
      // groupCopy = tasks
      // this.$emit('onTaskMove', groupCopy)
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
      let copy = JSON.parse(JSON.stringify(this.group))
      const task = boardService.getEmptyTask()
      copy.tasks.push(task)
      this.$store.dispatch('addTask', { group: copy, id: this.group.id })
      // this.$emit('onBoardChange')
    },
    onBoardChange() {
      this.$emit('onBoardChange')
    },

  },
  computed: {},
  unmounted() {
    clearInterval(this.interval)
  },


};
</script>
 <style>
 .group-card-scroll {
   display: flex;
   flex-direction: column;
   gap: 8px;
 }
 </style>