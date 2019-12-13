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
      :type="type"
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
          <div class="validator-input__desc">
            {{ validator.description }}
          </div>
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
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    hInput(value) {
      this.validators.forEach((validator, i) => {
        this.$set(this.validations, i, validator.func(value));
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
  color: #212121;
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
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    background-color: #212121;
    box-shadow: 0 0 5px map-get($LIGHT, secondary);
    color: white;
    border-radius: 2.5px;
    display: none;
    flex-direction: column;
  }
  &__subject {
    width: 100%;
    height: auto;
    font-size: 10px;
    text-transform: uppercase;
    display: inline-block;
  }
  &__validations {
    width: 100%;
    height: 100%;
    margin-left: 5px;
  }
  &__validation {
    width: auto;
    height: auto;
    margin-top: 5px;
    display: flex;
    align-items: center;
  }
  &__check {
    width: 9px;
    height: 9px;
    margin-right: 5px;
    background-color: #d32f2f;
    border-radius: 1px;
    transition: background-color, 0.4s;

    &_valid {
      background-color: #388e3c;
    }
  }

  &__desc {
    width: 100%;
    font-size: 13px;
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
