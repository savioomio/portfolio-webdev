import { restFetch } from "./backend";
import { getSupabase } from "./supabase";

/** Nomes dos repositórios em destaque, na ordem escolhida no dashboard. */
export async function listFeatured(signal?: AbortSignal) {
  const response = await restFetch("featured_projects?select=repo_name&order=position", { signal });
  if (!response.ok) throw new Error(`Banco respondeu ${response.status}`);
  const rows = (await response.json()) as { repo_name: string }[];
  return rows.map((row) => row.repo_name);
}

export async function saveFeatured(names: string[]) {
  const supabase = await getSupabase();
  // Grava antes de remover: se algo falhar no meio, a seleção antiga não se perde
  if (names.length > 0) {
    const rows = names.map((repo_name, position) => ({ repo_name, position }));
    const saved = await supabase.from("featured_projects").upsert(rows);
    if (saved.error) throw saved.error;
  }
  const kept = names.map((name) => `"${name}"`).join(",");
  const removed = names.length
    ? await supabase.from("featured_projects").delete().not("repo_name", "in", `(${kept})`)
    : await supabase.from("featured_projects").delete().neq("repo_name", "");
  if (removed.error) throw removed.error;
}
