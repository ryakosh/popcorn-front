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
  margin-top: 15px;

  &__name {
    color: black;
    margin: 0;
    font-size: 17px;
  }
  &__container {
    padding: 4px 0;
    margin: 5px 5px;
    overflow-x: auto;
    display: flex;
    will-change: transform;
  }

  .card {
    margin-right: 5px;
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

@media only screen and (min-width: 768px) {
  .movie-list {
    &__name {
      margin-left: 16.8px;
      font-size: 43px;
    }
    &__container {
      margin-left: 25.8px;
    }

    .card {
      margin-right: 20.9px;
    }
  }
}
</style>
