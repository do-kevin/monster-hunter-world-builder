import axios from 'axios';
import NProgress from 'multi-nprogress';

const nprogress = NProgress();

class Api {
  constructor() {
    this.authenticated = false;
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  login(callback) {
    this.authenticated = true;
    callback();
  }

  logout(callback) {
    nprogress.start();
    this.authenticated = false;
    nprogress.done();
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  defaultInstance() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  authInstance(token) {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER_URL,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  urlencodedInstance() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async request(url = '', method = '', data = {}) {
    try {
      nprogress.set(0.5);
      const response = await this.instance({
        method,
        data,
        url,
      });
      console.log(response);
      nprogress.done();
      return response;
    } catch (error) {
      const { statusText, status } = error.request;
      console.error(error.request);
      nprogress.done();
      return `${statusText} (${status})`;
    }
  }

  async post(url, data) {
    nprogress.start();
    return this.request(url, 'post', data);
  }

  async get(url) {
    return this.request(url, 'get');
  }
}

const api = new Api();

export default api;
