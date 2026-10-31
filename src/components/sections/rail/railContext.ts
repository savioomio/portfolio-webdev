import { createContext } from "react";

/** Chamado a cada quadro. `loc` é a distância do painel até o centro: 0 é o painel na tela. */
export type RailFrame = (loc: number, time: number, pointerX: number) => void;

interface RailContextValue {
  subscribe: (index: number, frame: RailFrame) => () => void;
}

export const RailContext = createContext<RailContextValue | null>(null);
export const RailIndexContext = createContext(0);
