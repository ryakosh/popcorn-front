import { storage, keys } from "./storage.js";

export default {
  state: {
    token: ""
  },
  get token() {
    if (this.state.token) {
      return this.state.token;
    }
    return storage.get(keys.TOKEN);
  },
  setToken(token) {
    if (token) {
      this.state.token = token;
      storage.set(keys.TOKEN, token);
    } else if (token === undefined) {
      this.state.token = storage.get(keys.TOKEN);
    } else {
      this.state.token = "";
      storage.remove(keys.TOKEN);
    }
  }
};
