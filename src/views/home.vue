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
          <router-link class="home-start-link" to="/board-page">See Demo</router-link>
        </div>
      </article>
      <div class="image-container">
        <img
          src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp"
          alt="" />
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
    }
  },
  computed: {
  },
  created() {
    console.log(this.$route.fullPath)
  },
  methods: {
  },
  components: {
    homeHeader,
  }

}
</script>
