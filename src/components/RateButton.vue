<template>
  <div class="rate-button">
    <div class="rate-button__left">
      <pop-button class="rate-button__btn" @on-click="hClickLeft">
        RATE
      </pop-button>
      <div class="rate-button__user-rating" v-if="userRating">
        {{ userRating }}
      </div>
    </div>
    <div class="rate-button__right" v-show="showRight">
      <span
        class="rate-button__action"
        v-if="userRating"
        @click="hClickRight(0)"
      >
        X
      </span>
      <div
        class="rate-button__action"
        v-for="i of 5"
        :key="i"
        @click="hClickRight(i)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "pop-rate-button",
  data() {
    return {
      showRight: false
    };
  },
  props: {
    userRating: {
      type: Number,
      required: true
    }
  },
  components: {
    "pop-button": Button
  },
  methods: {
    hClickLeft() {
      this.showRight = !this.showRight;
    },
    hClickRight(userRating) {
      this.$emit("on-rate", userRating);
    }
  }
};
</script>

<style lang="scss">
@import "../sass/_themes.scss";

.rate-button {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;

  &__left {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__btn {
    background-color: map-get($LIGHT, secondary);
    box-shadow: 0 0 6px map-get($LIGHT, secondary);
    color: map-get($LIGHT, primary);
    font-size: 15.5px;
  }
  &__user-rating {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    margin: 0 4px 0 3px;
    background-color: map-get($LIGHT, secondary);
    box-shadow: 0 0 6px map-get($LIGHT, secondary);
    color: map-get($LIGHT, primary);
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__action {
    width: 27.59px;
    height: 27.59px;
    border-radius: 50%;
    margin-left: 8px;
    background-color: map-get($LIGHT, secondary);
    box-shadow: 0 0 6px map-get($LIGHT, secondary);
    color: map-get($LIGHT, primary);
    font-size: 13px;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
