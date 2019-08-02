import { shallowMount } from "@vue/test-utils";
import Button from "../Button.vue";

describe("Button component", () => {
  it('emits "on-click" when clicked', () => {
    const w = shallowMount(Button);
    w.find(".button").trigger("click");
    expect(w.emitted()["on-click"]).toBeTruthy();
  });

  it("activates the requested modifiers", () => {
    const w = shallowMount(Button, {
      propsData: {
        circle: true,
        shadow: true,
        img: true,
        bgImg: false
      }
    });
    const buttonClasses = w.classes();

    expect(buttonClasses).toContain("button_circle");
    expect(buttonClasses).toContain("button_shadow");
    expect(buttonClasses).toContain("button_img");
    expect(buttonClasses).not.toContain("button_bg-img");
  });
});
