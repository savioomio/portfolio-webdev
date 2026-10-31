import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSession, onAuthChange } from "@/services/auth";

export type AuthStatus = "loading" | "signedIn" | "signedOut";

export function useAuth() {
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

  return { status, session };
}
