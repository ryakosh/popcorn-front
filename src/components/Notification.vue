<template>
  <div :class="['c-notification', { 'c-notification_show': show }]">
    <div :class="['notification', `notification_${type}`]">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "pop-notification",
  props: {
    type: {
      type: String,
      default: "SUCCESS"
    },
    msg: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
.c-notification {
  width: 100%;
  height: auto;
  transition: transform 0.5s;
  position: fixed;
  left: 0;
  bottom: -45px;
  transform: translateY(0);
  display: flex;
  justify-content: center;

  &_show {
    transform: translateY(-60px);
  }

  .notification {
    width: auto;
    max-width: 90%;
    padding: 5px;
    border-radius: 2.5px;
    font-size: 15px;
    color: white;

    &_SUCCESS {
      background-color: #388e3c;
    }

    &_INFO {
      background-color: #1976d2;
    }

    &_ERROR {
      background-color: #d32f2f;
    }
  }
}

@media only screen and (min-width: 600px) {
  .c-notification {
    bottom: -66px;

    &_show {
      transform: translateY(-83px);
    }

    .notification {
      padding: 18px 17px;
      font-size: 22px;
    }
  }
}

@media only screen and (min-width: 768px) {
  .c-notification {
    bottom: -90px;

    &_show {
      transform: translateY(-110px);
    }

    .notification {
      padding: 25px 24px;
      font-size: 29px;
    }
  }
}
</style>
