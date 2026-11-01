import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Router, UNSAFE_createBrowserHistory as createBrowserHistory } from "react-router-dom";
import { prefersReducedMotion } from "@/lib/utils";
import { preloadPage } from "./pages";

/**
 * Igual ao BrowserRouter, mas troca de página dentro de uma View Transition.
 * Sem suporte no navegador, a página só troca, sem animação.
 */
export function ViewTransitionRouter({ children }: { children: ReactNode }) {
  const [history] = useState(() => createBrowserHistory({ v5Compat: true }));
  const [state, setState] = useState({ action: history.action, location: history.location });
  const pathname = useRef(history.location.pathname);

  useEffect(() => {
    let latest = 0;

    return history.listen(async ({ action, location }) => {
      const update = { action, location };
      const samePage = location.pathname === pathname.current;
      pathname.current = location.pathname;
      const ticket = ++latest;

      if (samePage || !document.startViewTransition || prefersReducedMotion()) {
        setState(update);
        return;
      }
      // Com a página pronta, a animação não mostra o spinner no meio do caminho
      await preloadPage(location.pathname).catch(() => undefined);
      if (ticket !== latest) return;
      document.startViewTransition(() => flushSync(() => setState(update)));
    });
  }, [history]);

  return (
    <Router navigationType={state.action} location={state.location} navigator={history}>
      {children}
    </Router>
  );
}
