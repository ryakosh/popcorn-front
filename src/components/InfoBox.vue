<template>
  <div class="info-box">
    <div class="info-box__key">
      {{ k }}
    </div>
    <div class="info-box__value">
      {{ v }}
    </div>
  </div>
</template>

<script>
export default {
  name: "pop-info-box",
  props: {
    k: {
      type: String,
      required: true
    },
    v: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.info-box {
  width: 100%;
  height: auto;
  padding: 5px;
  border: 2px solid #212121;
  border-radius: 2.5px;
  display: flex;
  flex-direction: column;

  &__key {
    width: 100%;
    height: auto;
    font-size: 10px;
    color: #212121;
    text-transform: uppercase;
  }

  &__value {
    width: 100%;
    height: 100%;
    font-size: 13px;
    color: black;
    margin-left: 5px;
    margin-top: 5px;
  }
}
</style>
