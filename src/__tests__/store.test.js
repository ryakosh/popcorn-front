import { store } from "../store.js";

describe("store module", () => {
  it("should set, get and remove keys correctly", () => {
    const test = {
      key: "key",
      value: "value"
    };

    store.set(test.key, test.value);
    expect(store.get(test.key)).toBe(test.value);

    store.remove(test.key);
    expect(store.get(test.key)).toBeNull();
  });
});
