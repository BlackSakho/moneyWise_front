import axios from "axios";

const API = axios.create({
  baseURL: "https://moneywise-9crf.onrender.com/api",
});

// 🔐 Ajouter automatiquement le token s’il existe
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// === AUTH ===
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await API.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// === TRANSACTIONS ===
export const getTransactions = () => API.get("/transactions");
export const addTransaction = (data) => API.post("/transactions", data);
export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// === CATÉGORIES ===
export const getCategories = () => API.get("/categories");

// === PROFIL ===
export const getProfile = () => API.get("/users/me");

export default API;
