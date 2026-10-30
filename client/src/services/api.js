import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");
const apiBaseURL = configuredBaseURL
  ? `${configuredBaseURL.replace(/\/api$/i, "")}/api`
  : import.meta.env.DEV
    ? "http://localhost:5001/api"
    : undefined;

if (!apiBaseURL) {
  throw new Error("VITE_API_BASE_URL must be configured for production.");
}

const api = axios.create({
  baseURL: apiBaseURL,
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;