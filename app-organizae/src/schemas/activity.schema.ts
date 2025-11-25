import { z } from "zod";

export const activitySchema = z.object({
  title: z
    .string({ message: "Título é obrigatório" })
    .min(3, { message: "Título deve ter no mínimo 3 caracteres" })
    .max(200, { message: "Título deve ter no máximo 200 caracteres" }),

  description: z
    .string({ message: "Descrição é obrigatória" })
    .min(10, { message: "Descrição deve ter no mínimo 10 caracteres" }),

  professor: z
    .string({ message: "Professor é obrigatório" })
    .max(100, { message: "Nome do professor muito longo" }),

  date: z
    .string({ message: "Data é obrigatória" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Data deve estar no formato AAAA-MM-DD",
    }),

  link: z
    .string()
    .optional()
    .refine((v) => !v || /^https?:\/\/.+\..+/i.test(v), {
      message: "Link inválido",
    })
    .or(z.literal("")),

  status: z.enum(["concluído", "em andamento", "cancelado"]).optional(),
});

export type ActivityFormData = z.infer<typeof activitySchema>;
