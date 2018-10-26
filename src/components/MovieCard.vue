<template>
  <pop-card>
    <div class="movie-card">
      <img class="movie-card__poster" :src="movie.poster">
      <span class="movie-card__title">{{ movie.title }}</span>
      <pop-movie-score :score="movie.score" />
    </div>
  </pop-card>
</template>

<script>
import Card from './Card.vue';
import MovieScore from './MovieScore.vue';

export default {
  name: 'pop-movie-card',
  components: {
    'pop-card': Card,
    'pop-movie-score': MovieScore,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
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
    height: 17px;
    padding: 5px;
    margin-top: 6.9px;
    border-radius: 0 20px 20px 0;
    background-color: #2C3E50;
    font-size: 10px;
    color: white;
  }
  &__score {
    margin-top: 6.9px;
    margin-left: 4px;
  }
}
</style>
