<template>
  <div class="signup-view">
    <div class="signup-view__top">
      <span class="signup-view__mode">
        Sign Up
      </span>
    </div>
    <div class="signup-view__center">
      <pop-validator-input
        class="signup-view__input signup-view__email"
        type="email"
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
        type="password"
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

import { server, handleError } from "../server.js";
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
            this.email.value.value,
            this.uname.value.value,
            this.pwd.value.value
          )
          .then(() => {
            this.$emit("on-notify", {
              type: "SUCCESS",
              msg: "Successfully signed up"
            });

            this.$router.push("/signin");
          })
          .catch(err => handleError(err, this));
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
  &__email {
    text-transform: lowercase;
  }

  &__signup {
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
