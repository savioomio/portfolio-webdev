import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { isBackendConfigured } from "@/services/backend";
import { listFeatured, saveFeatured } from "@/services/featured";
import { useRepos } from "./useRepos";

const FEATURED_KEY = ["featured"] as const;
export const FEATURED_LIMIT = 6;

export function useFeaturedNames({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: FEATURED_KEY,
    queryFn: ({ signal }) => listFeatured(signal),
    enabled: enabled && isBackendConfigured,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useSaveFeatured() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveFeatured,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: FEATURED_KEY }),
  });
}

/** Repositórios da Home: os escolhidos no dashboard ou, sem escolha, os mais recentes. */
export function useFeaturedRepos({ enabled = true }: { enabled?: boolean } = {}) {
  const repos = useRepos({ enabled });
  const featured = useFeaturedNames({ enabled });

  const data = useMemo(() => {
    if (!repos.data) return undefined;
    const chosen = (featured.data ?? []).flatMap((name) => {
      const repo = repos.data.find((item) => item.name === name);
      return repo ? [repo] : [];
    });
    return (chosen.length > 0 ? chosen : repos.data).slice(0, FEATURED_LIMIT);
  }, [repos.data, featured.data]);

  return { data, isPending: repos.isPending, error: repos.error, refetch: repos.refetch };
}
