<template>
  <header class="app-header">
    <div class="header-content">
      <h2 class="header-logo">Camallo</h2>
      <button class="header-button">Workspaces <span class="header-svg"><svg width="24" height="24" role="presentation"
            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              fill="currentColor"></path>
          </svg></span></button>
      <button class="header-button">Recent <span class="header-svg"><svg width="24" height="24" role="presentation"
            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              fill="currentColor"></path>
          </svg></span></button>
      <button class="header-button">Starred <span class="header-svg"><svg width="24" height="24" role="presentation"
            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              fill="currentColor"></path>
          </svg></span></button>
      <button class="header-button">Templates <span class="header-svg"><svg width="24" height="24" role="presentation"
            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              fill="currentColor"></path>
          </svg></span></button>
      <button class="header-create-button">Create</button>
      <button @click="$router.push('/board')" class="header-create-button">TEST BOARD</button>
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