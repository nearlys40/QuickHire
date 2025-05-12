export const API_BASE_URL = "http://localhost:8000/api";

// ✅ เพิ่ม axios instance พร้อม JWT header อัตโนมัติ
import axios from "axios";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 🔄 เพิ่ม refresh token interceptor อัตโนมัติ
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(
          `${API_BASE_URL}/users/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );
        const newAccess = response.data.access;
        localStorage.setItem("access_token", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
