export const keys = {
  TOKEN: "token",
  UNAME: "uname"
};

const _driver = window.localStorage;
export const storage = {
  set(k, v) {
    _driver.setItem(k, v);
  },
  get(k) {
    return _driver.getItem(k);
  },
  remove(k) {
    _driver.removeItem(k);
  }
};
