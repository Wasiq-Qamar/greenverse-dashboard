import axios from "axios";
import { getSessionCookie } from "../../utility/session";

const instance = axios.create({
  // baseURL: "http://139.59.231.145:8000", //for local development
  // baseURL: "", // for generating build
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getSessionCookie("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
