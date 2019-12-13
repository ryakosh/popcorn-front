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
@import "../sass/themes";

.card {
  width: 96.74px;
  height: auto;
  background-color: #212121;
  border-radius: 2.5px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.DARK .card {
  background-color: map-get($DARK, primary);
  box-shadow: 0 0 6px map-get($DARK, secondary);
}

@media only screen and (min-width: 600px) {
  .card {
    width: 152.8px;
    height: 273.68px;
    border-radius: 20px;
  }
}

@media only screen and (min-width: 768px) {
  .card {
    width: 212px;
    height: 373.84px;
    border-radius: 25px;
  }
}
</style>
