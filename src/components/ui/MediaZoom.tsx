import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { X } from "lucide-react";
import { ZoomContext, type ZoomItem } from "@/hooks/useZoom";
import { hdSrc } from "@/lib/media";
import { prefersReducedMotion } from "@/lib/utils";

/** Visor único do site: o `<dialog>` nativo cuida do Esc, do foco e do fundo. */
export function MediaZoom({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<ZoomItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (item) dialogRef.current?.showModal();
  }, [item]);

  const close = () => dialogRef.current?.close();
  const fit = item
    ? ({
        aspectRatio: item.ratio,
        width: `min(100%, calc((100svh - 48px) * ${item.ratio}))`,
      } satisfies CSSProperties)
    : undefined;

  return (
    <ZoomContext.Provider value={setItem}>
      {children}
      {item && (
        <dialog
          ref={dialogRef}
          className="zoom"
          aria-label={item.alt}
          onClose={() => setItem(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button type="button" className="zoom-close" aria-label="Fechar" onClick={close}>
            <X className="size-6" aria-hidden="true" />
          </button>
          {item.poster ? (
            <video
              src={hdSrc(item.src)}
              poster={hdSrc(item.poster)}
              aria-label={item.alt}
              style={fit}
              controls
              loop
              muted
              playsInline
              autoPlay={!prefersReducedMotion()}
            />
          ) : (
            <img src={hdSrc(item.src)} alt={item.alt} style={fit} />
          )}
        </dialog>
      )}
    </ZoomContext.Provider>
  );
}
