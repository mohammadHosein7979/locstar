import axios from "axios";
// import { toast } from "react-toastify";
import { API_URL } from "../constants/constats";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      const token = session?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("No session available:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response?.status === 401) {
    //   if (typeof window !== 'undefined') {
    //     window.location.replace("/auth/signin");
    //   }
    // }
    return Promise.reject(error.response.data);
  }
);

export default apiClient;
