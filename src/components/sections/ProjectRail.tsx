import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentType,
  type CSSProperties,
  type FocusEvent,
  type Ref,
} from "react";
import { projects, type Project } from "@/content/projects";
import { useRailSideScroll } from "@/hooks/useRailSideScroll";
import { clamp, ease, lerp, prefersReducedMotion } from "@/lib/utils";
import { DronesPanel } from "./rail/DronesPanel";
import { MaoPanel } from "./rail/MaoPanel";
import { AranhaPanel, CallidusPanel, GasMasterPanel, JsomPanel, PlataoPanel } from "./rail/Panels";
import { RailContext, RailIndexContext, type RailFrame } from "./rail/railContext";
import { SynesthesiaPanel } from "./rail/SynesthesiaPanel";

const panelBySlug: Record<string, ComponentType<{ project: Project }>> = {
  "aranha-robo": AranhaPanel,
  "drones-guanambi": DronesPanel,
  "callidus-link": CallidusPanel,
  "mao-robotica": MaoPanel,
  jsom: JsomPanel,
  gasmaster: GasMasterPanel,
  synesthesia: SynesthesiaPanel,
  platao: PlataoPanel,
};

export interface RailHandle {
  goTo: (index: number) => void;
}

/** Trilho horizontal: a rolagem passa os painéis, e o gesto lateral faz o mesmo. */
export function ProjectRail({ ref }: { ref?: Ref<RailHandle> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLElement>(null);
  const frames = useRef(new Map<number, Set<RailFrame>>());
  const count = projects.length;
  useRailSideScroll(sectionRef, count);

  const rail = useMemo(
    () => ({
      subscribe(index: number, frame: RailFrame) {
        const list = frames.current.get(index) ?? new Set<RailFrame>();
        list.add(frame);
        frames.current.set(index, list);
        return () => {
          list.delete(frame);
        };
      },
    }),
    [],
  );

  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const span = Math.max(1, rect.height - window.innerHeight);
    window.scrollTo({
      top: rect.top + window.scrollY + (index / (count - 1)) * span,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  useImperativeHandle(ref, () => ({ goTo }));

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panels = [...track.querySelectorAll<HTMLElement>("[data-panel]")];
    const inners = panels.map((panel) => panel.querySelector<HTMLElement>(".panel-inner"));
    const dock = [...(dockRef.current?.querySelectorAll("button") ?? [])];
    const wasNear = panels.map(() => false);
    const reduced = prefersReducedMotion();
    let offset = 0;
    let active = -1;
    let lastFrame = performance.now();
    let frameId = 0;
    let running = false;
    let pointerX = 0;

    const tick = (now: number) => {
      if (!running) return;
      frameId = requestAnimationFrame(tick);
      const delta = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      const rect = section.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const raw = clamp(-rect.top / span) * (count - 1);
      const step = Math.min(count - 2, Math.floor(raw));
      const target = step + ease(clamp((raw - step - 0.1) / 0.8));
      offset = reduced ? target : lerp(offset, target, 1 - Math.exp(-delta * 9));
      if (Math.abs(offset - target) < 0.0004) offset = target;
      track.style.transform = `translate3d(${(-offset * 100) / count}%,0,0)`;

      panels.forEach((panel, i) => {
        const loc = i - offset;
        const near = Math.abs(loc) < 1.05;
        const folding = loc > 0 && loc < 1;
        panel.style.visibility = near ? "visible" : "hidden";
        panel.style.setProperty("--crease", folding ? "1" : "0");
        const inner = inners[i];
        if (inner) inner.style.transform = !reduced && folding ? `rotateY(${loc * 46}deg)` : "none";
        if (near || wasNear[i]) {
          frames.current.get(i)?.forEach((frame) => frame(loc, now / 1000, pointerX));
        }
        wasNear[i] = near;
      });

      const current = Math.round(offset);
      if (current !== active) {
        active = current;
        dock.forEach((button, i) => button.setAttribute("aria-current", String(i === current)));
      }
    };

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    };
    // Fora da tela o trilho não roda, então as cenas 3D e os vídeos ficam parados.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible === running) return;
        running = visible;
        if (visible) {
          lastFrame = performance.now();
          frameId = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(section);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [count]);

  // Quem navega pelo teclado também percorre o trilho: o foco leva ao painel.
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-panel]");
    const panels = [...(trackRef.current?.querySelectorAll("[data-panel]") ?? [])];
    const index = panel ? panels.indexOf(panel) : -1;
    if (index >= 0 && !event.target.matches(":hover")) goTo(index);
  };

  return (
    <section
      ref={sectionRef}
      className="rail z-[2]"
      style={{ "--n": count } as CSSProperties}
      aria-label="Projetos, um por seção"
    >
      <h2 className="sr-only">Projetos</h2>
      <div className="rail-stick">
        <RailContext.Provider value={rail}>
          <div ref={trackRef} className="rail-track" onFocus={onFocus}>
            {projects.map((project, index) => {
              const Panel = panelBySlug[project.slug];
              return (
                <RailIndexContext.Provider key={project.slug} value={index}>
                  <Panel project={project} />
                </RailIndexContext.Provider>
              );
            })}
          </div>
        </RailContext.Provider>
        <nav ref={dockRef} className="rail-dock" aria-label="Ir para um projeto">
          {projects.map((project, index) => (
            <button key={project.slug} type="button" onClick={() => goTo(index)}>
              {project.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
