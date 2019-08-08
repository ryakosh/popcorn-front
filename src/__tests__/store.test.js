import store from "../store.js";
import { storage, keys } from "../storage.js";

describe("store module", () => {
  it("token setter and getter should work correctly", () => {
    const testToken = "testToken";
    store.token = testToken;
    expect(store.token).toBe(testToken);
    expect(storage.get(keys.TOKEN)).toBe(testToken);

    store.token = ""; // Any falsy value should work
    expect(store.token).toBe(null);

    store.token = null;
    expect(store.token).toBe(null);
  });
});
