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

<style>
.text-input {
  min-width: 200px;
  width: auto;
  height: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}
</style>
