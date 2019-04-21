<template>
  <div class="plaque">
    <div class="plaque__left">{{ left }}</div>
    <div class="plaque__right">{{ right }}</div>
  </div>
</template>

<script>
export default {
  name: 'pop-plaque',
  props: {
    left: {
      type: String,
      required: true,
    },
    right: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.plaque {
  width: auto;
  height: 24px;
  max-width: 60%;
  padding: 3px 6px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, .65);
  font-size: 10px;
  display: inline-flex;
  align-items: center;

  &__left {
    width: auto;
    padding: 5px;
    border-radius: 20px;
    color: white;
    background-color: #4C4A48;
    box-shadow: inherit;
  }

  &__right {
    margin-left: 7px;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
