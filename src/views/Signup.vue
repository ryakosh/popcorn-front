<template>
  <div class="signup-view">
    <div class="signup-view__top">
      <span class="signup-view__mode">
        Sign Up
      </span>
    </div>
    <div class="signup-view__center">
      <pop-validator-input
        class="signup-view__input"
        subject="Email"
        :validators="email.validators"
        @on-input="email.value = $event"
      />
      <pop-validator-input
        class="signup-view__input"
        subject="Username"
        :validators="uname.validators"
        @on-input="uname.value = $event"
      />
      <pop-validator-input
        class="signup-view__input"
        subject="Password"
        :validators="pwd.validators"
        @on-input="pwd.value = $event"
      />

      <pop-button class="signup-view__signup" @on-click="hSignupClick">
        SIGN UP
      </pop-button>
    </div>
    <div class="signup-view__bottom">
      <span>
        Already Signed Up?
        <router-link to="/signin" class="signup-view__link">
          Sign In
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import ValidatorInput from "../components/ValidatorInput.vue";
import Button from "../components/Button.vue";

import { store, keys } from "../store.js";
import { BASE_URL_API, server, getErrorMsg } from "../server.js";
import {
  isEmailValid,
  hasUnameValidChars,
  hasUnameValidLen,
  hasPwdValidLen
} from "../validators.js";

export default {
  name: "pop-signup-view",
  data() {
    return {
      email: {
        value: "",
        validators: [
          {
            description: "Be a valid email address",
            func: isEmailValid
          }
        ]
      },
      uname: {
        value: "",
        validators: [
          {
            description: "Only contain letters, digits, underline and dash",
            func: hasUnameValidChars
          },
          {
            description: "Have at least 1 and at most 30 characters",
            func: hasUnameValidLen
          }
        ]
      },
      pwd: {
        value: "",
        validators: [
          {
            description: "Have at least 8 and at most 50 characters",
            func: hasPwdValidLen
          }
        ]
      }
    };
  },
  methods: {
    hSignupClick() {
      if (
        this.areValuesValid(this.email.value, this.uname.value, this.pwd.value)
      ) {
        server
          .signup(
            BASE_URL_API,
            this.email.value.value,
            this.uname.value.value,
            this.pwd.value.value
          )
          .then(() => {
            this.$emit("on-notify", {
              type: "SUCCESS",
              msg: "Successfully signed up"
            });
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
          msg: "Please fill the required fields correctly"
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
    "pop-validator-input": ValidatorInput,
    "pop-button": Button
  }
};
</script>

<style lang="scss">
@import "../sass/_themes.scss";

.signup-view {
  width: 100%;
  height: 91%;
  display: flex;
  flex-direction: column;

  &__top,
  &__bottom {
    width: 100%;
    height: auto;
    text-align: center;
    color: map-get($LIGHT, secondary);
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
    display: flex;
    margin-top: 80px;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  &__input {
    margin-bottom: 16px;
  }

  &__signup {
    background-color: map-get($LIGHT, secondary);
    color: map-get($LIGHT, primary);
    font-size: 14px;
    margin-top: 20px;
  }
}

.DARK .signup-view {
  &__top,
  &__bottom {
    color: map-get($DARK, secondary);
  }

  &__signup {
    background-color: map-get($DARK, secondary);
    color: map-get($DARK, primary);
  }
}
</style>
