import { shallowMount } from "@vue/test-utils";
import Plaque from "../Plaque.vue";

describe("Plaque component", () => {
  it("renders correcty", () => {
    const w = shallowMount(Plaque, {
      propsData: {
        left: "Test left",
        right: "Test right"
      }
    });

    expect(w.find(".plaque__left").text()).toContain("Test left");
    expect(w.find(".plaque__right").text()).toContain("Test right");
  });
});
