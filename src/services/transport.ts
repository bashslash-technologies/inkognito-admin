import axios from "axios";
import { toaster } from "evergreen-ui";
import { BASE_URL } from "./index";
import Auth from "../services/index";

axios.defaults.baseURL = BASE_URL; //

const config = {
  headers: {},
};

function notifyError(msg: string): void {
  toaster.danger("Error", {
    description: msg,
  });
}

const errorhandler = (error: any): any => {
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
  let token = Auth.getCipher();
  if (token) {
    token = JSON.parse(token).token;
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Accept"] = "application/json";
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
export const all = (route: string[]) =>
  new Promise((resolve, reject) => {
    axios
      .all([route])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
