import { useState } from "react";

export const getAuthErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) {
    return "❌ Erro inesperado. Tente novamente.";
  }

  const message = error.message.toLowerCase();

  // Mapeamento de erros comuns
  const errorMap: Record<string, string> = {
    // Erros de Login
    invalid: "E-mail ou senha incorretos. Tente novamente.",
    incorrect: "E-mail ou senha incorretos. Tente novamente.",
    wrong: "E-mail ou senha incorretos. Tente novamente.",
    credentialssignin: " E-mail ou senha incorretos. Tente novamente.",
    unauthorized: " E-mail ou senha incorretos. Tente novamente.",
    "401": "E-mail ou senha incorretos. Tente novamente.",

    // Erros de Conta não encontrada
    "not found": "⚠️ Conta não encontrada. Você precisa se cadastrar primeiro.",
    "doesn't exist":
      "⚠️ Conta não encontrada. Você precisa se cadastrar primeiro.",
    "no user": "⚠️ Conta não encontrada. Você precisa se cadastrar primeiro.",
    "user not found":
      "⚠️ Conta não encontrada. Você precisa se cadastrar primeiro.",
    "404": "⚠️ Conta não encontrada. Você precisa se cadastrar primeiro.",

    // Erros de Registro
    "already exists":
      "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
    "já existe":
      "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
    "already registered":
      "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
    duplicate:
      "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
    conflict:
      "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",
    "409": "⚠️ Este e-mail já está cadastrado. Faça login ou use outro e-mail.",

    // Erros de Senha
    "weak password": "🔒 Senha muito fraca. Use pelo menos 6 caracteres.",
    "senha fraca": "🔒 Senha muito fraca. Use pelo menos 6 caracteres.",

    // Erros de E-mail
    "invalid email": "📧 E-mail inválido. Verifique o formato.",
    "e-mail inválido": "📧 E-mail inválido. Verifique o formato.",

    // Erros de Conexão
    network: "🌐 Erro de conexão. Verifique sua internet.",
    connection: "🌐 Erro de conexão. Verifique sua internet.",
    timeout: "🌐 Erro de conexão. Verifique sua internet.",
    "failed to fetch": "🌐 Erro de conexão. Verifique sua internet.",
  };

  // Procura pela chave correspondente no erro
  for (const [key, userMessage] of Object.entries(errorMap)) {
    if (message.includes(key)) {
      return userMessage;
    }
  }

  // Mensagem padrão se não encontrar mapeamento
  return `❌ ${error.message}`;
};

//hooks customizados
export const useAuthError = () => {
  const [error, setError] = useState<string>("");

  const handleError = (err: unknown) => {
    const message = getAuthErrorMessage(err);
    setError(message);
  };

  const clearError = () => setError("");

  return { error, handleError, clearError };
};

// Função auxiliar para uso direto
export const handleAuthError = (error: unknown): string => {
  return getAuthErrorMessage(error);
};
