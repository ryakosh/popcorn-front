import { shallowMount } from "@vue/test-utils";
import TextInput from "../TextInput.vue";

describe("TextInput component", () => {
  it("emits it's input element value up", () => {
    const w = shallowMount(TextInput);

    w.find(".text-input").setValue("Test value");
    expect(w.emitted()["input"][0][0]).toBe("Test value");
  });
});
