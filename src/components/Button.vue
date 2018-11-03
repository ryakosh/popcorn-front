<template>
  <button class="button" @click="hClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'pop-button',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    hClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style>
.button {
  padding: 10px 13px;
  border: none;
  outline: none;
  border-radius: 100px;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, .65);
  font-size: 10px;
}
</style>
