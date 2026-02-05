import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach JWT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createCase = (data) => API.post("/cases", data);
export const getCases = () => API.get("/cases");

export default API;
