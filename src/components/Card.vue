<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "pop-card"
};
</script>

<style lang="scss">
.card {
  width: 111.1px;
  height: 199px;
  background-color: white;
  border-radius: 13px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
