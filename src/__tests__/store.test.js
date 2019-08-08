import { storage } from "../storage.js";

describe("storage module", () => {
  it("should set, get and remove keys correctly", () => {
    const test = {
      key: "key",
      value: "value"
    };

    storage.set(test.key, test.value);
    expect(storage.get(test.key)).toBe(test.value);

    storage.remove(test.key);
    expect(storage.get(test.key)).toBeNull();
  });
});
