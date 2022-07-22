<template>
    <header class="top-header">
        <div class="header-container">
            <div>
                <h2 class="logo">Camallo</h2>
            </div>

            <div class="buttons-styles-ButtonGroup">
                <div>
                    <router-link to="/login">Log in</router-link>
                </div>
                <div>
                    <router-link to="/signup">Get Camallo for free</router-link>
                </div>
            </div>
        </div>
    </header>
</template>
 <script>
export default {
    name: 'home-header',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>