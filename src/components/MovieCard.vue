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
  display: flex;
  flex-direction: column;

  &__poster {
    width: 96.74px;
    height: 140.04px;
    border-radius: inherit;
  }
  &__title {
    display: inline-block;
    margin: 5px;
    font-size: 11px;
    color: white;
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

@media only screen and (min-width: 768px) {
  .movie-card {
    &__poster {
      width: 211.81px;
      height: 308.09px;
    }
    &__title {
      height: 31.94px;
      padding: 7px 10px 7px 5px;
      font-size: 16px;
    }
  }
}
</style>
