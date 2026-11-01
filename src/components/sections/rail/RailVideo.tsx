import { useRef } from "react";
import { hdSrc } from "@/lib/media";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { useRailFrame } from "@/hooks/useRailFrame";
import { useZoom } from "@/hooks/useZoom";

interface RailVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/** Vídeo mudo: poster e arquivo só baixam quando o painel chega perto, e ele pausa ao sair. */
export function RailVideo({ src, poster, label, className }: RailVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playing = useRef(false);
  const zoom = useZoom();

  useRailFrame((loc) => {
    const video = videoRef.current;
    const near = Math.abs(loc) < 1.05;
    if (!video || near === playing.current) return;
    playing.current = near;
    if (near) {
      video.poster = window.devicePixelRatio > 1 ? hdSrc(poster) : poster;
      // Com movimento reduzido, fica só a imagem parada
      if (prefersReducedMotion()) return;
      if (!video.getAttribute("src")) video.src = src;
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  });

  return (
    <video
      ref={videoRef}
      className={cn("panel-video", className)}
      {...zoom({ src, alt: label, poster })}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
