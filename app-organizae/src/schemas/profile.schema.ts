import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .max(100, { message: "O nome pode ter no máximo 100 caracteres." }),

  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "E-mail inválido. Verifique o formato." })),
});

export const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha muito longa"),
    confirmNewPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha muito longa"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

// Schema combinado para atualizar perfil com senha opcional
export const profileWithPasswordSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .optional(),
  email: z.string().email("E-mail inválido").optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, "Nova senha deve ter pelo menos 6 caracteres")
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
