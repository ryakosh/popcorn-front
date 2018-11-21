import axios from 'axios';
import qs from 'qs';

class Server {
  constructor(xConfig = { /* Default axios config */ }) {
    this.x = axios.create(xConfig);
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
}