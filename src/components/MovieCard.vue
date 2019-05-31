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
    padding: 5px;
    margin-top: 6.9px;
    border-radius: 0 20px 20px 0;
    background-color: #2c3e50;
    font-size: 10px;
    color: white;
    white-space: nowrap;
    overflow-x: auto;
  }
}
</style>
