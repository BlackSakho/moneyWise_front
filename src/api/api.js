
import axios from "axios";

// 👉 Base URL du backend 
const API_URL = "http://localhost:5000/api";

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
