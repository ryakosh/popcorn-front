<template>
  <div
    :class="[
      'validator-input',
      {
        'validator-input_valid': this.isValid,
        'validator-input_in-valid': !this.isValid && this.value
      }
    ]"
  >
    <pop-text-input
      class="validator-input__field"
      @input="hInput"
      :placeholder="subject"
    />

    <div class="validator-input__feedback">
      <span class="validator-input__subject">{{ subject }} should:</span>
      <div class="validator-input__validations">
        <div
          class="validator-input__validation"
          v-for="(validator, i) of validators"
          :key="i"
        >
          <div
            :class="[
              'validator-input__check',
              {
                'validator-input__check_valid': validations[i]
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
  name: "pop-validator-input",
  data() {
    return {
      value: "",
      isValid: false,
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

      this.isValid = this.validations.every(validation => validation);
      this.value = value;

      this.$emit("on-input", { value: this.value, isValid: this.isValid });
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

.validator-input {
  width: 100%;
  height: auto;
  color: map-get($LIGHT, secondary);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__field {
    width: 100%;
    transition: box-shadow 0.4s;
  }
  &_valid &__field {
    box-shadow: 0 0 6px #388e3c;
  }
  &_in-valid &__field {
    box-shadow: 0 0 6px #d32f2f;
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
    transition: background-color, 0.4s;

    &_valid {
      background-color: #388e3c;
    }
  }
}

.DARK .validator-input {
  color: map-get($DARK, secondary);

  &__feedback {
    background-color: map-get($DARK, primary);
    box-shadow: 0 0 6px map-get($DARK, secondary);
  }
}
</style>
