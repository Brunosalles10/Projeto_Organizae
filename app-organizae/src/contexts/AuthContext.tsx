import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as activityApi from "../api/activity.api";
import * as usersApi from "../api/users.api";
import {
  clearStorage,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "../utils/storage";

// Definição do contexto de autenticação
interface AuthContextProps {
  user: any | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  updateUserProfile: (id: string | number, data: any) => Promise<void>;
  deleteUserProfile: (id: string | number) => Promise<void>;
  getUserProfile: () => Promise<void>;
  fetchActivities: () => Promise<any[]>;
  getActivityById: (id: number) => Promise<any>;
  createActivity: (data: any) => Promise<any>;
  updateActivity: (id: number, data: any) => Promise<any>;
  deleteActivity: (id: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega o token e os dados do usuário do AsyncStorage ao iniciar
  useEffect(() => {
    (async () => {
      const storedToken = await getToken();
      const storedUser = await getUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
      setLoading(false);
    })();
  }, []);

  // Função de login
  const signIn = async (email: string, password: string) => {
    const response = await usersApi.signInApi(email, password);
    const { access_token, user } = response;
    await saveToken(access_token);
    await saveUser(user);
    setToken(access_token);
    setUser(user);
  };

  // Função de registro
  const signUp = async (data: any) => {
    await usersApi.signUpApi(data.name, data.email, data.password);
  };

  //Função para profile
  const getUserProfile = async () => {
    const profile = await usersApi.getUserProfileApi();
    setUser(profile);
    await saveUser(profile);
  };

  // Função de logout
  const signOut = async () => {
    await clearStorage();
    setToken(null);
    setUser(null);
  };

  //Função para atualizar o perfil do usuário
  const updateUserProfile = async (id: string | number, data: any) => {
    await usersApi.updateUserApi(id, data);

    if (!data.currentPassword && !data.newPassword) {
      const updatedUser = await usersApi.getUserProfileApi();
      setUser(updatedUser);
      await saveUser(updatedUser);
    }
  };

  //Função para deletar o perfil do usuário
  const deleteUserProfile = async (id: string | number) => {
    await usersApi.deleteUserApi(id);
    await clearStorage();
    setToken(null);
    setUser(null);
  };

  // Função para buscar atividades do usuário
  const fetchActivities = () => {
    const activities = activityApi.getUserActivities();
    return activities;
  };

  //Função para buscar atividades do usuário especifica
  const getActivityById = (id: number) => {
    const activity = activityApi.getActivityById(id);
    return activity;
  };

  //Função para criar atividades do usuário
  const createActivity = async (data: FormData) => {
    return await activityApi.createActivity(data);
  };

  // Função para atualizar atividades do usuário
  const updateActivity = async (id: number, data: FormData) => {
    return await activityApi.updateActivity(id, data);
  };

  // Função para deletar atividades do usuário
  const deleteActivity = async (id: number) => {
    await activityApi.deleteActivity(id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
        signUp,
        updateUserProfile,
        deleteUserProfile,
        getUserProfile,
        fetchActivities,
        createActivity,
        getActivityById,
        updateActivity,
        deleteActivity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
