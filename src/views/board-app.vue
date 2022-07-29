<template>
  <board-app-header />
  <div style="opacity: 0;" ref="userMouse" class="user-mouse-cursor">
  </div>
  <div v-if="currBoard" class="board-app bgc-img" :style="boardBGI">
    <board-header :board="currBoard" />
    <group-list @onTaskMove="onTaskMove" @groupAdded="groupAdded" @onBoardChange="onBoardChange" @onDetails="onDetails"
      v-if="currBoard" :groups="currBoard.groups" />
    <router-view />
  </div>
</template>
 <script>
import { boardService } from '../services/board.service';
import groupList from "../cmps/group-list.vue"
import boardHeader from '../cmps/board-header.vue'
import boardAppHeader from '../cmps/board-app-header.vue';
import { socketService } from '../services/socket.service';

export default {
  emits: ['onTaskMove'],
  name: 'boardApp',
  components: {
    boardHeader,
    groupList,
    boardAppHeader
  },
  data() {
    return {
      board: null,
      userClicked: false
    }
  },
  created() {
    socketService.on('on-dragRecived', this.onSocketBoards)
    socketService.on('recive-user-click', this.socketMouseDown)
    socketService.on('recive-user-mouse-move', this.socketMouseMove)
    socketService.on('recive-user-mouse-up', this.socketMouseUp)
    window.addEventListener('mousedown', this.onMouseDown)
    window.addEventListener('mousemove', this.onMouseMoving)
    window.addEventListener('mouseup', this.onMouseUp)

  },
  emits: ['onBoardChange'],
  methods: {
    onMouseDown({ clientX, clientY }) {
      if (this.$route.name !== 'boardApp') return
      const pos = {
        clientX,
        clientY,
      }
      this.userClicked = true
      socketService.emit('on-user-mouse-down', pos)
    },
    socketMouseUp(clientX) {
      this.$refs.userMouse.style.opacity = 0
      this.$refs.userMouse.innerHTML = null
    },
    onMouseUp({ clientX, clientY }) {
      this.userClicked = false
      socketService.emit('on-user-mouse-up', clientX)
    },
    onMouseMoving({ clientX, clientY }) {
      if (!this.userClicked) return
      const pos = {
        clientX,
        clientY,
      }
      socketService.emit('on-user-mouse-move', pos)
    },
    socketMouseDown({ clientX, clientY }) {
      let node = document.elementFromPoint(clientX, clientY).parentElement
      if (node.classList[0] !== "smooth-dnd-draggable-wrapper") return
      const clone = node.cloneNode(true)
      this.$refs.userMouse.innerHTML = clone.innerHTML
      this.$refs.userMouse.style.opacity = 0.7
      this.$refs.userMouse.style.width = 260 + 'px';
      this.$refs.userMouse.style.left = clientX - 120 + 'px';
      this.$refs.userMouse.style.top = clientY - 38 + 'px';
    },
    socketMouseMove({ clientX, clientY }) {
      this.$refs.userMouse.style.left = clientX - 120 + 'px';
      this.$refs.userMouse.style.top = clientY - 38 + 'px';
    },
    onTaskMove(groups) {
      let boardCopy = JSON.parse(JSON.stringify(this.currBoard))
      boardCopy.groups = JSON.parse(JSON.stringify(groups))
      this.$store.dispatch('saveBoard', { board: boardCopy })
    },
    onSocketBoards(board) {
      this.$store.dispatch('onBoardSocketRecived', { board })
    },
    onDetails(ids) {
      ids.boardId = this.currBoard._id
      const { boardId, groupId, taskId } = ids
      this.$router.push(this.$route.fullPath + `/group/${groupId}/task/${taskId}`)
    },
    groupAdded() {
      this.$store.dispatch('saveBoard', { board: this.board })
    },
    onBoardChange() {
      this.$store.dispatch('saveBoard', { board: this.board })
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },

    // groups() {
    //   return this.currBoard.groups
    // },
    boardBGI() {
      if (this.currBoard.style.bgi) {
        return { backgroundImage: `url('  ${this.currBoard.style.bgi}  ')` }
      }
      else return { backgroundColor: 'rgb(' + this.currBoard.style.bgc + ')' }
    },
  },
  unmounted() { },
  watch: {
    '$route.params': {
      async handler({ boardId }) {
        try {
          if (!this.$store.getters.currBoard || this.$store.getters.currBoard._id !== boardId) {
            this.$store.dispatch({ type: 'setCurrBoard', id: boardId })
          }
          socketService.emit('board-set-channel', boardId)
          console.log('created');
        } catch (err) {
          console.error(err)
        }
      },
      immediate: true,
      deep: true


    }
  }

};
</script>
 <style>
 .user-mouse-cursor {
   position: fixed;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   left: -50px;
   /* opacity: 0.7; */
   width: auto;
   height: auto;
   z-index: 1000;
   /* background-color: black; */
   /* background-image: url('../assets/cursor.png'); */
 
 }
 </style>