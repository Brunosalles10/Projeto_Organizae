import AsyncStorage from "@react-native-async-storage/async-storage";

// Salva o token JWT
export const saveToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem("token", token);
};

// Recupera o token JWT
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("token");
};

// Salva o usuário logado
export const saveUser = async (user: any): Promise<void> => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

// Recupera o usuário logado
export const getUser = async (): Promise<any | null> => {
  const data = await AsyncStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

// Limpa tudo (logout)
export const clearStorage = async (): Promise<void> => {
  await AsyncStorage.multiRemove(["token", "user"]);
};
