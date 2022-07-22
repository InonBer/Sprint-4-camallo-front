<template>
    <div id="mySidebar" class="sidebar">
        <span class="close-btn" @click="closeNav">×</span>
        <h3 class="board-menu-header-title js-board-menu-title-text">Menu</h3>
        <hr class="board-menu-header-divider">
        <a class="board-menu-navigation-item-link"> Change background</a>

    </div>
</template>
 <script>
export default {
    name: 'board-sidebar',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openNav() {
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        },
        closeNav() {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        },
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>
