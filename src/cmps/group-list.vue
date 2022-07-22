<template>
    <section class="group-list-container">
        <div class="card-task" v-if="groups" v-for="group in groups">
            <group-prev @onTaskMode="onTaskMode" @onBoardChange="onBoardChange" @onDetails="onDetails" :group="group"
                :key="group.id" />

        </div>
        <button @click="onGroupAdd" class="opacity-button grp-add-btn"><span class="icon-plus">Add another
                list</span></button>
    </section>
</template>
 <script>
import groupPrev from './group-prev.vue';
import { boardService } from '../services/board.service';
export default {
    emits: ['onTaskMode'],
    name: 'groupPrevList',
    props: {
        groups: {
            type: Array,
        }
    },
    components: {
        groupPrev
    },
    data() {
        return {
            itemsToSend: null,
            dataToTranfer: []

        };
    },
    created() {

    },
    emits: ['onBoardChange', 'onDetails'],
    methods: {
        onTaskMode(data, id) {
            const obj = {
                data,
                id,
            }
            this.dataToTranfer.push(obj)
            if (this.dataToTranfer.length === this.groups.length) {
                console.log(this.dataToTranfer);
                let items = JSON.parse(JSON.stringify(this.groups))
                let groups = this.dataToTranfer.map(item => {
                    const group = items.find((data) =>
                        data.id === item.id
                    )
                    group.tasks = item.data
                    return group
                })
                this.$emit('onTaskMode', groups)
                this.dataToTranfer = []
            }

        },
        onGroupAdd() {
            const group = boardService.getEmptyGroup()
            this.groups.push(JSON.parse(JSON.stringify(group)))
            this.$emit('groupAdded')
            console.log('Adding group');

        },
        onDetails(ids) {
            this.$emit('onDetails', ids)
        },
        onBoardChange() {
            console.log('group list');
            this.$emit('onBoardChange')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>