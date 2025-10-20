import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
    // Allows me to import anything specified inside an env. variable file. 
    // It will import the url created in the .env file in frontend. 
  baseURL: import.meta.env.VITE_API_URL || "",   // "" => same origin (https://<app>/)
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        // Passing  a JWT token needs authorization, then bearer, followed by the token.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;