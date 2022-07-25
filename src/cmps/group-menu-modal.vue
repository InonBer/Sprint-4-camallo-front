<template>
    <div class="group-menu-modal">
        <header>List actions <span @click.prevent="closeMenuModal" class="header-close-btn"></span></header>
        <div class="list-actions">
            <div @click.stop.prevent="removeGroup">Remove group</div>
            <div>Edit group</div>
        </div>

    </div>
</template>
 <script>
export default {
    name: 'group-menu-modal',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        closeMenuModal() {
            this.$emit('closeMenuModal')
        },
        removeGroup() {
            this.$emit('removeGroup')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>