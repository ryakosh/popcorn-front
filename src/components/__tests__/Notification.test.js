import { shallowMount } from "@vue/test-utils";
import Notification from "../Notification.vue";

describe("Notification component", () => {
  it("should use the specified notification type", () => {
    const w = shallowMount(Notification, {
      propsData: {
        type: "SUCCESS",
        msg: "",
        show: false
      }
    });

    const notification = w.find(".notification");

    let notificationClasses = notification.classes();
    expect(notificationClasses).toContain("notification_SUCCESS");

    w.setProps({ type: "ERROR" });
    notificationClasses = notification.classes();
    expect(notificationClasses).toContain("notification_ERROR");
  });

  it("renders the specified message", () => {
    const w = shallowMount(Notification, {
      propsData: {
        msg: "Test message",
        show: false
      }
    });
    const notification = w.find(".notification");

    expect(notification.text()).toContain("Test message");
  });
});
