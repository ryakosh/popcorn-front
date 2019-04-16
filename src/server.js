import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/popcorn';

export function movies(baseURL, search, limit='', page='', filters='') {
    return axios.get(`${baseURL}/movies`, {
        params: { search, limit, page, filters },
    });
}

export function movie(baseURL, id) {
    return axios.get(`${baseURL}/movies/${id}`);
}

export function signup(baseURL, uname, pwd, email) {
    return axios.post(`${baseURL}/auth/signup`, { uname, pwd, email});
}