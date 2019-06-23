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
  height: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: map-get($LIGHT, primary);
  box-shadow: 0 0 6px map-get($LIGHT, secondary);
}

.DARK .text-input {
  color: map-get($DARK, secondary);
  background-color: map-get($DARK, primary);
  box-shadow: 0 0 6px map-get($DARK, secondary);
}

@media only screen and (min-width: 600px) {
  .text-input {
    height: 48.45px;
    border-radius: 22px;
  }
}
</style>
