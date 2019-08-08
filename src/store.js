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
  set token(token) {
    if (token) {
      this.state.token = token;
      storage.set(keys.TOKEN, token);
    } else {
      this.state.token = "";
      storage.remove(keys.TOKEN);
    }
  }
};
