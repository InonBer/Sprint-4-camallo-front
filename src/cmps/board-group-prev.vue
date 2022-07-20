<template>
  <section class="group-card-container">
    <form @submit="onTitleChange" v-if="group.titleEdit">
      <input style="margin-left:10px" class="card-header" type="text" v-model="group.title">
    </form>
    <header @click="group.titleEdit = !group.titleEdit" v-if="!group.titleEdit" class="card-header">{{ group.title }}
    </header>
    <boardTaskList @onDetails="onDetails" :tasks="group.tasks" />

  </section>
</template>
 <script>
import boardTaskList from './board-task-list.vue';
export default {
  emits: ['onDetails'],
  props: {
    group: {
      type: Object
    }
  },
  name: 'GroupPrev',
  components: {
    boardTaskList
  },
  data() {
    return {

    };
  },
  created() {
  },
  methods: {
    onTitleChange() {
      const copy = JSON.parse(JSON.stringify(this.group.title))
      this.group.title = JSON.parse(JSON.stringify(copy))
      this.group.titleEdit = !this.group.titleEdit
    },
    onDetails(id) {
      const ids = {
        taskId: id,
        groupId: this.group.id
      }
      this.$emit('onDetails', ids)
    }
  },
  computed: {},
  unmounted() { },
};
</script>
 <style>
 </style>