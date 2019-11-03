<template>
  <div>
    <pop-movie-list
      name="Action"
      :movies="prvt.actionMovies"
      :baseURL="shrd.BASE_URL_POSTERS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Adventure"
      :movies="prvt.adventureMovies"
      :baseURL="shrd.BASE_URL_POSTERS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Drama"
      :movies="prvt.dramaMovies"
      :baseURL="shrd.BASE_URL_POSTERS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Fantasy"
      :movies="prvt.fantasyMovies"
      :baseURL="shrd.BASE_URL_POSTERS"
      @on-click="hClick"
    />
  </div>
</template>

<script>
import MovieList from "../components/MovieList.vue";
import { server, handleError } from "../server.js";
import store from "../store.js";

const filterGenres = ["Action", "Adventure", "Drama", "Fantasy"];

export default {
  name: "pop-home-view",
  data() {
    let data = {
      shrd: store.state,
      prvt: {}
    };

    for (let filterGenre of filterGenres) {
      data.prvt[`${filterGenre.toLowerCase()}Movies`] = [];
    }

    return data;
  },
  components: {
    "pop-movie-list": MovieList
  },
  methods: {
    hClick(movie_id) {
      this.$router.push({
        name: "movie",
        params: {
          id: movie_id
        }
      });
    }
  },
  created() {
    for (let filterGenre of filterGenres) {
      server
        .movies(null, null, null, `genres:${filterGenre}`)
        .then(res => {
          this.prvt[`${filterGenre.toLowerCase()}Movies`] = res.data.payload;
        })
        .catch(err => handleError(err, this));
    }
  }
};
</script>

<style lang="scss"></style>
