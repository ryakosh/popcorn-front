import axios from "axios";

export const BASE_URL_API = "http://localhost:8000/popcorn/";
export const BASE_URL_ASSETS = "http://localhost:80/assets/";

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

  movies(baseURL, search = null, limit = null, page = null, filters = null) {
    const k = Server.genCacheKey(search, limit, page, filters);

    if (this.hasCache("movies", k)) {
      return this.getCache("movies", k);
    }

    const res = axios.get(`${baseURL}movies`, {
      params: { search, limit, page, filters }
    });
    this.addCache("movies", k, res);
    return res;
  }

  movie(baseURL, id) {
    if (this.hasCache("movie", id)) {
      return this.getCache("movie", id);
    }

    const res = axios.get(`${baseURL}movies/${id}`);
    this.addCache("movie", id, res);
    return res;
  }

  signup(baseURL, email, uname, pwd) {
    return axios.post(`${baseURL}auth/signup`, { uname, pwd, email });
  }

  signin(baseURL, uname, pwd) {
    return axios.post(`${baseURL}auth/signin`, { uname, pwd });
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
