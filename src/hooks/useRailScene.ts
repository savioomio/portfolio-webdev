import { useCallback, useEffect, useRef, useState } from "react";

interface Scene {
  dispose: () => void;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Cuida da vida de uma cena 3D do trilho. Uma carga que falha tenta de novo, e um contexto
 * perdido volta num canvas novo, porque o antigo não recupera o que o navegador derrubou.
 */
export function useRailScene<S extends Scene>(load: (canvas: HTMLCanvasElement) => Promise<S>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<S | null>(null);
  const loading = useRef(false);
  const alive = useRef(false);
  const retries = useRef(0);
  const retryAt = useRef(0);
  const latestLoad = useRef(load);
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    latestLoad.current = load;
  });

  const replaceCanvas = useCallback(() => {
    retries.current += 1;
    retryAt.current = performance.now() + RETRY_DELAY_MS;
    setCanvasKey((key) => key + 1);
  }, []);

  /** Chamado a cada quadro com o painel por perto: só carrega quando precisa. */
  const ensure = useCallback(() => {
    const canvas = canvasRef.current;
    if (scene.current || loading.current || !canvas) return;
    if (retries.current > MAX_RETRIES || performance.now() < retryAt.current) return;

    loading.current = true;
    latestLoad
      .current(canvas)
      .then((created) => {
        if (!alive.current) {
          created.dispose();
          return;
        }
        scene.current = created;
        retries.current = 0;
        canvas.addEventListener(
          "webglcontextlost",
          () => {
            if (scene.current !== created) return;
            scene.current = null;
            created.dispose();
            replaceCanvas();
          },
          { once: true },
        );
      })
      .catch(replaceCanvas)
      .finally(() => {
        loading.current = false;
      });
  }, [replaceCanvas]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  return { canvasRef, canvasKey, scene, ensure };
}
