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
      // No celular o texto fica no fim da seção: a parada é quando ele está inteiro na tela
      const small = window.innerWidth <= 860;
      centers = stops.map((stop, i) => {
        if (i === 0) return 0;
        const rest = small
          ? stop.height - window.innerHeight
          : (stop.height - window.innerHeight) / 2;
        return stop.top + rest;
      });
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
        document.documentElement.dataset.scene = "ready";
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

    // O 3D espera o primeiro gesto: até lá, o desenho da folha ocupa o lugar dele
    const gestures = ["scroll", "touchstart", "pointerdown", "pointermove", "keydown"];
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      gestures.forEach((gesture) => window.removeEventListener(gesture, start));
      void loadScene();
    };
    gestures.forEach((gesture) => window.addEventListener(gesture, start, { passive: true }));

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      gestures.forEach((gesture) => window.removeEventListener(gesture, start));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      delete document.documentElement.dataset.scene;
      engine?.dispose();
    };
  }, [canvasRef, auraRef]);
}
