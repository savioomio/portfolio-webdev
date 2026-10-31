import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";

/** Barra a rota para quem não está logado e leva ao login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const { pathname } = useLocation();

  if (status === "loading") {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="text-2xl text-gold-ink" label="Conferindo o acesso" />
      </div>
    );
  }

  if (status === "signedOut") {
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }

  return children;
}
