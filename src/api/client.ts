import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../constants/api";
import { logError, logRequest, logResponse } from "../utils/errorHandler";
import { storage } from "../utils/storage";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getItem("auth_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (__DEV__) {
      logRequest(config);
    }

    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error("Request Error:", error);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      logResponse(response);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    if (__DEV__) {
      logError(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await storage.removeItem("auth_token");
      await storage.removeItem("user_data");

      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      console.error("Access Forbidden");
    }

    if (error.response?.status === 500) {
      console.error("Server Error");
    }

    if (!error.response && originalRequest) {
      const retryCount = originalRequest._retryCount || 0;

      if (retryCount < 3) {
        originalRequest._retryCount = retryCount + 1;

        await new Promise((resolve) => setTimeout(resolve, 500));

        return apiClient(originalRequest);
      } else {
        console.error("Max retries reached");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
