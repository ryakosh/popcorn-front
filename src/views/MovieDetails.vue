<template>
  <div class="movie-details-view" v-if="movie">
    <div class="movie-details-view__info">
      <div class="movie-details-view__data">
        <pop-plaque left="TITLE" :right="movie.title" /><br />
        <pop-plaque left="STARS" :right="movie.stars.join(', ')" /><br />
        <pop-plaque left="WRITERS" :right="movie.writers.join(', ')" /><br />
        <pop-plaque left="DIRECTOR" :right="movie.directors.join(', ')" /><br />
        <pop-plaque left="GENRES" :right="movie.genres.join(', ')" />
      </div>
      <div class="movie-details-view__poster">
        <img
          style="width: 148.3px; height: 199px;"
          :src="`http://localhost/assets/${movie.poster}`"
        />
      </div>
    </div>
    <div class="movie-details-view__description">
      {{ movie.description }}
    </div>
  </div>
</template>

<script>
import Plaque from "../components/Plaque.vue";
import { server, BASE_URL } from "../server.js";

export default {
  name: "pop-movie-details-view",
  data() {
    return { movie: null };
  },
  components: {
    "pop-plaque": Plaque
  },
  methods: {
    updateMovie(id) {
      server.movie(BASE_URL, id).then(res => {
        this.movie = res.data.payload;
      });
    }
  },
  created() {
    this.updateMovie(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.updateMovie(to.params.id);
    next();
  }
};
</script>

<style lang="scss">
.movie-details-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  &__info {
    width: 100%;
    height: auto;
    display: inline-flex;
  }

  &__data {
    width: 55%;
    height: auto;
    display: inline-block;

    .plaque {
      margin-bottom: 10px;
    }
  }

  &__poster {
    width: auto;
    height: auto;
    margin-right: -10px;

    img {
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
  }

  &__description {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
}
</style>
