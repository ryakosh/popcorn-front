<template>
  <div id="app" :class="{ DARK: isDark }">
    <div class="c">
      <pop-nav
        :showBack="showBack"
        @on-click-back="hClickBack"
        @on-click-auth="hClickAuth"
        @on-click-logo="hClickLogo"
        @on-click-search="hClickSearch"
        @on-dark="hDark"
      />
      <pop-search
        v-show="showSearch"
        @on-click-cancel="hClickCancel"
        @on-notify="hNotify"
      />
      <router-view @on-notify="hNotify"></router-view>
      <pop-notification
        :type="notification.type"
        :msg="notification.msg"
        :show="notification.show"
      />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Search from "./components/Search.vue";
import Notification from "./components/Notification.vue";

let nTimeoutID = null;

export default {
  data() {
    return {
      showBack: false,
      showSearch: false,
      isDark: false,
      notification: {
        type: "SUCCESS",
        msg: "",
        show: false
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
      this.showSearch = true;
    },
    hClickCancel() {
      this.showSearch = false;
    },
    hDark(isDark) {
      this.isDark = isDark;
    },
    hNotify(notification) {
      this.notification = Object.assign({}, this.notification, notification);
      this.notification.show = true;

      window.clearTimeout(nTimeoutID);
      nTimeoutID = window.setTimeout(() => {
        this.notification.show = false;
      }, 4000);
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
    $route(to) {
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
  padding: 8px;
  display: flex;

  .c {
    width: 100%;
    height: 100%;
    border-radius: 27px;
    background-color: map-get($LIGHT, primary);
    box-shadow: 0 0 9px map-get($LIGHT, secondary);
    overflow-y: auto;
  }
}

.DARK .c {
  background-color: map-get($DARK, primary);
  box-shadow: map-get($DARK, primary);
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
