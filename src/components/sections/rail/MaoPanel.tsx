import { useCallback, useEffect, useRef, useState } from "react";
import type { HandScene } from "@/components/three/hand";
import { handPoses } from "@/content/handPoses";
import type { Project } from "@/content/projects";
import { prefersReducedMotion } from "@/lib/utils";
import { useRailFrame } from "@/hooks/useRailFrame";
import { PanelCopy } from "./PanelCopy";
import { RailPanel } from "./RailPanel";
import { RailVideo } from "./RailVideo";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SPELLED_NAME = "SAVIO";
/** Depois do último clique, espera um pouco antes de voltar a soletrar sozinha. */
const RESUME_AFTER_MS = 7000;

export function MaoPanel({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = useRef<HandScene | null>(null);
  const started = useRef(false);
  const flow = useRef({ manualAt: -1e9, step: 0, stepAt: 0, loc: 9 });
  const [letter, setLetter] = useState("S");
  const [spelled, setSpelled] = useState("");
  const [announced, setAnnounced] = useState("");

  const press = useCallback((next: string, byHand: boolean) => {
    if (byHand) {
      flow.current.manualAt = performance.now();
      setSpelled("");
      setAnnounced(`Letra ${next}`);
    }
    setLetter(next);
    scene.current?.set(next);
  }, []);

  useRailFrame((loc, time, pointerX) => {
    flow.current.loc = loc;
    if (Math.abs(loc) >= 1.05) return;
    if (!started.current && canvasRef.current) {
      started.current = true;
      const canvas = canvasRef.current;
      import("@/components/three/hand")
        .then(({ createHandScene }) => {
          scene.current = createHandScene(canvas, prefersReducedMotion());
        })
        .catch(() => undefined);
    }
    const state = flow.current;
    const idle = performance.now() - state.manualAt > RESUME_AFTER_MS;
    if (Math.abs(loc) < 0.3 && !prefersReducedMotion() && idle && time - state.stepAt > 1.35) {
      state.stepAt = time;
      const position = state.step % SPELLED_NAME.length;
      press(SPELLED_NAME[position], false);
      setSpelled(
        SPELLED_NAME.slice(0, position + 1)
          .split("")
          .join(" "),
      );
      state.step += 1;
    }
    scene.current?.draw(time, pointerX);
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/INPUT|TEXTAREA/.test(document.activeElement?.tagName ?? "")) return;
      const key = event.key?.toUpperCase();
      if (handPoses[key] && Math.abs(flow.current.loc) < 0.5) press(key, true);
    };
    const onResize = () => scene.current?.size();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      scene.current?.dispose();
      scene.current = null;
      started.current = false;
    };
  }, [press]);

  return (
    <RailPanel project={project}>
      <div className="panel-inner">
        <PanelCopy project={project} hideFacts>
          <p className="panel-text">Teste aqui: aperte uma letra.</p>
          <div className="hand-keys" role="group" aria-label="Escolha uma letra">
            {ALPHABET.map((key) =>
              handPoses[key] ? (
                <button
                  key={key}
                  type="button"
                  aria-pressed={key === letter}
                  onClick={() => press(key, true)}
                >
                  {key}
                </button>
              ) : (
                <button key={key} type="button" disabled title="A mão real não fez esta letra">
                  {key}
                </button>
              ),
            )}
          </div>
          <p className="panel-note panel-wide">
            Riscadas, as 10 letras que a mão real não fez: elas pedem um novo pulso. Esta mão 3D foi
            modelada para o site e as poses são uma aproximação.
          </p>
        </PanelCopy>
        <div className="hand-stage">
          <canvas ref={canvasRef} aria-label="Mão robótica em 3D fazendo sinais de Libras" />
          <span className="hand-letter" aria-hidden="true">
            {letter}
          </span>
          {/* Só anuncia a letra escolhida: a soletração automática não pode falar sem parar */}
          <span className="sr-only" aria-live="polite">
            {announced}
          </span>
          <span className="hand-spell" aria-hidden="true">
            {spelled}
          </span>
          <div className="hand-video">
            <RailVideo
              src="/media/mao.mp4"
              poster="/media/mao-poster.webp"
              label="A mão real fazendo os sinais"
              className="rounded-none"
            />
          </div>
        </div>
      </div>
    </RailPanel>
  );
}
