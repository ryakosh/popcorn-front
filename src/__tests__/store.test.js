import store from "../store.js";
import { storage, keys } from "../storage.js";

describe("store module", () => {
  it("token setter and getter should work correctly", () => {
    const testToken = "testToken";

    store.setToken(testToken);
    expect(store.state.token).toBe(testToken);
    expect(storage.get(keys.TOKEN)).toBe(testToken);

    store.setToken();
    expect(store.state.token).toBe(testToken);
    expect(storage.get(keys.TOKEN)).toBe(testToken);

    store.setToken("");
    expect(store.state.token).toBe("");
    expect(storage.get(keys.TOKEN)).toBe(null);

    store.setToken(null);
    expect(store.state.token).toBe("");
    expect(storage.get(keys.TOKEN)).toBe(null);
  });
});
