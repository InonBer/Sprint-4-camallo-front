<template>
  <section class="home-page">

    <home-header />
    <div class="home-container">
      <article class="home-description">
        <div>
          <h2>
            Camallo helps teams move work forward.
          </h2>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way
            your team works is unique accomplish it all with Camallo.
          </p>
          <button @click="onDemoRequest" class="home-start-link">See Demo</button>
          <!-- <router-link class="home-start-link" to="/board-page">See Demo</router-link> -->
        </div>
      </article>
      <div class="image-container">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"
          alt="" />
      </div>
    </div>
    <div class="home-hero">
      <div class="home-spreader"><hr/></div>  
      <div class="home-hero-head">
        <h2 class="home-hero-title">It’s more than work. It’s a way of working together.</h2>
        <p class="home-hero-p">Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows.
          Manage projects, organize tasks, and build team spirit—all in one place.</p>
      </div>
      <div class="home-hero-img-container">
        <img src="../assets/camallo-home-img.png" alt="board-template">
      </div>
    </div>
  </section>


</template>

<script>
import homeHeader from '../cmps/home-header.vue'
export default {
  name: 'home',
  data() {
    return {
      guestUser: {
        fullname: 'Guest Guest',
        email: 'Guest@example.com',
        password: '1234'
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async onDemoRequest() {
      try {
        if (!this.$store.getters.currUser) {
          this.$store.dispatch('onGuestLogin', { guest: this.guestUser })
        }
        this.$router.push('/board-page')
      } catch (e) {
        console.log(e);
      }

    }
  },
  components: {
    homeHeader,
  }

}
</script>
