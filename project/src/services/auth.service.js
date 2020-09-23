import axios from "axios";

import { baseUrl } from "../components/constants";

export function login(username, password) {
  return axios
    .post(baseUrl + `/api/auth/login/`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

export function logout() {
  localStorage.removeItem("user");
}

export function register(username, password) {
  return axios.post(baseUrl + `/api/auth/register/`, {
    username,
    password,
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
