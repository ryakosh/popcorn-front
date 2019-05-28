import axios from "axios";

export const BASE_URL_API = "http://192.168.1.6:8000/popcorn/";
export const BASE_URL_ASSETS = "http://192.168.1.6:80/assets/";

export class Server {
  constructor() {
    this.cache = {
      movies: {},
      movie: {},
      signup: {}
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

  signup(baseURL, uname, pwd, email) {
    return axios.post(`${baseURL}auth/signup`, { uname, pwd, email });
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
