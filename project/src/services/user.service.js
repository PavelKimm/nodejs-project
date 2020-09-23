import axios from "axios";
import authHeader from "./auth-header";

import { baseUrl } from "../components/constants";

export function getPublicContent() {
  return axios.get(baseUrl + `/api/test/all/`);
}

export function getUserBoard() {
  return axios.get(baseUrl + `/api/test/user/`, { headers: authHeader() });
}
