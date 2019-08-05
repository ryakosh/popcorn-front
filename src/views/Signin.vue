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

import { store, keys } from "../store.js";
import { server, getErrorMsg } from "../server.js";

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
            store.set(keys.TOKEN, res.data.payload.token);

            this.$emit("on-notify", {
              type: "SUCCESS",
              msg: "Successfully signed in"
            });

            this.$router.push("/");
          })
          .catch(err => {
            if (err.response) {
              const res = err.response;

              this.$emit("on-notify", {
                type: "ERROR",
                msg: getErrorMsg(res.data.error, res.statusText)
              });
            } else if (err.request) {
              this.$emit("on-notify", {
                type: "ERROR",
                msg: getErrorMsg(null, "Error connecting to the server")
              });
            } else {
              console.error("Error creating the request object");
            }
          });
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
  height: 91%;
  display: flex;
  flex-direction: column;

  &__top,
  &__bottom {
    width: 100%;
    height: auto;
    text-align: center;
  }

  &__mode {
    margin-top: 40px;
    font-size: 25px;
    display: inline-block;
  }

  &__center {
    width: 100%;
    height: 100%;
    padding: 30px;
    display: block;
    text-align: center;
    margin-top: 80px;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  &__input {
    width: 100%;
    margin-bottom: 16px;
  }

  &__signin {
    background-color: map-get($LIGHT, secondary);
    color: map-get($LIGHT, primary);
    font-size: 14px;
    margin-top: 20px;
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
