<template>
  <div class="rate-button-circle" @click="hClick">{{ value }}</div>
</template>

<script>
export default {
  name: 'pop-rate-button-circle',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    hClick() {
      this.$emit('on-click', this.value);
    },
  },
};
</script>

<style>
.rate-button-circle {
  width: 14.9px;
  height: 14.9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, .65);
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
