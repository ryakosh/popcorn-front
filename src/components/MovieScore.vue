<template>
  <div class="movie-card__score">
    <span
    class="movie-card__score-full" v-for="c of countOfFulls"
    :key="c"></span>
    <span class="movie-card__score-half" v-if="!Number.isInteger(score)"></span>
  </div>
</template>

<script>
export default {
  name: 'pop-movie-score',
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  computed: {
    countOfFulls() {
      return Math.trunc(this.score);
    },
  },
};
</script>

<style lang="scss">
.movie-card__score {

  &-full {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
    background-color: #F1C40F;
    display: inline-block;
  }
  &-half {
    width: 5.1px;
    height: 10px;
    border-radius: 20px 0 0 20px;
    background-color: #F1C40F;
    display: inline-block;
  }
}
</style>
