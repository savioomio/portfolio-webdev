import { useRef } from "react";
import { useFacaStage } from "@/hooks/useFacaStage";

export function HomeStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  useFacaStage(canvasRef, auraRef);

  return (
    <>
      <div ref={auraRef} className="aura" aria-hidden="true">
        <i className="a0" />
        <i className="a1" />
        <i className="a2" />
        <i className="a3" />
      </div>
      <canvas ref={canvasRef} className="stage-canvas" aria-hidden="true" />
    </>
  );
}
