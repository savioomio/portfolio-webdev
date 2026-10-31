import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRepo, listRepos } from "@/services/github";
import type { GithubRepo } from "@/types/github";

export const REPOS_KEY = ["repos"] as const;

export function useRepos({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: REPOS_KEY,
    queryFn: ({ signal }) => listRepos(signal),
    enabled,
  });
}

/** Aproveita a lista já baixada: abrir um projeto vindo da Home não gasta outra requisição. */
export function useRepo(name: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["repos", name],
    queryFn: ({ signal }) => getRepo(name, signal),
    initialData: () =>
      queryClient.getQueryData<GithubRepo[]>(REPOS_KEY)?.find((repo) => repo.name === name),
    initialDataUpdatedAt: () => queryClient.getQueryState(REPOS_KEY)?.dataUpdatedAt,
  });
}
