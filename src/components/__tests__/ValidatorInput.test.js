import { shallowMount } from "@vue/test-utils";
import ValidatorInput from "../ValidatorInput.vue";

describe("ValidatorInput component", () => {
  it("should render the correct subject", () => {
    const w = shallowMount(ValidatorInput, {
      propsData: {
        subject: "Test subject",
        validators: []
      }
    });

    expect(w.find(".validator-input__subject").text()).toContain(
      "Test subject"
    );
  });

  it("renders validations correctly", () => {
    const w = shallowMount(ValidatorInput, {
      propsData: {
        subject: "",
        validators: [
          {
            description: "Test description 1",
            func: jest
              .fn()
              .mockReturnValueOnce(true)
              .mockReturnValueOnce(false)
          },
          {
            description: "Test description 2",
            func: jest
              .fn()
              .mockReturnValueOnce(false)
              .mockReturnValueOnce(true)
          }
        ]
      }
    });

    const validations = w.findAll(".validator-input__validation");
    expect(validations.length).toBe(2); // 2 validators = 2 validations
    validations.wrappers.forEach((validation, i) => {
      expect(validation.find(".validator-input__desc").text()).toContain(
        `Test description ${i + 1}`
      );
    });

    // .validator-input__check_valid should only
    // exist when the corrisponding validator returns true
    w.find(".validator-input__field").vm.$emit("input", "Test");
    expect(validations.at(0).contains(".validator-input__check_valid")).toBe(
      true
    );
    expect(validations.at(1).contains(".validator-input__check_valid")).toBe(
      false
    );

    w.find(".validator-input__field").vm.$emit("input", "Test");
    expect(validations.at(0).contains(".validator-input__check_valid")).toBe(
      false
    );
    expect(validations.at(1).contains(".validator-input__check_valid")).toBe(
      true
    );
  });
});
