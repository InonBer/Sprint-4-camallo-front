<template>
    <section class="group-list-container ">
        <!-- <div class="card-task" v-if="groups" v-for="group in groups"> -->
        <Container class="card-task" orientation="horizontal" v-if="groups" group-name="cols" @drop="onDrop($event)">
            <Draggable @mousedown.prevent v-if="groups" v-for="group in groups" :key="group.id">
                <group-prev @saveGroup="saveGroup" @onTaskMove="onTaskMove" @onBoardChange="onBoardChange"
                    @onDetails="onDetails" :group="group" :key="group.id" />
            </Draggable>
            <button v-if="!groupCreating" @click="groupCreating = true" class="opacity-button grp-add-btn">
                <span class="icon-plus"></span>Add another list</button>
            <div v-if="groupCreating" v-click-outside="() => { groupCreating = false }" class="add-list-txt-cont">
                <div class="add-list-item">
                    <input @keydown.enter.prevent="onGroupAdd" v-model="groupTitle" placeholder="Enter list title..."
                        type="text">
                    <div class="add-list-btn-cont">
                        <button @click.prevent="onGroupAdd" class="add-list-btn">Add List</button>
                        <button @click.stop.prevent="groupCreating = false" class="cancel-list-btn"><span
                                class="x-icon"></span></button>
                    </div>
                </div>
            </div>
        </Container>
        <!-- </div> -->
    </section>
</template>
 <script>
import groupPrev from './group-prev.vue';
import { Container, Draggable } from "vue3-smooth-dnd"
import { applyDrag } from '../services/dnd-service';
import { boardService } from '../services/board.service';
export default {
    emits: ['onTaskMove'],
    name: 'groupPrevList',
    props: {
        groups: {
            type: Array,
        }
    },
    components: {
        groupPrev,
        Container,
        Draggable
    },
    data() {
        return {
            itemsToSend: null,
            dataToTranfer: [],
            groupCreating: false,
            groupTitle: ''

        };
    },
    created() {
        if (this.groups.length == 0) {
            this.onGroupAdd()
        }
    },
    emits: ['onBoardChange', 'onDetails'],
    methods: {
        onDrop(dropRes) {

            let cols = JSON.parse(JSON.stringify(this.groups))
            cols = applyDrag(cols, dropRes)
            let boardCopy = JSON.parse(JSON.stringify(this.currBoard))
            boardCopy.groups = cols
            this.$store.dispatch('saveBoard', { board: boardCopy })
        },
        getChildPayload(idx) {

            let cols = JSON.parse(JSON.stringify(this.groups))
            return cols[idx]
        },
        onTaskMove(data, id) {

            // debugger
            const obj = {
                data,
                id,
            }
            this.dataToTranfer.push(obj)
            if (this.dataToTranfer.length === this.groups.length) {
                let groupsCopy = JSON.parse(JSON.stringify(this.groups))
                groupsCopy = groupsCopy.map(group => {
                    const data = this.dataToTranfer.find(data => data.id === group.id)
                    group.tasks = data.data
                    return group
                })
                this.$emit('onTaskMove', groupsCopy)
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
            group.title = JSON.parse(JSON.stringify(this.groupTitle))
            group.titleEdit = false
            this.groupTitle = ''
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
    computed: {
        currBoard() {
            return this.$store.getters.currBoard
        },
        currUser() {
            return this.$store.getters.currUser
        }
    },
    unmounted() { },
};
</script>
 <style>
 .horizontal {
     display: flex !important;
     flex-direction: row;
 }
 </style>