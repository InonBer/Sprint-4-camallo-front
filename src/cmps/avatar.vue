<template>
    <div class="madeup-avatar">
        {{ initials }}
    </div>
</template>
 <script>
export default {
    name: 'avatar',
    props: {
        username: String
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        initials() {
            return this.username.split(' ').map(word => word.charAt(0)).join('')
        }
    },
    unmounted() { },
};
</script>
 <style>
 .madeup-avatar {
     display: flex;
     align-items: center;
     justify-content: center;
     width: 32px !important;
     height: 32px !important;
     /* width: 43.320000000000014px; */
     max-width: 32px !important;
     max-height: 32px !important;
     min-height: 32px !important;
     min-height: 32px !important;
     /* height: 32px; */
     /* size: 32px; */
     border-radius: 50%;
     text-align: center;
     background-color: rgb(184, 184, 184);
     color: white;
     cursor: pointer;
 
 }
 
 .madeup-avatar:hover {
     background-color: gray;
 }
 </style>