<template>
    <section class="group-list-container">
        <pre v-if="groups">
        {{ groups }}
        </pre>

    </section>


</template>
 <script>
export default {
    name: 'groupPrev',
    props: {
        groups: {
            type: Array,
        }
    },
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