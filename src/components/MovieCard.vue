<template>
  <pop-card>
    <div class="movie-card" @click="hClick">
      <img class="movie-card__poster" :src="`${baseURL}P${movie.poster}`" />
      <span class="movie-card__title">{{ movie.title }}</span>
    </div>
  </pop-card>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "pop-movie-card",
  components: {
    "pop-card": Card
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    baseURL: {
      type: String,
      required: true
    }
  },
  methods: {
    hClick() {
      this.$emit("on-click", this.movie.movie_id);
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.movie-card {
  width: 100%;
  height: 100%;
  border-radius: inherit;

  &__poster {
    width: 111.1px;
    height: 149.1px;
    border-radius: inherit;
  }
  &__title {
    width: auto;
    max-width: 95%;
    height: 22px;
    display: inline-block;
    padding: 5px 8px 5px 5px;
    margin-top: 6.9px;
    border-radius: 0 20px 20px 0;
    background-color: map-get($LIGHT, secondary);
    font-size: 10px;
    color: map-get($LIGHT, text);
    white-space: nowrap;
    overflow-x: auto;
  }
}

.DARK .movie-card {
  &__title {
    background-color: map-get($DARK, secondary);
    color: map-get($DARK, text);
  }
}

@media only screen and (min-width: 600px) {
  .movie-card {
    &__poster {
      width: 152.66px;
      height: 225.55px;
    }
    &__title {
      height: 27.38px;
      padding: 7px 10px 7px 5px;
      font-size: 13px;
    }
  }
}
</style>
