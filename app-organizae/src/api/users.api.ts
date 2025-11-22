import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://10.0.0.194:8080";

const usersApi = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona o token JWT
usersApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Função para login
export const signInApi = async (email: string, password: string) => {
  const response = await usersApi.post("/auth/login", { email, password });
  return response.data;
};

// Função para registro
export const signUpApi = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await usersApi.post("/users", {
    name,
    email,
    password,
  });
  return response.data;
};

// Função para obter o perfil do usuário autenticado
export const getUserProfileApi = async () => {
  const response = await usersApi.get("/users/profile");
  return response.data;
};

// Função para logout
export const signOutApi = async () => {
  await AsyncStorage.removeItem("token");
};

//Função para atualizar o perfil do usuário
export const updateUserApi = async (data: any) => {
  const response = await usersApi.put("/users", data);
  return response.data;
};

//Função para deletar o usuário
export const deleteUserApi = async () => {
  const response = await usersApi.delete("/users");
  return response.data;
};

export default usersApi;
