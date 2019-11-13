import { storage, keys } from "./storage.js";
import { BASE_URL_POSTERS } from "./server.js";

export default {
  state: {
    token: "",
    BASE_URL_POSTERS,
    uname: ""
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
  },
  setUname(uname) {
    if (uname) {
      this.state.token = uname;
      storage.set(keys.UNAME, uname);
    } else if (uname === undefined) {
      this.state.uname = storage.get(keys.UNAME);
    } else {
      this.state.uname = "";
      storage.remove(keys.UNAME);
    }
  }
};
