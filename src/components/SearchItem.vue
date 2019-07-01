<template>
  <div class="search-item" @click="hClick">
    <img class="search-item__poster" :src="poster" />
    <span class="search-item__title">
      {{ `${title} ● ${release_date}` }}
    </span>
  </div>
</template>

<script>
export default {
  name: "pop-search-item",
  props: {
    movie_id: {
      type: Number,
      required: true
    },
    poster: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    release_date: {
      type: String,
      required: true
    }
  },
  methods: {
    hClick() {
      this.$emit("on-click", this.movie_id);
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.search-item {
  width: 100%;
  height: 47px;
  border-radius: 7px;
  background-color: map-get($LIGHT, primary);
  box-shadow: 0 0 6px map-get($LIGHT, secondary);
  display: flex;
  align-items: center;

  &__poster {
    width: 31.81px;
    height: 100%;
    border-radius: 7px 0 0 7px;
  }

  &__title {
    color: map-get($LIGHT, secondary);
    font-size: 11px;
    margin-left: 7px;
  }
}

.DARK .search-item {
  background-color: map-get($DARK, primary);
  box-shadow: 0 0 6px map-get($DARK, secondary);

  &__title {
    color: map-get($DARK, secondary);
  }
}

@media only screen and (min-width: 600px) {
  .search-item {
    height: 68px;
    border-radius: 10px;

    &__poster {
      width: 46.96px;
      height: 68px;
    }
    &__title {
      font-size: 16px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .search-item {
    height: 94px;
    border-radius: 10px;

    &__poster {
      width: 64.51px;
      height: 94px;
    }
    &__title {
      font-size: 21px;
    }
  }
}
</style>
