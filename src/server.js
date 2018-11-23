import axios from 'axios';
import qs from 'qs';

class Server {
  constructor() {
    this.x = axios.create({
      baseURL: 'localhost:5000/',
    });
    this.cache = {};
  }

  signup(email, uname, pwd) {
    const data = qs.stringify({ email, uname, pwd });
    return this.x.post('/signup', data);
  }

  signin(uname, pwd) {
    const data = qs.stringify({ uname, pwd });
    return this.x.post('/signin', data);
  }

  movies() {
    return this.x.get('/movies');
  }

  movie(id) {
    return this.x.get(`/movies/${id}`);
  }
}

export default Server();