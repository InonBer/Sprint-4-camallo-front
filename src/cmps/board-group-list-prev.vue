<template>
    <section class="group-list-container">
        <div class="card-task" v-if="groups" v-for="group in groups">
            <boardGroupPrev :group="group" :key="group.id" />

        </div>

        <div @click="onGroupAdd" class="group-add-btn-ccontainer">
            <button>+ Add another list</button>
        </div>
        <!-- <pre v-if="groups">
        {{ groups }}
        </pre> -->

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

        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>