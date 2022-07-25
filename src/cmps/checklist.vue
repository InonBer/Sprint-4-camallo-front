<template>
  <section v-if="checklist" class="checklist-container">
    <div class="checklist-header">
      <span class="icon-checklist"></span>
      <span class="checklist-title">{{ checklist.title }}</span>
      <button @click="deleteChecklist" class="checklist-btn btn-dlt">Delete</button>
      <el-progress class="checklist-prg-bar" :percentage="progress" :status="progress === 100 ? 'success' : ''" />
      <div class="checklist-checkbox-container">
        <label :key="todo.id" v-for="todo in checklist.todos">
          <input @click="onCheck(todo)" type="checkbox" class="checklist-chkbx" :key="todo.id" :checked="todo.isDone">
          <span class="todo-txt" :class="todo.isDone ? 'done' : ''">
            {{ todo.title }}
          </span>
        </label>
      </div>
    </div>
    <section class="add-todo-container">
      <button @click="addTodoMode = true" v-if="!addTodoMode" class="checklist-btn add-todo-btn">Add an item</button>
      <div class="add-todo-txt-container" v-else>
        <!-- v-click-outside="() => addTodoMode = false" v-else -->
        <textarea v-focus v-model="todoTitle" class="todo-text-area" cols="50" 
        @keydown.enter.stop.prevent="onTodoAdd"
        @keydown.esc.stop.prevent = "addTodoMode= false"
        placeholder="Add an item" rows="15"></textarea>
        <button @click.stop.prevent="onTodoAdd" class="desc-save-btn">Add</button>
        <button @click.stop.prevent="addTodoMode = false" class="desc-cancel-btn">Cancel</button>
      </div>
    </section>
  </section>
</template>
 <script>
 import { boardService } from '../services/board.service';
 export default {
   props: {
     checklist: Object
   },
   name: 'checklist',
   components: {},
   data() {
     return {
       addTodoMode: false,
      todo:null,
      todoTitle:''
     };
   },
   created() {
 
   },
   methods: {
     onCheck(todo) {
       let copy = {...this.checklist}
       const idx = copy.todos.findIndex(currTodo => {
         return currTodo.id === todo.id
       })
       copy.todos[idx].isDone = !copy.todos[idx].isDone
       this.$emit('onCheck', copy)
     },
     onTodoAdd() {
      let title =  this.todoTitle
       let emptyTodo = boardService.getEmptyTodo(title)
       let checkListCopy = {...this.checklist}
       checkListCopy.todos.push(emptyTodo)
       this.todoTitle = ''
       this.$emit('onCheck', checkListCopy)
     },
     deleteChecklist() {
       this.$emit('onDeleteChecklist', this.checklist.id)
     }
   },
   computed: {
     progress() {
       const todosDone = this.checklist.todos.filter(todo => todo.isDone)
       return parseInt(todosDone.length / this.checklist.todos.length * 100)
 
     },
   },
   unmounted() {
 
   },
 };
 </script>
