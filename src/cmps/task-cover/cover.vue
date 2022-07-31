<template>
  <div v-if="taskCover" class="task-cover" :style="coverBackground">
    <button @click="toggleModal" :style="{color:txtColor}">
      <span class="icon-card-cover"></span>
      Cover
    </button>
  </div>
</template>
 <script>
import { utilService } from '../../services/util.service';

export default {
  props: {
    taskCover: Object
  },
  name: 'task-details-cover',
  components: {},
  emits: ['removeCover', 'toggleCoverModal'],
  data() {
    return {};
  },
  created() { },
  methods: {
    toggleModal() {
      this.$emit('toggleCoverModal')
    },
    //     isDarkColor(c) {
    //   c = c.substring(1) // strip #
    //   const rgb = parseInt(c, 16) // convert rrggbb to decimal
    //   const r = (rgb >> 16) & 0xff // extract red
    //   const g = (rgb >> 8) & 0xff // extract green
    //   const b = (rgb >> 0) & 0xff // extract blue
    //   var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    //   return luma < 100
    // },
    //    componentToHex(c) {
    //   var hex = c.toString(16);
    //   return hex.length == 1 ? "0" + hex : hex;
    // },
    // rgbToHex(clr) {
    //   if(clr[0] === '#') return clr
    //   const rgb = clr.split('(')[1].split(')')[0].split(',')
    //   const r = +rgb[0].trim()
    //   const g = +rgb[1].trim()
    //   const b = +rgb[2].trim()
    //   return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    // }
  },
  computed: {
    coverBackground() {
      if (this.taskCover.img) {
        return {
          backgroundColor: this.taskCover.color,
          backgroundImage: `url(${this.taskCover.img})`,
          height: '160px'
        }
      } else {
        return {
          backgroundColor: this.taskCover.color
        }
      }
    },
    txtColor(){
    let isDark = utilService.isDarkColor(this.taskCover.color)
    let clr = isDark ? '#ffffff' : '#172b4d'
    return clr
    }
  },
  unmounted() { },
};
</script>
 <style>
 </style>