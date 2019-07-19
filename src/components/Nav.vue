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
        circle
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
        @on-click="hClickAuth"
        circle
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
  /* 35.6px button size + 10px spacing */
  transform: translateX(45.6px) !important;
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
    display: inline-block;
  }

  &__back {
    background-image: url("../assets/nav/back-LIGHT.svg");
    background-size: 24.45px 14.69px;
    transform: translateX(-30px);
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 0.4s;
    position: absolute;
  }
  &__auth {
    background-image: url("../assets/nav/auth-LIGHT.svg");
    background-size: 19.05px 26.74px;
    transform: translateX(0);
    transition: transform 0.4s;
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
