import { useContext, useEffect, useRef } from "react";
import {
  RailContext,
  RailIndexContext,
  type RailFrame,
} from "@/components/sections/rail/railContext";

/** Recebe cada quadro do trilho enquanto o painel estiver perto da tela. */
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
