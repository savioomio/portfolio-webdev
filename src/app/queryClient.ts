import { QueryClient, type Query } from "@tanstack/react-query";
import { GithubApiError } from "@/services/github";

const HOUR = 60 * 60 * 1000;

export const CACHE_MAX_AGE = 24 * HOUR;
export const CACHE_KEY = "portfolio-cache";

/** Só dados públicos vão para o navegador: mensagens de visitantes ficam de fora. */
export const shouldPersistQuery = (query: Query) =>
  query.state.status === "success" && query.meta?.persist !== false;

export function clearSavedCache() {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Com o armazenamento bloqueado, não há o que limpar
  }
}

/** O limite da API do GitHub é de 60 requisições por hora: o cache evita gastar a cota à toa. */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: HOUR,
        gcTime: CACHE_MAX_AGE,
        refetchOnWindowFocus: false,
        retry: (failures, error) => {
          // Limite estourado e repositório inexistente não melhoram tentando de novo
          if (error instanceof GithubApiError) return false;
          return failures < 2;
        },
      },
    },
  });
}
