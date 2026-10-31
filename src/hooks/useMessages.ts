import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listMessages, setMessageAnswered } from "@/services/messages";

const MESSAGES_KEY = ["messages"] as const;

export function useMessages() {
  const queryClient = useQueryClient();

  const messages = useQuery({
    queryKey: MESSAGES_KEY,
    queryFn: listMessages,
    staleTime: 0,
    gcTime: 0,
  });

  const toggleAnswered = useMutation({
    mutationFn: ({ id, answered }: { id: string; answered: boolean }) =>
      setMessageAnswered(id, answered),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MESSAGES_KEY }),
  });

  return { messages, toggleAnswered };
}
