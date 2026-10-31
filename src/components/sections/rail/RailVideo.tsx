import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useRailFrame } from "./railContext";

interface RailVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/** Vídeo mudo: só baixa quando o painel chega perto e pausa quando ele sai. */
export function RailVideo({ src, poster, label, className }: RailVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playing = useRef(false);

  useRailFrame((loc) => {
    const video = videoRef.current;
    const near = Math.abs(loc) < 1.05;
    if (!video || near === playing.current) return;
    playing.current = near;
    if (near) {
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
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
