import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if needed
});

// optional: attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const addClient = (data) => API.post("/clients", data);
export const getAllClients = () => API.get("/clients");
export const getClientById = (id) => API.get(`/clients/${id}`);

export default API;
