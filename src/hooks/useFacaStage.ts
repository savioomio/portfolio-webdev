import { useEffect, type RefObject } from "react";
import type { FacaScene } from "@/components/three/faca";
import { clamp, lerp, prefersReducedMotion } from "@/lib/utils";

/**
 * Liga a rolagem das seções de e-commerce à luz da vitrine e à faca 3D.
 * Cada elemento com `data-stage` é uma parada; o 3D carrega depois da primeira pintura.
 */
export function useFacaStage(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  auraRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const aura = auraRef.current;
    if (!canvas || !aura) return;

    const layers = [...aura.querySelectorAll("i")];
    const reduced = prefersReducedMotion();
    let engine: FacaScene | null = null;
    let disposed = false;
    let frameId = 0;
    let centers: number[] = [];
    let stageEnd = 0;
    let position = 0;
    let lastFrame = performance.now();
    let pointerX = 0;
    let pointerY = 0;

    const measure = () => {
      const stops = [...document.querySelectorAll<HTMLElement>("[data-stage]")].map((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
      });
      if (!stops.length) return;
      centers = stops.map((stop, i) =>
        i === 0 ? 0 : stop.top + stop.height / 2 - window.innerHeight / 2,
      );
      const last = stops[stops.length - 1];
      stageEnd = last.top + last.height;
    };

    const readPosition = (scroll: number) => {
      for (let i = 0; i < centers.length - 1; i++) {
        const t = (scroll - centers[i]) / (centers[i + 1] - centers[i]);
        if (t < 1) return i + clamp((t - 0.12) / 0.76);
      }
      return centers.length - 1 + (scroll - centers[centers.length - 1]) / window.innerHeight;
    };

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      const delta = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const scroll = window.scrollY;
      if (scroll >= stageEnd) return;
      const target = readPosition(scroll);
      position = reduced ? target : lerp(position, target, 1 - Math.exp(-delta * 7));
      layers.forEach((layer, i) => {
        layer.style.opacity = String(clamp(1 - Math.abs(position - i) / 0.7));
      });
      engine?.frame(position, now / 1000, pointerX, pointerY);
    };

    const onResize = () => {
      measure();
      engine?.resize();
    };
    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const loadScene = async () => {
      await Promise.race([
        document.fonts.load("900 60px Nunito"),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]).catch(() => undefined);
      const { createFacaScene } = await import("@/components/three/faca");
      if (disposed) return;
      try {
        engine = createFacaScene(canvas, reduced);
        measure();
      } catch {
        // Sem WebGL a página continua completa: fica só a luz da vitrine.
        engine = null;
      }
    };

    measure();
    frameId = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(loadScene, { timeout: 1800 })
      : window.setTimeout(loadScene, 800);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      engine?.dispose();
    };
  }, [canvasRef, auraRef]);
}
