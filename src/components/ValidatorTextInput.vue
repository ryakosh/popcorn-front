<template>
  <div class="validator-text-input">
    <pop-text-input
      class="validator-text-input__field"
      @input="hInput"
      :placeholder="subject"
    />

    <div class="validator-text-input__feedback">
      <span class="validator-text-input__subject"> {{ subject }} should: </span>
      <div class="validator-text-input__validations">
        <div
          class="validator-text-input__validation"
          v-for="(validator, i) of validators"
          :key="i"
        >
          <div
            :class="[
              'validator-text-input__check',
              {
                'validator-text-input__check_valid': validations[i]
              }
            ]"
          ></div>
          <div>{{ getValidatorDescription(validator) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "./TextInput.vue";

export default {
  name: "pop-validator-text-input",
  data() {
    return {
      validations: []
    };
  },
  props: {
    subject: {
      type: String,
      required: true
    },
    validators: {
      type: Array,
      required: true
    }
  },
  methods: {
    getValidatorDescription(func) {
      let description = func.name.split("_");

      if (description[0] === this.subject.toLowerCase()) {
        description.splice(0, 1);
      }

      return description.join(" ");
    },
    hInput(value) {
      this.validators.forEach((validator, i) => {
        this.$set(this.validations, i, validator(value));
      });

      const isValid = this.validations.every(validation => validation);

      this.$emit("on-input", { value, isValid });
    }
  },
  components: {
    "pop-text-input": TextInput
  },
  created() {
    this.validations.length = this.validators.length;
    this.validations.fill(false);
  }
};
</script>

<style lang="scss">
@import "../sass/_themes.scss";

.validator-text-input {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__field {
    width: 100%;
  }

  &__field:focus + &__feedback {
    display: flex;
  }

  &__feedback {
    width: 90%;
    height: auto;
    padding: 9px;
    margin-top: 15px;
    background-color: map-get($LIGHT, primary);
    box-shadow: 0 0 6px map-get($LIGHT, secondary);
    border-radius: 10px;
    display: none;
    flex-direction: column;
  }
  &__subject {
    width: 100%;
    height: auto;
    font-size: 14px;
    display: inline-block;
  }
  &__validations {
    width: 100%;
    height: 100%;
    margin-left: 8px;
  }
  &__validation {
    width: auto;
    height: auto;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  &__check {
    width: 9px;
    height: 9px;
    margin-right: 6px;
    background-color: #d32f2f;
    border-radius: 50%;

    &_valid {
      background-color: #388e3c;
    }
  }
}
</style>
