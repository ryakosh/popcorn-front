<template>
  <div class="search-item">
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
  }
};
</script>

<style lang="scss">
.search-item {
  width: 100%;
  height: 47px;
  border-radius: 7px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;

  &__poster {
    width: 31.81px;
    height: 100%;
    border-radius: 7px 0 0 7px;
  }

  &__title {
    font-size: 11px;
    margin-left: 7px;
  }
}
</style>
