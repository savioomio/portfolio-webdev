import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const SWIPE_QUERY = "(max-width: 860px) and (pointer: coarse)";
const LOCK_CLASS = "rail-locked";
/** Depois de soltar o dedo, a rolagem ainda corre um pouco por inércia. */
const TOUCH_WINDOW = 1200;

export const isRailSwipe = () => window.matchMedia(SWIPE_QUERY).matches;

/** Vai e volta numa curva suave: é o empurrãozinho que mostra para onde o trilho anda. */
function peek(apply: (distance: number) => void, distance: number, done?: () => void) {
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / 900);
    apply(Math.sin(t * Math.PI) ** 2 * distance);
    if (t < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

/**
 * No celular o trilho desliza para o lado. Ao chegar nele a página para e mostra o movimento
 * lateral; no último painel a página solta e mostra que agora o caminho é para baixo.
 */
export function useRailSwipe(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    let locked = false;
    let hinted = false;
    let lastY = window.scrollY;
    let lastTouch = 0;
    let startX = 0;
    let startY = 0;
    let endTimer = 0;

    const railTop = () => section.getBoundingClientRect().top + window.scrollY;
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

    const hintSideways = () => {
      if (reduced || track.scrollLeft > 4) return;
      track.style.scrollSnapType = "none";
      peek(
        (distance) => {
          track.scrollLeft = distance;
        },
        track.clientWidth * 0.2,
        () => {
          track.style.scrollSnapType = "";
        },
      );
    };

    const lock = (top: number) => {
      locked = true;
      root.classList.add(LOCK_CLASS);
      window.scrollTo({ top, behavior: "instant" });
      if (!hinted) {
        hinted = true;
        hintSideways();
      }
    };

    const unlock = () => {
      locked = false;
      root.classList.remove(LOCK_CLASS);
    };

    const onPageScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;
      if (!isRailSwipe()) return;
      const top = railTop();
      if (locked) {
        // Um link do menu pode levar a outra seção com o trilho travado
        if (Math.abs(y - top) > 4) unlock();
        return;
      }
      const touching = performance.now() - lastTouch < TOUCH_WINDOW;
      if (goingDown && touching && !atEnd() && y >= top && y < top + window.innerHeight) lock(top);
    };

    const onTrackScroll = () => {
      window.clearTimeout(endTimer);
      if (!locked || !atEnd()) return;
      unlock();
      // Espera a pessoa ver o último painel antes de mostrar a saída
      endTimer = window.setTimeout(() => {
        if (reduced || !atEnd()) return;
        const top = window.scrollY;
        peek(
          (distance) => window.scrollTo({ top: top + distance, behavior: "instant" }),
          window.innerHeight * 0.16,
        );
      }, 900);
    };

    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      lastTouch = performance.now();
      if (!locked) return;
      const moveX = event.touches[0].clientX - startX;
      const moveY = event.touches[0].clientY - startY;
      if (Math.abs(moveY) < 50 || Math.abs(moveY) < Math.abs(moveX)) return;
      startY = event.touches[0].clientY;
      if (moveY > 0) {
        // Dedo para baixo é voltar: subir nunca fica preso
        unlock();
        window.scrollBy({ top: -window.innerHeight * 0.6, behavior: "smooth" });
      } else {
        hintSideways();
      }
    };

    window.addEventListener("scroll", onPageScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("scroll", onTrackScroll, { passive: true });

    return () => {
      window.clearTimeout(endTimer);
      unlock();
      window.removeEventListener("scroll", onPageScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("scroll", onTrackScroll);
    };
  }, [sectionRef, trackRef]);
}
