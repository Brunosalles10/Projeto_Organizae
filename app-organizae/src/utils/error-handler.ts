// src/utils/error-handler.ts
import { AxiosError } from "axios";
import { Alert } from "react-native";

interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;

    // Se o backend retornar uma mensagem específica
    if (apiError?.message) {
      return apiError.message;
    }

    // Erros HTTP padrão + custom upload errors
    switch (error.response?.status) {
      case 400:
        return "Dados inválidos. Verifique os campos e tente novamente.";
      case 401:
        return "E-mail ou senha incorretos.";
      case 403:
        return "Você não tem permissão para esta ação.";
      case 404:
        return "Recurso não encontrado.";
      case 409:
        return "Este e-mail já está cadastrado.";
      case 413:
        return "A imagem é muito grande para o servidor.";
      case 422:
        return "Dados inválidos. Verifique os campos.";
      case 500:
        return "Erro no servidor. Tente novamente mais tarde.";
      case 503:
        return "Serviço temporariamente indisponível.";
      default:
        if (!error.response) {
          return "Erro de conexão. Verifique sua internet.";
        }
        return "Erro desconhecido. Tente novamente.";
    }
  }

  // Erro genérico
  if (error instanceof Error) {
    return error.message;
  }

  return "Erro desconhecido. Tente novamente.";
};

export const showErrorAlert = (error: unknown, title = "Erro") => {
  const message = handleApiError(error);
  Alert.alert(title, message);
};

export const showSuccessAlert = (message: string, title = "Sucesso") => {
  Alert.alert(title, message);
};
