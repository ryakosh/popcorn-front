import { shallowMount } from "@vue/test-utils";
import Card from "../Card.vue";

describe("Card component", () => {
  it("mounts injected content", () => {
    const w = shallowMount(Card, {
      slots: {
        default: "test"
      }
    });
    expect(w.text()).toBe("test");
  });
});
