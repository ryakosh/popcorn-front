<template>
  <div class="plaque">
    <div class="plaque__left">{{ left }}</div>
    <div class="plaque__right">{{ right }}</div>
  </div>
</template>

<script>
export default {
  name: "pop-plaque",
  props: {
    left: {
      type: String,
      required: true
    },
    right: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.plaque {
  width: auto;
  height: 24px;
  max-width: 100%;
  padding: 3px 6px;
  border-radius: 20px;
  background-color: map-get($LIGHT, primary);
  box-shadow: 0 0 3px map-get($LIGHT, secondary);
  font-size: 10px;
  display: inline-flex;
  align-items: center;

  &__left {
    width: auto;
    padding: 5px;
    border-radius: 20px;
    color: map-get($LIGHT, text);
    background-color: map-get($LIGHT, secondary);
    box-shadow: inherit;
  }

  &__right {
    margin-left: 7px;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.DARK .plaque {
  background-color: map-get($DARK, primary);
  box-shadow: 0 0 3px map-get($DARK, secondary);

  &__left {
    background-color: map-get($DARK, secondary);
    color: map-get($DARK, text);
  }

  &__right {
    color: map-get($DARK, secondary);
  }
}

@media only screen and (min-width: 600px) {
  .plaque {
    height: 34px;
    padding: 8px 9px;
    font-size: 15px;

    &__left {
      padding: 6px;
    }
    &__right {
      margin-left: 12px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .plaque {
    height: 49px;
    padding: 9px 10px;
    font-size: 20px;

    &__left {
      padding: 7px;
    }
    &__right {
      margin-left: 13px;
    }
  }
}
</style>
