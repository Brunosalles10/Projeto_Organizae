import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "E-mail inválido. Verifique o formato." })),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
