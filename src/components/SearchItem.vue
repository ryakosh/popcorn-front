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
  height: 41px;
  border-radius: 2.5px;
  background-color: #212121;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;

  &__poster {
    width: 27px;
    height: 100%;
    border-radius: 2.5px 0 0 2.5px;
  }

  &__title {
    font-size: 13px;
    margin-left: 5px;
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
