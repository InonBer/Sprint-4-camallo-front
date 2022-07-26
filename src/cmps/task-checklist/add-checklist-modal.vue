<template>
    <section @click.stop="" class="chklist-modal">
        <div class="modal-layout">
            <header>
                <span>
                    Add checklist
                </span>
                <span @click="closeChklistModal" class="close-btn"></span>
            </header>
            <div class="checklist-modal-main">
                <p>Title</p>
                <input v-focus @keydown.enter="onAddChklist" v-model=title type="text" name="checklist-title" />
                <button @click="onAddChklist" class="blue-btn">Add</button>
            </div>
        </div>
    </section>
</template>
 <script>
export default {
    name: 'addChklistModal',
    components: {},
    data() {
        return {
            title: 'Checklist'
        }
    },
    created() { },
    emits: ['onAddChklist','closeChklistModal'],
    methods: {
        onAddChklist() {
            this.$emit('onAddChklist', this.title)
            this.$emit('closeChklistModal')
        },
        closeChklistModal(){
            this.$emit('closeChklistModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>