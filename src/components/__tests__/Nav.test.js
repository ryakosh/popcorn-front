import { shallowMount } from "@vue/test-utils";
import Nav from "../Nav.vue";

describe("Nav component", () => {
  it("emits appropriate events when it's buttons get clicked", () => {
    const w = shallowMount(Nav, {
      propsData: {
        showBack: true
      }
    });

    w.find(".nav__back").vm.$emit("on-click");
    w.find(".nav__auth").vm.$emit("on-click");
    w.find(".nav__center img").trigger("click");
    w.find(".nav__theme-switcher").vm.$emit("on-click");
    w.find(".nav__search").vm.$emit("on-click");

    const navEmitted = w.emitted();

    expect(navEmitted["on-click-back"]).toBeDefined();
    expect(navEmitted["on-click-auth"]).toBeDefined();
    expect(navEmitted["on-click-logo"]).toBeDefined();
    expect(navEmitted["on-dark"][0][0]).toBe(true);
    expect(navEmitted["on-click-search"]).toBeDefined();
  });

  it("applies the appropriate transition classes for back button", () => {
    const w = shallowMount(Nav, {
      propsData: {
        showBack: false
      }
    });
    const back = w.find(".nav__back");
    const auth = w.find(".nav__auth");

    let backClasses = back.classes();
    let authClasses = auth.classes();

    expect(backClasses).not.toContain("fade-scroll_back");
    expect(authClasses).not.toContain("scroll_auth");

    w.setProps({ showBack: true });
    backClasses = back.classes();
    authClasses = auth.classes();

    expect(backClasses).toContain("fade-scroll_back");
    expect(authClasses).toContain("scroll_auth");
  });
});
