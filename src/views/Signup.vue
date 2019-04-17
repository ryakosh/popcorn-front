<template>
  <div class="signup-view">
    <h2>Sign Up</h2>

    <form class="signup-view__form">
      <pop-text-input placeholder="EMAIL" v-model="input.email"/>
      <pop-text-input placeholder="USERNAME" v-model="input.uname"/>
      <pop-text-input placeholder="PASSWORD" v-model="input.pwd"/>

      <pop-button 
        class="signup-view__signup" 
        @on-click="hClick"
      >SIGNUP</pop-button>
    </form>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import Button from '../components/Button.vue';
import {server, BASE_URL} from '../server.js';

export default {
  name: 'pop-signup-view',
  data() {
    return { 
      input: {
        email: '',
        uname: '',
        pwd: '',
      },
    };
  },
  components: {
    'pop-text-input': TextInput,
    'pop-button': Button,
  },
  methods: {
    hClick() {
      const input = this.input;
      server.signup(BASE_URL, input.uname, input.pwd, input.email);
    },
  },
};
</script>

<style lang="scss">
.signup-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form {
    width: auto;
    height: 245px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__signup {
    color: white;
    background-color: #4C4A48;
  }
}
</style>
