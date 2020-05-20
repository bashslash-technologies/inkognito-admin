import axios from "axios";
import { toaster } from "evergreen-ui";
import { BASE_URL } from "./index";

axios.defaults.baseURL = `${BASE_URL}/api/v1`; //

const config = {
  headers: {},
};

function notifyError(msg: string) {
  toaster.danger("Error", {
    description: msg,
  });
}

const errorhandler = (error: any) => {
  if (error.message === "Network Error") {
    notifyError("Network connection lost. Connect and try again");
    return;
  }
  return Promise.reject({ ...error });
};

const successHandler = (response: any) => {
  return response;
};

const setToken = (config?: any) => {
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Accept"] = "application/json";
  console.log(config);
  return config;
};

axios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorhandler(error)
);

axios.interceptors.request.use(
  (config) => setToken(config),
  (error) => Promise.reject(error)
);

export const post = (route: string, payload: any) =>
  new Promise(function (resolve, reject) {
    axios
      .post(route, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const patch = (route: string, payload: any) =>
  new Promise(function (resolve, reject) {
    axios
      .patch(route, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const get = (route: string) =>
  new Promise((resolve, reject) => {
    axios
      .get(route, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const delete_request = (route: string) =>
  new Promise((resolve, reject) => {
    axios
      .delete(route)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
