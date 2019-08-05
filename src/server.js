import axios from "axios";

const BASE_URL_API =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/popcorn/"
    : "https://api.popcrn.ir:443/popcorn/";
export const BASE_URL_ASSETS =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:80/assets/"
    : "https://popcrn.ir:443/assets/";

const errorMapping = {
  UserNFound: "Incorrect username or password",
  UnameTaken: "Username is taken",
  UnameInvalid: "Username is invalid",
  EmailTaken: "Email address already in use",
  EmailInvalid: "Email is invalid",
  PwdInvalid: "Password is invalid",
  NotFound: "The requested resource was not found"
};

export function getErrorMsg(error, backupPhrase) {
  if (error) {
    return errorMapping[error];
  }
  return backupPhrase;
}

export class Server {
  constructor() {
    this.cache = {
      movies: {},
      movie: {}
    };
  }

  movies(search = null, limit = null, page = null, filters = null) {
    const k = Server.genCacheKey(search, limit, page, filters);

    if (this.hasCache("movies", k)) {
      return this.getCache("movies", k);
    }

    const res = axios.get(`${BASE_URL_API}movies`, {
      params: { search, limit, page, filters }
    });
    this.addCache("movies", k, res);
    return res;
  }

  movie(id) {
    if (this.hasCache("movie", id)) {
      return this.getCache("movie", id);
    }

    const res = axios.get(`${BASE_URL_API}movies/${id}`);
    this.addCache("movie", id, res);
    return res;
  }

  signup(email, uname, pwd) {
    return axios.post(`${BASE_URL_API}auth/signup`, { uname, pwd, email });
  }

  signin(uname, pwd) {
    return axios.post(`${BASE_URL_API}auth/signin`, { uname, pwd });
  }

  addCache(req, k, v) {
    this.cache[req][k] = v;
  }

  getCache(req, k) {
    return this.cache[req][k];
  }

  hasCache(req, k) {
    return this.cache[req].hasOwnProperty(k);
  }

  static genCacheKey(...args) {
    return args.join("");
  }
}

export const server = new Server();
