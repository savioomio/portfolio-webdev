import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("E-mail inválido. Use o formato nome@empresa.com.")),
  password: z.string().min(1, "Escreva a senha."),
});

export type LoginValues = z.infer<typeof loginSchema>;
