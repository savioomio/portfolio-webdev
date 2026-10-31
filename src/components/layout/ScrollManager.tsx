import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion } from "@/lib/utils";

/** Ao trocar de rota volta ao topo; com `#seção` no link, rola até ela. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // A Home carrega em um pedaço separado: espera a seção existir antes de rolar
    let attempts = 0;
    const timer = window.setInterval(() => {
      const target = document.getElementById(hash.slice(1));
      attempts += 1;
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
      if (target || attempts > 40) window.clearInterval(timer);
    }, 50);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
