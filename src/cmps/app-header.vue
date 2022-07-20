<template>
  <header class="app-header">
    <div class="header-content">
      <h2 class="header-logo">Camallo</h2>
      <button class="header-button">Workspaces<img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Recent <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Starred<img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-button">Templates<img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <button class="header-create-button">Create</button>
      <button @click="$router.push('/board')" class="header-create-button">TEST BOARD</button>

      <select id="boards" name="board-list">
        <option v-for="board in bards" value=""></option>
      </select>

    </div>
    <div class="header-end">

      <input type="text">
      <button class="header-create-button">Bell</button>
      <button class="header-create-button">icon</button>
    </div>
  </header>

</template>
<script>
export default {
  computed: {
  }
}
</script>
