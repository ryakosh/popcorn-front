<template>
  <div class="nav">
    <div class="nav__left">
      <transition name="fade-scroll_back">
        <pop-button class="nav__back" v-show="showBack" circle img :shadow="false">
          <img src="../assets/nav/back-black.svg">
        </pop-button>
      </transition>
    </div>
    <div class="nav__center">
      <img src="../assets/popcorn.svg" />
    </div>
    <div class="nav__right">
      <pop-button circle img :shadow="false">
        <img src="../assets/nav/person-black.svg">
      </pop-button>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'pop-nav',
  components: {
    'pop-button': Button,
  },
  props: {
    showBack: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.fade-scroll_back-enter-active,
.fade-scroll_back-leave-active {
  transition-property: transform, opacity;
  transition-duration: .4s;
  position: absolute;
}
.fade-scroll_back-enter,
.fade-scroll_back-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.fade-scroll_back-enter-to,
.fade-scroll_back-leave {
  transform: translateX(0);
  opacity: 1;
}

.nav {
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    width: 35.6px;
    height: 35.6px;
  }
}
</style>
