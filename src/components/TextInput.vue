<template>
  <input class="text-input" type="text" :value="value" @input="hInput" />
</template>

<script>
export default {
  name: "pop-text-input",
  props: ["value"],
  methods: {
    hInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.text-input {
  min-width: 200px;
  width: auto;
  height: 28.23px;
  padding: 0 10px;
  border: none;
  border-radius: 2.5px;
  outline: none;
  color: white;
  font-size: 16px;
  background-color: #212121;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.DARK .text-input {
  color: map-get($DARK, secondary);
  background-color: map-get($DARK, primary);
  box-shadow: 0 0 6px map-get($DARK, secondary);
}
</style>
