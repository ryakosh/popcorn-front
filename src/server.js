import axios from "axios";

const BASE_URL_API =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/popcorn/"
    : "https://api.popcrn.ir:443/popcorn/";
export const BASE_URL_POSTERS =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:80/posters/"
    : "https://popcrn.ir:443/posters/";

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
      movie: {},
      movieRating: {}
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

  movieRating(token, movieId) {
    if (this.hasCache("movieRating", movieId)) {
      return this.getCache("movieRating", movieId);
    }

    const res = axios.get(`${BASE_URL_API}movies/${movieId}/rate`, {
      headers: {
        authorization: Server.authorization(token)
      }
    });
    this.addCache("movieRating", movieId, res);
    return res;
  }
  cMovieRating(token, movieId, userRating) {
    return axios.post(
      `${BASE_URL_API}movies/${movieId}/rate`,
      { user_rating: userRating },
      {
        headers: {
          authorization: Server.authorization(token)
        }
      }
    );
  }
  uMovieRating(token, movieId, userRating) {
    return axios.update(
      `${BASE_URL_API}movies/${movieId}/rate`,
      { user_rating: userRating },
      {
        headers: {
          authorization: Server.authorization(token)
        }
      }
    );
  }
  dMovieRating(token, movieId) {
    return axios.delete(`${BASE_URL_API}movies/${movieId}/rate`, {
      headers: {
        authorization: Server.authorization(token)
      }
    });
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

  deleteCache(req, k) {
    delete this.cache[req][k];
  }

  static genCacheKey(...args) {
    return args.join("");
  }

  static authorization(token) {
    return `Bearer ${token}`;
  }
}

export const server = new Server();
