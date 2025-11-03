import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.3:8000", // URL do FastAPI
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error, console.log("Não tem token"))
);

export default api;
