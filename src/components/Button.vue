<template>
  <button 
    :class="['button', {
      'button_circle': circle,
      'button_shadow': shadow,
      'button_img': img,
      }]"
    @click="hClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'pop-button',
  props: {
    circle: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    img: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="scss">
.button {
  padding: 10px 13px;
  border: none;
  outline: none;
  border-radius: 100px;
  background-color: white;
  font-size: 10px;

  &_circle {
    width: 35.6px;
    height: 35.6px;
    padding: 0;
    border-radius: 50%;
  }

  &_shadow {
    box-shadow: 0 0 3px rgba(0, 0, 0, .65);
  }

  &_img img {
    width: 35.6px;
    height: 35.6px;
    border-radius: 50%;
  }
}
</style>
