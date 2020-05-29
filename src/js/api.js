import axios from "axios";
import {err, log} from "#src/js/logger";
import ActionCreator from "#src/js/action-creator";

const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
    timeout: 10000,
  });

  const onSuccess = (response) => {
    response.ok = true;
    return response;
  };

  const onError = (error) => {
    if (!error.response) {
      return undefined;
    }

    switch (error.response.status) {
      case 401:
        dispatch(ActionCreator.resetState());
        break;
      case 500:
      case 501:
      case 502:
      case 503:
        dispatch(ActionCreator.setServerErrors({code: error.response.status}));
        break;
    }

    return error.response;
  };

  api.defaults.withCredentials = true;
  api.interceptors.response.use(onSuccess, onError);
  return api;
};

export default createApi;
