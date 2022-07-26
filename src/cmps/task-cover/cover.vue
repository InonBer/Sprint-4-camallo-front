<template>
<div v-if="taskCover" class="task-cover" :style="coverBackground">
  <button @click="toggleModal">
    <span class="icon-card-cover"></span>
     Cover
  </button>
</div>
</template>
 <script>
 export default {
  props:{
    taskCover:Object
  },
 name: 'task-details-cover',
    components: {},
    emits:['removeCover','toggleCoverModal'],
  data() {
   return {};
    },
  created() {},
 methods: {
  toggleModal(){
    this.$emit('toggleCoverModal')
  }
 },
 computed: {
  coverBackground(){
    if(this.taskCover.img){
      console.log('entered')
      return {
        backgroundColor:this.taskCover.color,
        backgroundImage:`url(${this.taskCover.img})`,
        height:'160px'
      }
    } else{
      return {
        backgroundColor:this.taskCover.color
        }
    }
    
  }
 },
 unmounted() {},
  };
  </script>
 <style></style>