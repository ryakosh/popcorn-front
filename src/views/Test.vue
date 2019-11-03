<template>
  <div>
    <pop-rate-button :user_rating="4" />
  </div>
</template>

<script>
import RateButton from "../components/RateButton.vue";

export default {
  name: "pop-test-view",
  components: {
    "pop-rate-button": RateButton
  }
};
</script>

<style></style>
