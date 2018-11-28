<template>
  <div class="signin-view">
    <h2>Sign In</h2>

    <form class="signin-view__form">
      <pop-text-input placeholder="USERNAME" v-model="input.uname"/>
      <pop-text-input placeholder="PASSWORD" v-model="input.pwd"/>

      <pop-button 
        class="signin-view__signin" 
        @on-click="hClick"
      >SIGNIN</pop-button>
    </form>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue';
import Button from '../components/Button.vue';
import server from '../server.js';

export default {
  name: 'pop-signin-view',
  data() {
    return { 
      input: {
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
      server.signin(input.uname, input.pwd);
    },
  },
};
</script>

<style lang="scss">
.signin-view {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form {
    width: auto;
    height: 179px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__signin {
    color: white;
    background-color: #4C4A48;
  }
}
</style>
