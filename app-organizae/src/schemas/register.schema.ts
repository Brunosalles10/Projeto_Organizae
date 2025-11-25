import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Nome é obrigatório" })
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    email: z
      .string({ message: "E-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ message: "Senha é obrigatória" })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string({
      message: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
