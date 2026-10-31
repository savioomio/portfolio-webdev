import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { prefersReducedMotion } from "@/lib/utils";

/** Ao trocar de rota volta ao topo; com `#seção` no link, rola até ela. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!hash) {
      // Ao voltar pelo navegador, ele mesmo restaura a posição
      if (navigationType !== "POP") window.scrollTo({ top: 0 });
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
    // `key` muda a cada clique, então o mesmo link com # volta a rolar
  }, [pathname, hash, key, navigationType]);

  return null;
}
