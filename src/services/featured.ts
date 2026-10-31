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
  const removed = await supabase.from("featured_projects").delete().neq("repo_name", "");
  if (removed.error) throw removed.error;
  if (names.length === 0) return;
  const rows = names.map((repo_name, position) => ({ repo_name, position }));
  const { error } = await supabase.from("featured_projects").insert(rows);
  if (error) throw error;
}
