import { useRef, useState } from "react";
import { useRailFrame } from "./railContext";

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

  useRailFrame((loc, time) => {
    if (touched.current || Math.abs(loc) >= 0.3 || time - lastTurn.current < 3.2) return;
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
      <figure className="screen-frame" role="tabpanel" aria-label={screen.label}>
        <img src={screen.src} alt={screen.alt} width={1200} height={750} loading="lazy" />
        <figcaption>Print real, com dados fictícios</figcaption>
      </figure>
    </div>
  );
}
