import axios from "axios";
import {log} from "#src/js/logger";

const createApi = () => {
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    timeout: 10000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    response.ok = true;
    return response;
  };

  const onError = (error) => {
    switch (error.status) {
      case 400:
        return error;
      case 401:
      case 402:
      case 403:
        return error;
      default:
        return error;
    }
  };

  api.defaults.withCredentials = true;
  api.interceptors.response.use(onSuccess, onError);
  return api;
};

export default createApi;
