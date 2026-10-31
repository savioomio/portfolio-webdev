import type { ContactValues } from "@/schemas/contactSchema";
import type { ContactMessage } from "@/types/backend";
import { formspreeId, restFetch } from "./backend";
import { getSupabase } from "./supabase";

type NewMessage = Pick<ContactValues, "name" | "email" | "message">;

async function saveMessage({ name, email, message }: NewMessage) {
  const response = await restFetch("messages", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ name, email, message }),
  });
  if (!response.ok) throw new Error(`Banco respondeu ${response.status}`);
}

async function emailOwner({ name, email, message }: NewMessage) {
  if (!formspreeId) throw new Error("Formspree não configurado");
  const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message, _subject: `Portfólio: mensagem de ${name}` }),
  });
  if (!response.ok) throw new Error(`Formspree respondeu ${response.status}`);
}

/** Salva para o dashboard e avisa por e-mail. Só falha se os dois caminhos falharem. */
export async function sendContactMessage(input: NewMessage) {
  const [saved, emailed] = await Promise.allSettled([saveMessage(input), emailOwner(input)]);
  if (saved.status === "rejected" && emailed.status === "rejected") throw saved.reason;
  if (saved.status === "rejected") console.error("Mensagem não salva no banco", saved.reason);
  if (emailed.status === "rejected") console.error("E-mail não enviado", emailed.reason);
}

export async function listMessages() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .select("id, name, email, message, answered, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ContactMessage[];
}

export async function setMessageAnswered(id: string, answered: boolean) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("messages").update({ answered }).eq("id", id);
  if (error) throw error;
}
