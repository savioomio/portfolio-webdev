import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const valid = {
  name: "Maria Silva",
  email: "maria@empresa.com",
  message: "Quero conversar sobre uma loja nova em VTEX.",
};

const firstError = (input: Record<string, string>) => {
  const result = contactSchema.safeParse(input);
  return result.success ? null : result.error.issues[0].message;
};

describe("contactSchema", () => {
  it("aceita uma mensagem válida", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("recusa nome curto com mensagem própria", () => {
    expect(firstError({ ...valid, name: "M" })).toBe("Escreva seu nome, com pelo menos 2 letras.");
  });

  it("recusa e-mail inválido com mensagem própria", () => {
    expect(firstError({ ...valid, email: "maria.com" })).toBe(
      "E-mail inválido. Use o formato nome@empresa.com.",
    );
  });

  it("recusa mensagem com menos de 20 caracteres", () => {
    expect(firstError({ ...valid, message: "Oi, tudo bem?" })).toBe(
      "A mensagem precisa ter no mínimo 20 caracteres.",
    );
  });

  it("conta a mensagem sem os espaços das pontas", () => {
    expect(firstError({ ...valid, message: `   ${"a".repeat(19)}   ` })).toBe(
      "A mensagem precisa ter no mínimo 20 caracteres.",
    );
  });
});
