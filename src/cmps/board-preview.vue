<template>

    <boardHeader />
    <boardGroupList @onDetails="onDetails" v-if="board" :groups="groups" />

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
        board: {
            type: Object,
        },
        // boards: {
        //     type: Object
        // }
    },
    components: {
        boardHeader,
        boardGroupList,
    },
    data() {
        return {
        };
    },
    created() {
        console.log(this.board);
    },
    methods: {
        onDetails(ids) {
            ids.boardId = this.board._id
            const { boardId, groupId, taskId } = ids
            this.$router.push({ name: 'taskDetails', params: { boardId: boardId, groupId: groupId, taskId: taskId } })
            // this.$router.push(`/group/${ids.groupId}/task/${ids.taskId}`)
        }
    },
    computed: {
        groups() {
            return this.board.groups
        },

    },
    unmounted() { },
};
</script>
 <style>
 </style>