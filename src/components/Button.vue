<template>
  <button
    :class="[
      'button',
      {
        button_circle: circle,
        button_shadow: shadow,
        button_img: img,
        'button_bg-img': bgImg
      }
    ]"
    type="button"
    @click="hClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "pop-button",
  props: {
    circle: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    },
    img: {
      type: Boolean,
      default: false
    },
    bgImg: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hClick() {
      this.$emit("on-click");
    }
  }
};
</script>

<style lang="scss">
@import "../sass/themes";

.button {
  padding: 10px 13px;
  border: none;
  outline: none;
  border-radius: 100px;
  background-color: map-get($LIGHT, primary);
  font-size: 10px;

  &_circle {
    width: 35.6px;
    height: 35.6px;
    padding: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_shadow {
    box-shadow: 0 0 6px map-get($LIGHT, secondary);
  }

  &_img img {
    width: 24px;
    height: 24px;
  }

  &_bg-img {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px 24px;
  }
}

.DARK .button {
  background-color: map-get($DARK, primary);

  &_shadow {
    box-shadow: 0 0 6px map-get($DARK, secondary);
  }
}

@media only screen and (min-width: 600px) {
  .button {
    &_circle {
      width: 49px;
      height: 49px;
    }

    &_img img {
      width: 31px;
      height: 31px;
    }

    &_bg-img {
      background-size: 31px 31px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .button {
    &_circle {
      width: 72px;
      height: 72px;
    }

    &_img img {
      width: 48px;
      height: 48px;
    }

    &_bg-img {
      background-size: 48px 48px;
    }
  }
}
</style>
