<template>
  <section class="group-card-container">
    <header class="card-header">{{ group.title }}</header>
    <boardTaskList :tasks="group.tasks" />
    <router-view :group="group"></router-view>

  </section>
</template>
 <script>
import boardTaskList from './board-task-list.vue';
export default {
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
    return {};
  },
  created() {
  },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
 <style>
 </style>