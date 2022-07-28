<template>
    <section class="recent-modal">
        <header>
            <div>{{ title }}</div>
            <button aria-label="Close popover" class="close-btn" data-test-id="popover-close"><span role="presentation"
                    aria-hidden="true" class="css-hakgx8"
                    style="--icon-primary-color:currentColor; --icon-secondary-color:var(--ds-surface, #FFFFFF);"><svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                            fill="currentColor"></path>
                    </svg></span></button>
        </header>
        <ul>
            <li class="recent-content" v-for="board in boards" :key="board._id" :value="board._id"
                @click="changeLink(board._id)">
                <img v-if="!board.style.bgc" :src="board.style.bgi" class="li-board-img">
                <div v-else :style="{ backgroundColor: `rgb( ${board.style.bgc})` }" class="li-board-img"></div>
                <div class="content-to-show">
                    <span>{{ board.title }}</span>
                    <span class="board-created-name">{{ board.createdBy.fullname }}’s Workspace</span>
                </div>
            </li>
        </ul>
    </section>
</template>
 <script>
export default {
    name: 'recent-modal',
    props: {
        boards: Array,
        title: String
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        changeLink(id) {
            this.$store.dispatch('setCurrBoard', { id })
            this.$router.push(`/board/${id}`);
        },
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>