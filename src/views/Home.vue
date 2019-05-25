<template>
    <div>
        <pop-movie-list name="Action" :movies="actionMovies"/>
        <pop-movie-list name="Adventure" :movies="adventureMovies"/>
        <pop-movie-list name="Drama" :movies="dramaMovies"/>
        <pop-movie-list name="Fantasy" :movies="fantasyMovies"/>
    </div>
</template>

<script>
import MovieList from '../components/MovieList.vue';
import { server, BASE_URL } from '../server.js';

const filterGenres = [ 'Action', 'Adventure',
                       'Drama', 'Fantasy' ];

export default {
    name: 'pop-home-view',
    data() {
        let data = {};

        for (let filterGenre of filterGenres) {
            data[`${filterGenre.toLowerCase()}Movies`] = [];
        }

        return data;
    },
    components: {
        'pop-movie-list': MovieList,
    },
    created() {
        for (let filterGenre of filterGenres) {
            server.movies(BASE_URL, null, null, null, `genres:${filterGenre}`).then(res => {
                this[`${filterGenre.toLowerCase()}Movies`] =
                    res.data.payload;
            }).catch(err => { console.log('fuck'); });
        }
    },
};
</script>

<style lang="scss">

</style>
