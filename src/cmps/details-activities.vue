<template>
    {{user}}
</template>
 <script>
export default {
    name: 'details-activities',
    props: {
        task: Object
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        user() {
            return this.$store.getters.currUser
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>