export const keys = {
  TOKEN: "token"
};

const _storage = window.localStorage;
export const store = {
  set(k, v) {
    _storage.setItem(k, v);
  },
  get(k) {
    return _storage.getItem(k);
  },
  remove(k) {
    _storage.removeItem(k);
  }
};