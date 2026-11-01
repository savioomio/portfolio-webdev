import { restFetch } from "./backend";
import { getSupabase } from "./supabase";

/** Contagens gravadas no banco, ou `null` enquanto ninguém salvou. */
export async function getStoreCounts(signal?: AbortSignal) {
  const response = await restFetch("site_stats?select=*&id=eq.1", { signal });
  if (!response.ok) throw new Error(`Banco respondeu ${response.status}`);
  const [row] = (await response.json()) as {
    faststore: number;
    store_framework: number;
    wake: number;
    wordpress: number;
  }[];
  if (!row) return null;
  return {
    faststore: row.faststore,
    storeFramework: row.store_framework,
    wake: row.wake,
    wordpress: row.wordpress,
  };
}

export async function saveStoreCounts(counts: typeof __STORE_COUNTS__) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("site_stats").upsert({
    id: 1,
    faststore: counts.faststore,
    store_framework: counts.storeFramework,
    wake: counts.wake,
    wordpress: counts.wordpress,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
