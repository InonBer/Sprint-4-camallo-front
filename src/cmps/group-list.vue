<template>
    <section class="group-list-container">
        <div class="card-task" v-if="groups" v-for="group in groups">
            <group-prev @saveGroup="saveGroup" @onTaskMode="onTaskMode" @onBoardChange="onBoardChange"
                @onDetails="onDetails" :group="group" :key="group.id" />

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
        saveGroup(group) {
            console.log('here');
            console.log(group);
            let groups = JSON.parse(JSON.stringify(this.groups))
            const idx = groups.findIndex(currGroup => {
                return currGroup.id === group.id
            })
            groups[idx] = group
            this.$store.dispatch('addGroup', { groups })

        },
        onGroupAdd() {
            const group = boardService.getEmptyGroup()
            let groups = JSON.parse(JSON.stringify(this.groups))
            groups.push(group)
            this.$store.dispatch('addGroup', { groups })

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