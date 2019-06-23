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
  width: 111.1px;
  height: 199px;
  background-color: map-get($LIGHT, primary);
  border-radius: 13px;
  box-shadow: 0px 0px 6px map-get($LIGHT, secondary);
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
