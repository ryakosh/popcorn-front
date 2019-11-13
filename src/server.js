import axios from "axios";

const BASE_URL_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "https://api.popcrn.ir:443/";
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

export function handleError(error, component) {
  if (error.response) {
    const res = error.response;
    component.$emit("on-notify", {
      type: "ERROR",
      msg: getErrorMsg(res.data.error, res.statusText)
    });
  } else if (error.request) {
    component.$emit("on-notify", {
      type: "ERROR",
      msg: getErrorMsg(null, "Error connecting to the server")
    });
  } else {
    console.error("Error creating the request object");
  }
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
      return Promise.resolve(this.getCache("movies", k));
    }

    const res = axios.get(`${BASE_URL_API}movies`, {
      params: { search, limit, page, filters }
    });

    return res.then(res => {
      this.addCache("movies", k, res.data.payload);
      return res.data.payload;
    });
  }

  movie(id, token = null) {
    if (this.hasCache("movie", id)) {
      return Promise.resolve(this.getCache("movie", id));
    }

    const res = axios.get(`${BASE_URL_API}movies/${id}`, {
      headers: {
        authorization: token ? Server.authorization(token) : token
      }
    });

    return res.then(res => {
      this.addCache("movie", id, res.data.payload);
      return res.data.payload;
    });
  }

  signup(email, uname, pwd) {
    return axios.post(`${BASE_URL_API}auth/signup`, { uname, pwd, email });
  }

  signin(uname, pwd) {
    this.cache.movie = {}; // TODO: Find a better solution
    return axios.post(`${BASE_URL_API}auth/signin`, { uname, pwd });
  }

  cMovieRating(token, movieId, userRating, uname) {
    const res = axios.post(
      `${BASE_URL_API}users/${uname}/movies/${movieId}?rate`,
      { user_rating: userRating },
      {
        headers: {
          authorization: Server.authorization(token)
        }
      }
    );

    return res.then(() => {
      this.cache.movie[movieId].u.rating = userRating;
      return userRating;
    });
  }
  uMovieRating(token, movieId, userRating, uname) {
    const res = axios.put(
      `${BASE_URL_API}users/${uname}/movies/${movieId}?rate`,
      { user_rating: userRating },
      {
        headers: {
          authorization: Server.authorization(token)
        }
      }
    );

    return res.then(() => {
      this.cache.movie[movieId].u.rating = userRating;
      return userRating;
    });
  }
  dMovieRating(token, movieId, uname) {
    const res = axios.delete(
      `${BASE_URL_API}users/${uname}/movies/${movieId}?rate`,
      {
        headers: {
          authorization: Server.authorization(token)
        }
      }
    );

    return res.then(() => {
      this.cache.movie[movieId].u.rating = 0;
      return 0;
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
