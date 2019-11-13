<template>
  <div id="app" :class="{ DARK: prvt.isDark }">
    <div class="c">
      <pop-nav
        :showBack="prvt.showBack"
        :showAuth="!shrd.token"
        @on-click-back="hClickBack"
        @on-click-auth="hClickAuth"
        @on-click-logo="hClickLogo"
        @on-click-search="hClickSearch"
        @on-dark="hDark"
      />
      <router-view @on-notify="hNotify"></router-view>
    </div>

    <pop-search
      v-show="prvt.showSearch"
      @on-click-cancel="hClickCancel"
      @on-notify="hNotify"
    />

    <pop-notification
      :type="prvt.notification.type"
      :msg="prvt.notification.msg"
      :show="prvt.notification.show"
    />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Search from "./components/Search.vue";
import Notification from "./components/Notification.vue";
import store from "./store.js";

let nTimeoutID = null;

export default {
  data() {
    return {
      shrd: store.state,
      prvt: {
        showBack: false,
        showSearch: false,
        isDark: false,
        notification: {
          type: "SUCCESS",
          msg: "",
          show: false
        }
      }
    };
  },
  components: {
    "pop-nav": Nav,
    "pop-search": Search,
    "pop-notification": Notification
  },
  methods: {
    hClickBack() {
      this.$router.go(-1);
    },
    hClickAuth() {
      this.$router.push("/signup");
    },
    hClickLogo() {
      this.$router.push("/");
    },
    hClickSearch() {
      this.prvt.showSearch = true;
    },
    hClickCancel() {
      this.prvt.showSearch = false;
    },
    hDark(isDark) {
      this.prvt.isDark = isDark;
    },
    hNotify(notification) {
      this.prvt.notification = Object.assign(
        {},
        this.prvt.notification,
        notification
      );
      this.prvt.notification.show = true;

      window.clearTimeout(nTimeoutID);
      nTimeoutID = window.setTimeout(() => {
        this.prvt.notification.show = false;
      }, 4000);
    },
    setShowBack(path) {
      if (path === "/") {
        this.prvt.showBack = false;
      } else {
        this.prvt.showBack = true;
      }
    }
  },
  watch: {
    $route(to) {
      this.setShowBack(to.path);
    }
  },
  created() {
    this.setShowBack(window.location.pathname);
    store.setToken();
    store.setUname();
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
  padding: 8px;
  display: flex;
}

#app .c {
  width: 100%;
  height: 100%;
  border-radius: 27px;
  background-color: map-get($LIGHT, primary);
  box-shadow: 0 0 9px map-get($LIGHT, secondary);
  overflow-y: auto;
  will-change: transform;
}

.DARK .c {
  background-color: map-get($DARK, primary) !important;
  box-shadow: map-get($DARK, primary) !important;
}

@media only screen and (min-width: 600px) {
  .c {
    border-radius: 32px;
  }
}

@media only screen and (min-width: 768px) {
  .c {
    border-radius: 42px;
  }
}
</style>
