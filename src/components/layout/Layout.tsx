import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ButtonLink } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { ErrorBoundary } from "./ErrorBoundary";
import { ScrollManager } from "./ScrollManager";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function PageFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="text-2xl text-gold-ink" label="Carregando a página" />
    </div>
  );
}

function PageError() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-wrap px-[var(--gl)] pt-32">
      <StatusMessage
        title="Algo deu errado nesta página"
        action={<ButtonLink to="/">Voltar para o início</ButtonLink>}
      >
        Tente recarregar. Se continuar, me avise pelo LinkedIn.
      </StatusMessage>
    </main>
  );
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <ErrorBoundary fallback={<PageError />}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <SiteFooter />
    </>
  );
}
