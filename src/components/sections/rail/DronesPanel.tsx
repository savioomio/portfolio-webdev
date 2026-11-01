import { useEffect } from "react";
import type { Project } from "@/content/projects";
import { hdSrcSet } from "@/lib/media";
import { prefersReducedMotion } from "@/lib/utils";
import { useRailFrame } from "@/hooks/useRailFrame";
import { useRailScene } from "@/hooks/useRailScene";
import { useZoom } from "@/hooks/useZoom";
import { PanelCopy } from "./PanelCopy";
import { RailPanel } from "./RailPanel";
import { RailVideo } from "./RailVideo";

const trophy = {
  src: "/media/trofeu.webp",
  alt: "Troféu de primeiro lugar da DronesIFSC 2023, em Florianópolis",
};

export function DronesPanel({ project }: { project: Project }) {
  const { canvasRef, canvasKey, scene, ensure } = useRailScene(async (canvas) => {
    const { createWinchScene } = await import("@/components/three/winch");
    return createWinchScene(canvas, prefersReducedMotion());
  });
  const zoom = useZoom();

  useRailFrame((loc) => {
    if (Math.abs(loc) >= 1.05) return;
    ensure();
    scene.current?.draw();
  });

  useEffect(() => {
    const onResize = () => scene.current?.size();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scene]);

  return (
    <RailPanel project={project}>
      <img
        className="absolute inset-0 size-full object-cover"
        src="/media/voo-bristol.webp"
        srcSet={hdSrcSet("/media/voo-bristol.webp")}
        alt="Drone da equipe em voo na IMAV 2024, em Bristol"
        width={960}
        height={638}
        loading="lazy"
      />
      <div className="panel-inner">
        <PanelCopy project={project} className="panel-glass" />
        <div className="media-drones">
          <figure className="winch">
            <canvas key={canvasKey} ref={canvasRef} aria-label="Guincho do drone em 3D" />
            <figcaption className="pointer-events-none absolute inset-x-2.5 bottom-2 text-[13px] leading-tight">
              O guincho que modelei. Arraste para girar.
            </figcaption>
          </figure>
          {project.video && (
            <RailVideo
              src={project.video.src}
              poster={project.video.poster}
              label={project.video.label}
            />
          )}
          <img
            className="h-full w-full rounded-[14px] object-cover"
            src={trophy.src}
            alt={trophy.alt}
            width={400}
            height={400}
            loading="lazy"
            {...zoom(trophy)}
          />
        </div>
      </div>
    </RailPanel>
  );
}
