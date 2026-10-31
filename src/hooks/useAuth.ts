import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { clearSavedCache } from "@/app/queryClient";
import { getSession, onAuthChange, signIn, signOut } from "@/services/auth";

export type AuthStatus = "loading" | "signedIn" | "signedOut";

export function useAuth() {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    let stop: (() => void) | undefined;

    getSession()
      .then((current) => {
        if (active) setSession(current);
      })
      .catch(() => {
        if (active) setSession(null);
      });

    onAuthChange((next) => {
      if (active) setSession(next);
    })
      .then((unsubscribe) => {
        stop = unsubscribe;
        if (!active) stop();
      })
      .catch(() => undefined);

    return () => {
      active = false;
      stop?.();
    };
  }, []);

  const status: AuthStatus = session === undefined ? "loading" : session ? "signedIn" : "signedOut";

  const leave = useCallback(async () => {
    await signOut();
    queryClient.clear();
    clearSavedCache();
  }, [queryClient]);

  return { status, session, signIn, signOut: leave };
}
