import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./backend";

let client: Promise<SupabaseClient> | null = null;

/** O SDK só é baixado no login e no dashboard. */
export function getSupabase() {
  client ??= import("@supabase/supabase-js").then(({ createClient }) => {
    if (!supabaseUrl || !supabaseKey) throw new Error("Backend não configurado");
    return createClient(supabaseUrl, supabaseKey);
  });
  return client;
}
