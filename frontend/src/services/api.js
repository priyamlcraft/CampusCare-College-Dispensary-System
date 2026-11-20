
import axios from "axios";

const API = axios.create({
  baseURL: "https://campuscare-college-dispensary-system.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically to protected API requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("campuscare_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
