export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
export const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
export const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export const isBackendConfigured = Boolean(supabaseUrl && supabaseKey);

/** Chamada direta à API do banco: a Home não precisa carregar o SDK do Supabase. */
export function restFetch(path: string, init: RequestInit = {}) {
  if (!supabaseUrl || !supabaseKey) {
    return Promise.reject(new Error("Backend não configurado"));
  }
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}
