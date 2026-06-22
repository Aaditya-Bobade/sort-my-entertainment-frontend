import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => localStorage.getItem("accessToken");

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error.response?.data || {};
    const err = new Error(
      payload.message || error.message || "Something went wrong",
    );
    err.status = error.response?.status;
    err.data = payload;
    return Promise.reject(err);
  },
);

export const authApi = {
  login: (body) =>
    axiosInstance.post("/auth/login", body).then((res) => res.data),
  register: (body) =>
    axiosInstance.post("/auth/register", body).then((res) => res.data),
  logout: () => axiosInstance.post("/auth/logout").then((res) => res.data),
  refresh: () => axiosInstance.post("/auth/refresh").then((res) => res.data),
};

export const eventsApi = {
  getAll: () => axiosInstance.get("/events").then((res) => res.data),
  getById: (id) => axiosInstance.get(`/events/${id}`).then((res) => res.data),
};

export const bookingApi = {
  reserve: (body) =>
    axiosInstance.post("/reserve", body).then((res) => res.data),
  confirm: (body) =>
    axiosInstance.post("/bookings", body).then((res) => res.data),
};
