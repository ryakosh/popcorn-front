<template>
  <div id="app">
    <div class="c">
      <pop-nav :showBack="showBack" @on-click="hClick" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  data() {
    return {
      showBack: false
    };
  },
  components: {
    "pop-nav": Nav
  },
  methods: {
    hClick() {
      this.$router.go(-1);
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

<style>
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
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 9px black;
  overflow-y: auto;
}
</style>
