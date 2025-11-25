export const SuccessMessages = {
  // Autenticação
  auth: {
    login: " Login realizado com sucesso!",
    logout: " Até logo! Você saiu da sua conta.",
    register: " Conta criada com sucesso! Faça login para continuar.",
    sessionExpired: " Sessão expirada. Faça login novamente.",
  },

  // Perfil
  profile: {
    updated: "Perfil atualizado com sucesso!",
    photoUpdated: " Foto de perfil atualizada!",
    deleted: "Sua conta foi excluída com sucesso.",
    loaded: "Perfil carregado!",
  },

  // Atividades
  activity: {
    created: " Atividade criada com sucesso!",
    updated: "Atividade atualizada com sucesso!",
    deleted: "Atividade excluída!",
    loaded: "Atividades carregadas!",
    statusChanged: "Status atualizado!",
  },

  // Operações gerais
  general: {
    saved: " Salvo com sucesso!",
    copied: " Copiado para área de transferência!",
    uploaded: " Upload concluído!",
    downloaded: "Download concluído!",
    shared: "Compartilhado com sucesso!",
  },

  // Validações
  validation: {
    formValid: " Formulário válido!",
    emailValid: " E-mail válido!",
    passwordStrong: " Senha forte!",
  },
};

type Operation = "criar" | "atualizar" | "deletar" | "carregar";
type Entity = "atividade" | "perfil" | "conta" | "foto";

export const getSuccessMessage = (
  operation: Operation,
  entity: Entity
): string => {
  const messages: Record<Operation, Record<Entity, string>> = {
    criar: {
      atividade: " Atividade criada com sucesso!",
      perfil: "Perfil criado com sucesso!",
      conta: " Conta criada com sucesso!",
      foto: "Foto adicionada!",
    },
    atualizar: {
      atividade: "Atividade atualizada!",
      perfil: "Perfil atualizado!",
      conta: "Conta atualizada!",
      foto: "Foto atualizada!",
    },
    deletar: {
      atividade: " Atividade excluída!",
      perfil: " Perfil excluído!",
      conta: " Conta excluída!",
      foto: " Foto removida!",
    },
    carregar: {
      atividade: "Atividade carregada!",
      perfil: " Perfil carregado!",
      conta: " Dados carregados!",
      foto: " Foto carregada!",
    },
  };

  return messages[operation][entity];
};

export const customSuccessMessage = {
  activityCreated: (title: string) => ` "${title}" criada com sucesso!`,
  activityUpdated: (title: string) => ` "${title}" atualizada!`,
  activityDeleted: (title: string) => ` "${title}" excluída!`,

  profileUpdated: (name: string) => ` Bem-vindo de volta, ${name}!`,

  itemsSynced: (count: number) =>
    `🔄 ${count} ${count === 1 ? "item sincronizado" : "itens sincronizados"}!`,

  filesUploaded: (count: number) =>
    `📤 ${count} ${count === 1 ? "arquivo enviado" : "arquivos enviados"}!`,
};
