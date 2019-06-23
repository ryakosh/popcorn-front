<template>
  <div id="app">
    <div class="c">
      <pop-nav
        :showBack="showBack"
        @on-click-back="hClickBack"
        @on-click-logo="hClickLogo"
        @on-click-search="hClickSearch"
      />
      <pop-search v-show="showSearch" @on-click-cancel="hClickCancel" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Search from "./components/Search.vue";

export default {
  data() {
    return {
      showBack: false,
      showSearch: false
    };
  },
  components: {
    "pop-nav": Nav,
    "pop-search": Search
  },
  methods: {
    hClickBack() {
      this.$router.go(-1);
    },
    hClickLogo() {
      this.$router.push("/");
    },
    hClickSearch() {
      this.showSearch = true;
    },
    hClickCancel() {
      this.showSearch = false;
    },
    setShowBack(path) {
      if (path === "/") {
        this.showBack = false;
      } else {
        this.showBack = true;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.setShowBack(to.path);
    }
  },
  created() {
    this.setShowBack(window.location.pathname);
  }
};
</script>

<style lang="scss">
@import "./sass/themes";

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  padding: 10px;
  display: flex;
}

.c {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: map-get($LIGHT, primary);
  box-shadow: 0 0 9px map-get($LIGHT, secondary);
  overflow-y: auto;
}

.DARK .c {
  background-color: map-get($DARK, primary);
  box-shadow: map-get($DARK, primary);
}

@media only screen and (min-width: 600px) {
  .c {
    border-radius: 26px;
  }
}
</style>
