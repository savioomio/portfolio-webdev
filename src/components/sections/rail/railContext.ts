import { createContext, useContext, useEffect, useRef } from "react";

/** Chamado a cada quadro. `loc` é a distância do painel até o centro: 0 é o painel na tela. */
export type RailFrame = (loc: number, time: number, pointerX: number) => void;

interface RailContextValue {
  subscribe: (index: number, frame: RailFrame) => () => void;
}

export const RailContext = createContext<RailContextValue | null>(null);
export const RailIndexContext = createContext(0);

export function useRailFrame(frame: RailFrame) {
  const rail = useContext(RailContext);
  const index = useContext(RailIndexContext);
  const latest = useRef(frame);

  useEffect(() => {
    latest.current = frame;
  });

  useEffect(
    () => rail?.subscribe(index, (loc, time, pointerX) => latest.current(loc, time, pointerX)),
    [rail, index],
  );
}
