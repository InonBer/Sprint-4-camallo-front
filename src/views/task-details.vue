<template>
    <div class="window-overlay">
        <section class="task-details">
            <h1>hello</h1>
            <pre v-if="task">
                {{ task }}
            </pre>
            <!-- <button @click="$router.go(-1)">X</button> -->
            <button @click="$router.push('/board/' + boardId)">X</button>
        </section>
    </div>
</template>
 <script>
import { handleError } from 'vue';
import { boardService } from '../services/board.service';

export default {
    props: {

    },
    name: 'taskDetails',
    components: {},
    data() {
        return {
            taskId: null,
            groupId: null,
            boardId: null,
            task: null,
        };
    },
    async created() {
        const { boardId, groupId, taskId } = this.$route.params
        this.taskId = taskId;
        this.boardId = boardId;
        this.groupId = groupId;
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        try {
            this.task = task
        } catch (e) {
            console.log(e);
        }

    },
    methods: {},
    computed: {},
    unmounted() { },
    watch: {
        '$route.params.id': {
            handler(id) {
                console.log(id);
            }
        }
    }
};
</script>
 <style>
 .window-overlay {
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
     width: 100%;
     height: 100%;
     background-color: #000000a3;
     z-index: 20;
 }
 
 .task-details {
     background-color: #f4f5f7;
     width: 25%;
     height: 25%;
     position: fixed;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
 
 }
 </style>