import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const activityApi = axios.create({
  baseURL: "http://localhost:8080/activity",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

//  adiciona o token JWT
activityApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Buscar todas as atividades do usuário logado
export const getUserActivities = async () => {
  const response = await activityApi.get("/");
  return response.data;
};

// Buscar uma atividade específica pelo ID
export const getActivityById = async (id: number) => {
  const response = await activityApi.get(`/${id}`);
  return response.data;
};

// Criar nova atividade
export const createActivity = async (activityData: any) => {
  const response = await activityApi.post("/", activityData);
  return response.data;
};

// Atualizar uma atividade
export const updateActivity = async (id: number, updates: any) => {
  const response = await activityApi.patch(`/${id}`, updates);
  return response.data;
};

// Deletar uma atividade
export const deleteActivity = async (id: number) => {
  const response = await activityApi.delete(`/${id}`);
  return response.data;
};

export default activityApi;
