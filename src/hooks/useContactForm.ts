import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactValues } from "@/schemas/contactSchema";
import { sendContactMessage } from "@/services/messages";

type SendResult = "idle" | "success" | "error";

export function useContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", website: "" },
  });
  const [result, setResult] = useState<SendResult>("idle");
  const sending = useRef(false);

  const onSubmit = form.handleSubmit(async ({ website, ...message }) => {
    // Clique duplo não pode gerar duas mensagens
    if (sending.current) return;
    sending.current = true;
    setResult("idle");
    try {
      // Robô caiu na armadilha: responde como se tivesse enviado, sem gravar nada
      if (!website) await sendContactMessage(message);
      setResult("success");
      form.reset();
    } catch {
      setResult("error");
    } finally {
      sending.current = false;
    }
  });

  return { form, onSubmit, result };
}
