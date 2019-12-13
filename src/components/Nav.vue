<template>
  <div class="nav">
    <div class="nav__left">
      <pop-button
        :class="[
          'nav__back',
          {
            'fade-scroll_back': showBack
          }
        ]"
        @on-click="hClickBack"
        square
        bgImg
      >
      </pop-button>
      <pop-button
        :class="[
          'nav__auth',
          {
            scroll_auth: showBack
          }
        ]"
        v-if="showAuth"
        @on-click="hClickAuth"
        square
        bgImg
      >
      </pop-button>
    </div>
    <div class="nav__center">
      <img @click="hClickLogo" src="../assets/popcorn.svg" />
    </div>
    <div class="nav__right">
      <pop-button
        class="nav__theme-switcher"
        square
        @on-click="hClickThemeSwitcher"
      ></pop-button>
      <pop-button
        class="nav__search"
        square
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
    },
    showAuth: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    hClickBack() {
      this.$emit("on-click-back");
    },
    hClickAuth() {
      this.$emit("on-click-auth");
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

.fade-scroll_back {
  transform: translateX(0) !important;
  opacity: 1 !important;
}
.scroll_auth {
  /* 28.23px button size + 5px spacing */
  transform: translateX(33.23px) !important;
}

.nav {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &__left,
  &__right {
    width: 100%;
    display: flex;
  }

  &__left {
    height: 28.23px;
    display: inline-block;
  }

  &__back {
    background-image: url("../assets/nav/back-LIGHT.svg");
    background-size: 7.86px 15.71px;
    transform: translateX(-30px);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 0.4s;
    position: absolute;
  }
  &__auth {
    background-image: url("../assets/nav/auth-LIGHT.svg");
    background-color: #ffc107;
    background-size: 15px 21.07px;
    transform: translateX(0);
    transition: transform 0.4s;
  }

  &__right {
    justify-content: flex-end;
  }

  &__theme-switcher {
    background-color: map-get($DARK, primary);
    margin-right: 5px;
  }

  &__search {
    background-image: url("../assets/nav/search-LIGHT.svg");
  }
}

.DARK .nav {
  &__back {
    background-image: url("../assets/nav/back-DARK.svg");
  }

  &__auth {
    background-image: url("../assets/nav/auth-DARK.svg");
  }

  &__theme-switcher {
    background-color: map-get($LIGHT, primary);
  }

  &__search {
    background-image: url("../assets/nav/search-DARK.svg");
  }
}
</style>
