<template>
  <button
    :class="[
      'button',
      {
        button_square: square,
        button_bgimg: bgImg
      }
    ]"
    type="button"
    @click="hClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "pop-button",
  props: {
    square: {
      type: Boolean,
      default: false
    },
    bgImg: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hClick() {
      this.$emit("on-click");
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.button {
  height: 28.23px;
  width: auto;
  padding: 6px;
  border: none;
  outline: none;
  border-radius: 2.5px;
  background-color: #212121;
  color: white;
  font-size: 13px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);

  &_square {
    width: 28.23px;
    height: 28.23px;
    padding: 3px;
    border-radius: 2.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_bgimg {
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
