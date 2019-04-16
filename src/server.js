import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/popcorn';

export class Server {
    constructor() {
        this.cache = {
            movies: {},
            movie: {},
            signup: {},
        };
    }

    movies(baseURL, search, limit='', page='', filters='') {
        const k = Server.genCacheKey(search, limit, page, filters);

        if (this.hasCache('movies', k)) {
            return this.getCache('movies', k);
        }

        const res = axios.get(`${baseURL}/movies`, {
            params: { search, limit, page, filters },
        });
        this.addCache('movies', k, res);
        return res;
    }

    movie(baseURL, id) {
        if (this.hasCache('movie', id)) {
            return this.getCache('movie', id);
        }

        const res = axios.get(`${baseURL}/movies/${id}`);
        this.addCache('movie', id, res);
        return res;
    }
    
    signup(baseURL, uname, pwd, email) {
        return axios.post(`${baseURL}/auth/signup`, { uname, pwd, email});
    }

    addCache(req, k, v) {
        this.cache[req][k] = v;
    }

    getCache(req, k) {
        this.cache[req][k];
    }

    hasCache(req, k) {
        this.cache[req].hasOwnProperty(k);
    }

    static genCacheKey(...args) {
        return args.join('');
    }
}