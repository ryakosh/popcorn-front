<template>
    <div class="movie-details-view">
        <div class="movie-details-view__info">
            <div class="movie-details-view__data">
            </div>
            <div class="movie-details-view__poster">
            </div>
        </div>
        <div class="movie-details-view__description">
            {{ movie.description }}
        </div>
    </div>
</template>

<script>
import Plaque from '../components/Plaque.vue';
import { server, BASE_URL } from '../server.js';

export default {
    name: 'pop-movie-details-view',
    data() {
        return { movie: null };
    },
    components: {
        'pop-plaque': Plaque,
    },
    methods: {
        updateMovie(id) {
            server.movie(BASE_URL, id).then((res) => {
                this.movie = res.data.payload;
            });
        },
    },
    created() {
        this.updateMovie(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
        this.updateMovie(to.params.id);
        next();
    },
};
</script>

<style lang="scss">
.movie-details-view {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
</style>
