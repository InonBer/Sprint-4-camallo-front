<template>
    <div class="dates-modal-container">
        <div @click="closeModal" class="date-picker-ext-btn"><span class="ext-btn-icon"></span></div>
        <div class="date-picker-header">Dates</div>
        <Datepicker v-model="date" inline autoApply />

        <div class="date-picker-body">Reminders will be sent to all members and watchers of this card.</div>
        <div @click="onDueDateSet" class="dates-save-btn">Save</div>
        <div @click="onDueDateRemove" class="dates-remove-btn">Remove</div>
    </div>

</template>
 <script>
import { ref } from 'vue';

export default {
    name: 'datesModal',
    components: {},
    setup() {

    },
    data() {
        return {
            date: ref(new Date())
        };
    },
    created() {
        // this.date = ref(new Date());

    },
    methods: {
        onDueDateSet() {
            let date = JSON.parse(JSON.stringify(this.date))
            this.$emit('onDueDateSet', date)
            this.closeModal()
        },
        onDueDateRemove() {
            this.$emit('onDueDateRemove')
        },
        closeModal() {
            this.$emit('closeDateModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>