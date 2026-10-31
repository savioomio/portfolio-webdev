import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escreva seu nome, com pelo menos 2 letras.")
    .max(120, "O nome pode ter no máximo 120 caracteres."),
  email: z.string().trim().pipe(z.email("E-mail inválido. Use o formato nome@empresa.com.")),
  message: z
    .string()
    .trim()
    .min(20, "A mensagem precisa ter no mínimo 20 caracteres.")
    .max(4000, "A mensagem pode ter no máximo 4000 caracteres."),
  /** Armadilha para robôs: o campo fica escondido, então só eles preenchem. */
  website: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
