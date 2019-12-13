<template>
  <div class="signin-view">
    <div class="signin-view__top">
      <span class="signin-view__mode">
        Sign In
      </span>
    </div>
    <div class="signin-view__center">
      <pop-text-input
        class="signin-view__input"
        placeholder="Username"
        v-model="uname"
      />
      <pop-text-input
        class="signin-view__input"
        type="password"
        placeholder="Password"
        v-model="pwd"
      />

      <pop-button class="signin-view__signin" @on-click="hSigninClick">
        SIGN IN
      </pop-button>
    </div>
    <div class="signin-view__bottom">
      <span>
        New User?
        <router-link to="/signup" class="signin-view__link">
          Sign Up
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";

import store from "../store.js";
import { server, handleError } from "../server.js";

export default {
  name: "pop-signin-view",
  data() {
    return {
      uname: "",
      pwd: ""
    };
  },
  methods: {
    hSigninClick() {
      if (this.uname && this.pwd) {
        server
          .signin(this.uname, this.pwd)
          .then(res => {
            store.setToken(res.data.payload.token);
            store.setUname(this.uname);

            this.$emit("on-notify", {
              type: "SUCCESS",
              msg: "Successfully signed in"
            });

            this.$router.push("/");
          })
          .catch(err => handleError(err, this));
      } else {
        this.$emit("on-notify", {
          type: "ERROR",
          msg: "Please fill the required fields"
        });
      }
    },
    areValuesValid(...values) {
      return values.every(value => {
        return value.isValid;
      });
    }
  },
  components: {
    "pop-text-input": TextInput,
    "pop-button": Button
  }
};
</script>

<style lang="scss">
@import "../sass/_themes.scss";

.signin-view {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 15px;
  flex-direction: column;

  &__top,
  &__bottom {
    width: 100%;
    height: auto;
    text-align: center;
    color: map-get($LIGHT, secondary);
  }

  &__mode {
    font-size: 20px;
    display: inline-block;
  }

  &__center {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  &__input {
    width: 80%;
    margin-bottom: 5px;
  }

  &__signin {
    background-color: #ffc107;
    color: white;
    font-size: 13px;
    margin-top: 15px;
    margin-bottom: 3px;
  }

  &__bottom {
    margin-top: 12px;
    font-size: 13px;
  }
}

.DARK .signin-view {
  &__top,
  &__bottom {
    color: map-get($DARK, secondary);
  }

  &__signin {
    background-color: map-get($DARK, secondary);
    color: map-get($DARK, primary);
  }
}
</style>
