import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/popcorn';

export function getMovies(baseUrl, search, limit='', page='', filters='') {
    return axios.get(`${baseUrl}/movies`, {
        params: { search, limit, page, filters },
    });
}

export function getMovie(baseUrl, id) {
    return axios.get(`${baseUrl}/movies/${id}`);
}

