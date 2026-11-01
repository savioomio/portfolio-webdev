import { useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import { useRailFrame } from "@/hooks/useRailFrame";
import { useZoom } from "@/hooks/useZoom";

export interface Screen {
  label: string;
  src: string;
  alt: string;
}

/** Telas reais em abas: giram sozinhas até o visitante escolher uma. */
export function ScreenTabs({ title, screens }: { title: string; screens: Screen[] }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const lastTurn = useRef(0);
  const zoom = useZoom();

  useRailFrame((loc, time) => {
    if (touched.current || prefersReducedMotion()) return;
    if (Math.abs(loc) >= 0.3 || time - lastTurn.current < 3.2) return;
    lastTurn.current = time;
    setActive((current) => (current + 1) % screens.length);
  });

  const screen = screens[active];

  return (
    <div className="screens">
      <div className="screen-tabs" role="tablist" aria-label={title}>
        {screens.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => {
              touched.current = true;
              setActive(index);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={screen.label}>
        <figure className="screen-frame">
          <img
            src={screen.src}
            alt={screen.alt}
            width={1200}
            height={750}
            loading="lazy"
            {...zoom(screen)}
          />
          <figcaption>Print real, com dados fictícios</figcaption>
        </figure>
      </div>
    </div>
  );
}
