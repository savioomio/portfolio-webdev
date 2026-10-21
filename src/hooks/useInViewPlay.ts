import { useEffect, type RefObject } from "react";

// Dá play no vídeo só quando ele aparece na tela e pausa quando sai.
// Junto com preload="none", o arquivo nem é baixado antes de o visitante rolar até ele.
export function useInViewPlay(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // O navegador pode recusar o play (modo economia de bateria); aí o poster continua na tela.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref]);
}
