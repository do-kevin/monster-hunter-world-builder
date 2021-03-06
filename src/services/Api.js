import axios from "axios";
import NProgress from "multi-nprogress";
import { toast } from "react-toastify";

const nprogress = NProgress();
nprogress.configure({ showSpinner: false });

toast.configure({
  autoClose: 1500,
  hideProgressBar: true,
});

class Api {
  constructor() {
    this.instance = this.createInstance();
  }

  createInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  setToken(token) {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER_URL,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  reset() {
    this.instance = this.createInstance();
  }

  async request(url = "", method = "", data = {}) {
    try {
      nprogress.start();
      const response = await this.instance({
        method,
        data,
        url,
      });
      return response.data;
    } catch (error) {
      console.error(error.request);
      if (error.message && error.request.statusText) {
        toast.error(`${error.message}\n${error.request.statusText}`);
      } else {
        toast.error(error.message);
      }
      return false;
    } finally {
      nprogress.done();
    }
  }

  async post(url, data) {
    return this.request(url, "post", data);
  }

  async put(url, data) {
    return this.request(url, "put", data);
  }

  async get(url) {
    return this.request(url, "get");
  }
}

const api = new Api();

export default api;
