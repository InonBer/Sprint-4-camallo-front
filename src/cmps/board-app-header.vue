<template>
  <header class="app-header" :style="{ backgroundColor: BGC }">
    <div class="header-content">
      <h2 @click="$router.push('/')" class=" header-logo"><img src="../assets/app-icon.png" alt="" srcset=""> Camallo
      </h2>
      <button @click="isRecentModalOpen = !isRecentModalOpen" class="header-button">Recent <img
          src="../assets/arrow-down.png" alt="arw-dwn" />
        <section v-if="isRecentModalOpen" class="recent-modal">
          <header>
            <div>Recent boards</div>
            <button aria-label="Close popover" class="close-btn" data-test-id="popover-close"><span role="presentation"
                aria-hidden="true" class="css-hakgx8"
                style="--icon-primary-color:currentColor; --icon-secondary-color:var(--ds-surface, #FFFFFF);"><svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                    fill="currentColor"></path>
                </svg></span></button>
          </header>
          <ul>
            <li v-for="board in boards" :key="board._id" :value="board._id" @click="changeLink(board._id)"> {{
                board.title
            }}</li>
          </ul>
        </section>
      </button>
      <button class="header-button">Starred <img src="../assets/arrow-down.png" alt="arw-dwn" /></button>
      <div class="conss">
        <button @click="onCreate" class="header-create-button">Create</button>
        <div v-click-outside="() => { isCreating = false }" v-if="isCreating" class="header-creating-container">
          <header class="header-header">Create</header>
          <div @click="isChoosingBoard = true ; isCreating = false" class="header-create-button">

            <h2 class="title"><span class="title-icon-create"><svg width="24" height="24" role="presentation"
                  focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                    fill="currentColor"></path>
                </svg></span>Create board</h2>
            <p>A board is made up of cards ordered on lists. Use it to manage projects,track information,or organize
              anything.</p>
          </div>
        </div>
        <div class="create-screen-container" v-click-outside="() => { isChoosingBoard = false }" v-if="isChoosingBoard">
          <button @click="closeAllCreate" class="super-exit-buttin">X</button>
          <header class="create-screen-header">Create board</header>
          <hr>
          <div :style="{ backgroundImage: 'url(' + BGImage + ')' }" class="create-img-background">
            <img @load="show" src="../assets/prevImg.png" alt="">
          </div>
          <div class="create-screen-imgs-container">
            <img @click="setBgi(img)" v-for="(img, idx) in imgsToDisplay" :key="idx" :src="img" alt="">
          </div>
          <div>
            <form class="board-create-form" action="">
              <label name="Board Title*" style="text-align:start"> Board Title <span>*</span>
                <input v-model="boardTitle" type="text">
                <div class="create-title-req" v-if="boardTitle.length === 0"> <span>👋</span> Board title is required
                </div>
              </label>
              <button @click.stop.prevent="onBoardCreate" class="create-screen-button">Create</button>
            </form>
          </div>
        </div>
      </div>

      <!-- <select @change="changeLink" v-if="boards" id="boards" name="board-list"> -->
      <!-- <option v-for="board in boards" :key="board._id" :value="board._id"> {{ board.title }}</option> -->
      <!-- <option :value="boards[0]._id">{{ boards[0].title }}</option>
        <option :value="boards[1]._id">{{ boards[1].title }}</option> -->

      <!-- <option v-for="board in bards" value=""></option> -->
      <!-- </select> -->

    </div>
    <div class="header-end">

      <!-- <input type="text" placeholder=" Search"> -->

      <el-input v-model="searchtxt" placeholder="Search" :prefix-icon="Search" />
      <button class="header-create-button"><span role="img" aria-label="NotificationIcon" class="css-pxzk9z"
          style="--icon-primary-color:#FFFFFF; --icon-secondary-color: inherit;"><svg width="24" height="24"
            role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 2C11.4477 2 11 2.44772 11 3V3.078C10.2728 3.19668 9.65318 3.44603 9.1328 3.79295C8.39456 4.28511 7.91489 4.93416 7.60557 5.55279C7.29822 6.1675 7.14952 6.77011 7.07611 7.2106C7.039 7.43322 7.02007 7.62092 7.01035 7.75688C7.00549 7.82503 7.0029 7.88067 7.00153 7.92176C7.00085 7.94232 7.00046 7.95929 7.00025 7.9724L7.00005 7.98916L7.00001 7.99533L7 7.99786L7 7.99898C7 7.9995 7 8 8 8H7V11.723L4.14251 16.4855C3.95715 16.7944 3.95229 17.1792 4.1298 17.4927C4.30731 17.8062 4.63973 18 5 18H19C19.3603 18 19.6927 17.8062 19.8702 17.4927C20.0477 17.1792 20.0429 16.7944 19.8575 16.4855L17 11.723V8H16C17 8 17 7.9995 17 7.99898L17 7.99786L17 7.99533L17 7.98916L16.9997 7.9724C16.9995 7.95929 16.9992 7.94232 16.9985 7.92176C16.9971 7.88067 16.9945 7.82503 16.9896 7.75688C16.9799 7.62092 16.961 7.43322 16.9239 7.2106C16.8505 6.77011 16.7018 6.1675 16.3944 5.55279C16.0851 4.93416 15.6054 4.28511 14.8672 3.79295C14.3468 3.44603 13.7272 3.19668 13 3.078V3C13 2.44772 12.5523 2 12 2ZM9.00042 7.98839L9 8.00435V12C9 12.1812 8.95074 12.3591 8.85749 12.5145L6.76619 16H17.2338L15.1425 12.5145C15.0493 12.3591 15 12.1812 15 12V8.00436L14.9996 7.98839C14.999 7.97089 14.9977 7.9406 14.9947 7.89937C14.9888 7.81658 14.9765 7.69178 14.9511 7.5394C14.8995 7.22989 14.7982 6.8325 14.6056 6.44721C14.4149 6.06584 14.1446 5.71489 13.7578 5.45705C13.3773 5.20338 12.825 5 12 5C11.175 5 10.6227 5.20338 10.2422 5.45705C9.85544 5.71489 9.58511 6.06584 9.39443 6.44721C9.20178 6.8325 9.10048 7.22989 9.04889 7.5394C9.0235 7.69178 9.01118 7.81658 9.00527 7.89937C9.00233 7.9406 9.001 7.97089 9.00042 7.98839ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19H14Z"
              fill="currentColor"></path>
          </svg></span></button>
      <!-- <b-avatar button @click="onClick"
        src="https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.18169-9/14604868_10207837850613190_7477266573465067764_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=2CWWj-F6GlUAX924qVr&_nc_ht=scontent.fhfa2-2.fna&oh=00_AT_ytDVVRYGatO-w3lbPMvfXfPVYmFVjSGd5rYBWfp1alg&oe=63074F8A"
        :size="32"></b-avatar> -->
      <b-avatar button @click="onClick" :text="getCurrUserName" icon="person-fill" :size="32"></b-avatar>
    </div>
  </header>

</template>
<script>
import { Search } from '@element-plus/icons-vue'
import { boardService } from '../services/board.service';
import { FastAverageColor } from 'fast-average-color';

export default {
  props: {

  },
  name: 'app-header',
  components: {},
  data() {
    return {
      boardTitle: '',
      isCreating: false,
      imgsToDisplay: [],
      emptyBoard: null,
      searchtxt: '',
      isChoosingBoard: false,
      backGroundPrev: '',
      BGC: '#1e6584',
      isRecentModalOpen: false
    };
  },
  async created() {
    try {
      const imgs = await boardService.getBgcImgs()
      this.imgsToDisplay = imgs
    } catch (e) {
      console.log(e);
    }
    this.emptyBoard = boardService.getEmptyBoard()
    // setTimeout(()=>{
    //   this.headerColor()
    // },500)
  },
  methods: {
    test(ev) {
      console.log(ev);
    },
    closeAllCreate() {
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''

    },
    changeLink(id) {
      // this.$router.push('/')
      // console.log('id', id)

      this.$store.dispatch('setCurrBoard', { id })
      this.$router.push(`/board/${id}`);
      // this.$store.dispatch('setCurrBoard', { id: ev.target.value })
      // this.$router.push(`/board/${ev.target.value}`);
      // setTimeout(() => {
      // }, 0)
    },
    setBgi(img) {

      this.backGroundPrev = img
    },
    onBoardCreate() {
      let board = boardService.getEmptyBoard()
      board.title = JSON.parse(JSON.stringify(this.boardTitle))
      board.style.bgi = JSON.parse(JSON.stringify(this.backGroundPrev))
      this.isCreating = false
      this.isChoosingBoard = false
      this.boardTitle = ''
      this.backGroundPrev = ''
      this.$store.dispatch('addNewBoard', { board })

    },
    onCreate() {
      this.boardTitle = ''
      this.isCreating = !this.isCreating
    },
    setBoardImg(img) {
      this.emptyBoard.style.bgi = 'img'
      this.emptyBoard.style.bgi = img
      console.log(this.emptyBoard);
    },
    headerColor() {
      const board = this.$store.getters.currBoard
      board.style.bgi
      const fac = new FastAverageColor();
      fac.getColorAsync(board.style.bgi)
        .then(color => {
          this.BGC = color.rgba;
        })
    }
  },
  computed: {

    BGImage() {
      if (this.backGroundPrev === '') return this.imgsToDisplay[0]
      else return this.backGroundPrev
    },
    Search() {
      return Search
    },
    boards() {
      return this.$store.getters.getBoards
    },
    getCurrUserName() {
      // const user = this.$store.getters.currUser
      // return (user.imgUrl)?user.imgUrl:user.fullname.split(' ').map(word => word.charAt(0)).join('')
      return this.$store.getters.currUser.fullname.split(' ').map(word => word.charAt(0)).join('')
    }
  },
  unmounted() { },
}
</script>
<style>
</style>