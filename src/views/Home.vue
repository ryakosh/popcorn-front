<template>
  <div>
    <pop-movie-list
      name="Action"
      :movies="actionMovies"
      :baseURL="BASE_URL_ASSETS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Adventure"
      :movies="adventureMovies"
      :baseURL="BASE_URL_ASSETS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Drama"
      :movies="dramaMovies"
      :baseURL="BASE_URL_ASSETS"
      @on-click="hClick"
    />
    <pop-movie-list
      name="Fantasy"
      :movies="fantasyMovies"
      :baseURL="BASE_URL_ASSETS"
      @on-click="hClick"
    />
  </div>
</template>

<script>
import MovieList from "../components/MovieList.vue";
import {
  server,
  BASE_URL_API,
  BASE_URL_ASSETS,
  getErrorMsg
} from "../server.js";

const filterGenres = ["Action", "Adventure", "Drama", "Fantasy"];

export default {
  name: "pop-home-view",
  data() {
    let data = {
      BASE_URL_ASSETS
    };

    for (let filterGenre of filterGenres) {
      data[`${filterGenre.toLowerCase()}Movies`] = [];
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
        .movies(BASE_URL_API, null, null, null, `genres:${filterGenre}`)
        .then(res => {
          this[`${filterGenre.toLowerCase()}Movies`] = res.data.payload;
        })
        .catch(err => {
          if (err.response) {
            const res = err.response;

            this.$emit("on-notify", {
              type: "ERROR",
              msg: getErrorMsg(res.data.error, res.statusText)
            });
          } else if (err.request) {
            this.$emit("on-notify", {
              type: "ERROR",
              msg: getErrorMsg(null, "Error connecting to the server")
            });
          } else {
            console.error("Error creating the request object");
          }
        });
    }
  }
};
</script>

<style lang="scss"></style>
