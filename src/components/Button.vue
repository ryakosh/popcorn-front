<template>
  <button 
    :class="['button', {
      'button_circle': circle,
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
  box-shadow: 0 0 3px rgba(0, 0, 0, .65);
  font-size: 10px;

  &_circle {
    width: 35.6px;
    height: 35.6px;
    padding: 0;
    border-radius: 50%;
  }
}
</style>
