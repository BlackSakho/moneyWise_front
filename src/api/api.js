
import axios from "axios";

// 👉 Base URL du backend 
const API_URL = "https://moneywise-9crf.onrender.com/api";

// Instance Axios configurée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Fonction Login
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

//  Fonction Register
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (email) => {
  return api.post("/auth/forgot-password", { email });
};

//  Exemple d’appel sécurisé
export const getUserProfile = async (token) => {
  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
