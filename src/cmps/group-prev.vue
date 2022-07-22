<template>
  <section class="group-card-container">
    <form @submit="onTitleChange" v-if="group.titleEdit">
      <input style="margin-left:10px" class="card-header" type="text" v-model="group.title">
    </form>
    <header @click="group.titleEdit = !group.titleEdit" v-if="!group.titleEdit" class="card-header"><span>{{ group.title
    }}</span>
    </header>
    <div class="group-card-scroll">
      <task-list @onTaskMode="onTaskMode" @taskAdded="onBoardChange" @onBoardChange="onBoardChange"
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
    };
  },
  created() {
  },
  emits: ['onDetails'],
  methods: {
    onTaskMode(tasks) {

      const copy = JSON.parse(JSON.stringify(tasks))
      this.$emit('onTaskMode', copy, this.group.id)
      // this.items.tasks = JSON.parse(JSON.stringify(tasks))
      // let groupCopy = JSON.parse(JSON.stringify(this.group))
      // groupCopy = tasks
      // this.$emit('onTaskMove', groupCopy)
    },
    onTitleChange() {
      const copy = JSON.parse(JSON.stringify(this.group.title))
      this.group.title = JSON.parse(JSON.stringify(copy))
      this.group.titleEdit = !this.group.titleEdit
      this.$emit('onBoardChange')

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
      this.$emit('onBoardChange')
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