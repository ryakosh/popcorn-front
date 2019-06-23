<template>
  <div class="movie-list">
    <h2 class="movie-list__name">{{ name }}</h2>
    <div class="movie-list__container" v-if="movies.length">
      <pop-movie-card
        v-for="(movie, i) of subMovies"
        :movie="movie"
        :baseURL="baseURL"
        :key="i"
        @on-click="hClick"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from "./MovieCard.vue";

export default {
  name: "pop-movie-list",
  props: {
    name: {
      type: String,
      required: true
    },
    movies: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      required: false,
      default: 10
    },
    baseURL: {
      type: String,
      required: true
    }
  },
  components: {
    "pop-movie-card": MovieCard
  },
  methods: {
    hClick(movie_id) {
      this.$emit("on-click", movie_id);
    }
  },
  computed: {
    subMovies() {
      return this.movies.slice(0, this.limit);
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.movie-list {
  &__name {
    margin-left: 9.8px;
    color: map-get($LIGHT, secondary);
  }
  &__container {
    padding: 2px 0;
    margin: 13.8px 0 0 18.8px;
    overflow-x: auto;
    display: flex;
  }

  .card {
    margin-right: 13.9px;
  }
}

.DARK .movie-list {
  &__name {
    color: map-get($DARK, secondary);
  }
}

@media only screen and (min-width: 600px) {
  .movie-list {
    &__name {
      margin-left: 13.8px;
      font-size: 32px;
    }
    &__container {
      margin-left: 22.8px;
    }

    .card {
      margin-right: 17.9px;
    }
  }
}
</style>
