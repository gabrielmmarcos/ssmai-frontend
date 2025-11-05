import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost" // URL do FastAPI
      ? "http://localhost:8000"
      : "http://3.14.131.221:8000",
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
