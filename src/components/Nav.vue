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
        class="nav__theme-switcher"
        circle
        @on-click="hClickThemeSwitcher"
      ></pop-button>
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
  data() {
    return {
      isDark: false
    };
  },
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
    },
    hClickThemeSwitcher() {
      this.$emit("on-dark", (this.isDark = !this.isDark));
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

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

  &__left,
  &__right {
    width: 100%;
    display: flex;
  }

  &__left {
    height: 35.6px;
  }

  &__back {
    background-image: url("../assets/nav/back-LIGHT.svg");
  }

  &__right {
    justify-content: flex-end;
  }

  &__theme-switcher {
    background-color: map-get($DARK, primary);
    margin-right: 10px;
  }

  &__search {
    background-image: url("../assets/nav/search-LIGHT.svg");
  }
}

.DARK .nav {
  &__back {
    background-image: url("../assets/nav/back-DARK.svg");
  }

  &__theme-switcher {
    background-color: map-get($LIGHT, primary);
  }

  &__search {
    background-image: url("../assets/nav/search-DARK.svg");
  }
}

@media only screen and (min-width: 600px) {
  .nav {
    &__center img {
      width: 49px;
      height: 47.34px;
    }

    &__left {
      width: 100%;
      height: 49px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .nav {
    &__center img {
      width: 72px;
      height: 69.38px;
    }

    &__left {
      width: 100%;
      height: 72px;
    }
  }
}
</style>
