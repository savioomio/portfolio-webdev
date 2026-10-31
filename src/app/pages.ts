import { lazy, type ComponentType } from "react";

export interface Pages {
  Home: ComponentType;
  Links: ComponentType;
  NotFound: ComponentType;
}

/** No navegador, cada página é um pedaço separado do pacote. */
export const lazyPages: Pages = {
  Home: lazy(() => import("@/pages/Home")),
  Links: lazy(() => import("@/pages/Links")),
  NotFound: lazy(() => import("@/pages/NotFound")),
};
