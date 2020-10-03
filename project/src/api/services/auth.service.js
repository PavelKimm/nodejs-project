import axios from "axios";

import { baseUrl } from "../../constants";

export const login = async (email, password) => {
  await axios
    .post(baseUrl + `/api/login/`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
      }
    })
    .catch((error) => {
      const errorMessage = error.response.data.msg;
      console.warn(errorMessage);
      return error;
    });
};

export const register = async (
  email,
  firstName,
  lastName,
  password,
  password2
) => {
  return await axios.post(baseUrl + `/api/register/`, {
    email,
    firstName,
    lastName,
    password,
    password2,
  });
};

export const getUserData = async () => {
  const token = getTokenFromLocalStorage();
  if (
    await tokenIsValid(token).then((res) => {
      return res.data;
    })
  ) {
    return getUserDataFromToken(token);
  } else {
    return undefined;
  }
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("auth-token");
};

export const tokenIsValid = async (token) => {
  return axios.post(baseUrl + `/api/validate-jwt/`, null, {
    headers: { "x-auth-token": token },
  });
};

export const getUserDataFromToken = async (token) => {
  return axios.get(baseUrl + `/api/current-user-data/`, {
    headers: { "x-auth-token": token },
  });
};

export function logout() {
  localStorage.removeItem("auth-token");
}
