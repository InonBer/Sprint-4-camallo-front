<template>
    <section class="group-list-container">
        <div class="card-task" v-if="groups" v-for="group in groups">
            <boardGroupPrev @onDetails="onDetails" :group="group" :key="group.id" />
        </div>
        <button @click="onGroupAdd" class="opacity-button grp-add-btn">
            <span class="icon-plus">Add another list</span>
        </button>
    </section>
</template>
 <script>
import boardGroupPrev from './board-group-prev.vue';
import { boardService } from '../services/board.service';
export default {
    name: 'groupPrevList',
    props: {
        groups: {
            type: Array,
        }
    },
    components: {
        boardGroupPrev
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        onGroupAdd() {
            const group = boardService.getEmptyGroup()
            this.groups.push(JSON.parse(JSON.stringify(group)))
            console.log('Adding group');

        },
        onDetails(ids) {
            this.$emit('onDetails', ids)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>