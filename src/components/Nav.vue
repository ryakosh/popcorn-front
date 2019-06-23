<template>
  <div class="nav">
    <div class="nav__left">
      <transition name="fade-scroll_back">
        <pop-button
          class="nav__back"
          v-show="showBack"
          @on-click="hClickBack"
          circle
          bgImg
        >
        </pop-button>
      </transition>
    </div>
    <div class="nav__center">
      <img @click="hClickLogo" src="../assets/popcorn.svg" />
    </div>
    <div class="nav__right">
      <pop-button
        class="nav__search"
        circle
        bgImg
        @on-click="hClickSearch"
      ></pop-button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "pop-nav",
  components: {
    "pop-button": Button
  },
  props: {
    showBack: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    hClickBack() {
      this.$emit("on-click-back");
    },
    hClickLogo() {
      this.$emit("on-click-logo");
    },
    hClickSearch() {
      this.$emit("on-click-search");
    }
  }
};
</script>

<style lang="scss">
.fade-scroll_back-enter-active,
.fade-scroll_back-leave-active {
  transition-property: transform, opacity;
  transition-duration: 0.4s;
  position: absolute;
}
.fade-scroll_back-enter,
.fade-scroll_back-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.fade-scroll_back-enter-to,
.fade-scroll_back-leave {
  transform: translateX(0);
  opacity: 1;
}

.nav {
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    width: 35.6px;
    height: 35.6px;
  }

  &__back {
    background-image: url("../assets/nav/back-LIGHT.svg");
    background-size: 24.45px 14.69px;
  }

  &__search {
    background-image: url("../assets/nav/search-LIGHT.svg");
    background-size: 20.97px 21.94px;
  }
}
</style>
