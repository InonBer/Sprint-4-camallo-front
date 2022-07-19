<template>

    <boardHeader />
    <boardGroupList v-if="boards" :groups="groups" />
    <!-- <pre v-if="boards">
    {{ boards }}
  </pre> -->
</template>
 <script>
import boardGroupList from "../cmps/board-group-list-prev.vue"
import boardHeader from '../cmps/board-header.vue'
export default {
    name: 'boardPrev',
    props: {
        boards: {
            type: Object
        }
    },
    components: {
        boardHeader,
        boardGroupList,
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        groups() {
            return this.boards.groups
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>