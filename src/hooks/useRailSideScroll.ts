import { useEffect, type RefObject } from "react";
import { clamp, prefersReducedMotion } from "@/lib/utils";

/** Distância mínima do dedo para mudar de painel. */
const SWIPE_DISTANCE = 40;

/** Com o trilho preso na tela, gesto para o lado anda a mesma rolagem do gesto para baixo. */
export function useRailSideScroll(sectionRef: RefObject<HTMLElement | null>, count: number) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      return {
        top: rect.top + window.scrollY,
        span,
        step: span / (count - 1),
        pinned: rect.top <= 1 && rect.bottom >= window.innerHeight - 1,
      };
    };
    // Não deixa o gesto lateral sair do trilho: quem sai é a rolagem normal
    const scrollInside = (delta: number) => {
      const { top, span } = measure();
      const y = clamp(window.scrollY + delta, top, top + span);
      window.scrollTo({ top: y, behavior: "instant" });
    };

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let startPanel = 0;
    let sideways = false;
    let tracking = false;

    const onTouchStart = (event: TouchEvent) => {
      const { top, step, pinned } = measure();
      // Arrastar o guincho gira a peça
      tracking = pinned && !(event.target as Element).closest(".winch");
      if (!tracking) return;
      startX = lastX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      startPanel = Math.round((window.scrollY - top) / step);
      sideways = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!tracking) return;
      const { clientX, clientY } = event.touches[0];
      if (!sideways) {
        const moveX = Math.abs(clientX - startX);
        const moveY = Math.abs(clientY - startY);
        if (moveX < 8 && moveY < 8) return;
        sideways = moveX > moveY;
        tracking = sideways;
        lastX = clientX;
        return;
      }
      const { step } = measure();
      scrollInside(((lastX - clientX) / window.innerWidth) * step);
      lastX = clientX;
    };
    const onTouchEnd = () => {
      if (!sideways) return;
      sideways = tracking = false;
      const moved = startX - lastX;
      const direction = Math.abs(moved) < SWIPE_DISTANCE ? 0 : Math.sign(moved);
      const { top, step } = measure();
      const panel = clamp(startPanel + direction, 0, count - 1);
      window.scrollTo({
        top: top + panel * step,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const { step, pinned } = measure();
      if (!pinned) return;
      event.preventDefault();
      scrollInside((event.deltaX / window.innerWidth) * step);
    };

    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: true });
    section.addEventListener("touchend", onTouchEnd);
    section.addEventListener("touchcancel", onTouchEnd);
    section.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
      section.removeEventListener("touchcancel", onTouchEnd);
      section.removeEventListener("wheel", onWheel);
    };
  }, [sectionRef, count]);
}
