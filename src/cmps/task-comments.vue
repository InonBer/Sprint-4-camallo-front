<template>
    <div class="comment-header-user">
        <avatar :username="comment.byMember.fullname" />
        <span class="comment-user-fullname">{{ comment.byMember.fullname }}</span>
        <span class="comment-created-at">{{ activityDate(comment.createdAt) }}</span>
    </div>
    <div class="comment-txt">
        <p>{{ comment.txt }}</p>
    </div>

</template>
 <script>
import avatar from './avatar.vue';
import moment from 'moment';

export default {
    name: 'task-comments',
    props: {
        comment: Object
    },
    components: {
        avatar
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        activityDate(createdAt) {
            return moment(createdAt).fromNow()
        }
    },
    computed: {
        user() {
            return this.$store.getters.currUser
        }
    },
    unmounted() { },
};
</script>
 <style>
 .comment-created-at {
     color: #5e6c84;
     font-size: 12px;
     font-weight: 400;
     line-height: 14px;
     margin-left: 7px;
 
 }
 
 .comment-user-fullname {
     font-weight: 700;
     margin-left: 7px;
 }
 
 .comment-header-user {
     display: flex;
     align-items: center;
     position: relative;
     left: -17px;
 }
 
 .comment-txt {
 
     width: 98%;
     height: 38px;
     background-color: #fff;
     padding: 8px 12px;
     color: #172b4d;
     font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
     font-size: 14px;
     font-weight: 400;
     line-height: 20px;
     border-radius: 3px;
     box-shadow: 0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214;
     box-sizing: border-box;
     clear: both;
     display: inline-block;
     margin: 4px 2px 4px 20px;
     max-width: 100%;
     overflow: hidden;
     text-overflow: ellipsis;
 
 }
 
 p {
     margin-top: 0;
 
 }
 </style>