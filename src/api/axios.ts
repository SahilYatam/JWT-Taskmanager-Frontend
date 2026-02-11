/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import Axios from "axios";

export const api = Axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        await api.post("/auth/refresh-token", {}, { withCredentials: true });

        processQueue();
        isRefreshing = false;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // Redirect to login if refresh fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

