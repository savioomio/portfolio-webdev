import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isBackendConfigured } from "@/services/backend";
import { getStoreCounts, saveStoreCounts } from "@/services/storeCounts";

const COUNTS_KEY = ["store-counts"] as const;

export function useStoreCounts() {
  return useQuery({
    queryKey: COUNTS_KEY,
    queryFn: ({ signal }) => getStoreCounts(signal),
    enabled: isBackendConfigured,
    staleTime: 0,
    retry: false,
  });
}

export function useSaveStoreCounts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveStoreCounts,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COUNTS_KEY }),
  });
}
