import { lazy, type ComponentType } from "react";

export interface Pages {
  Dashboard: ComponentType;
  Home: ComponentType;
  Links: ComponentType;
  Login: ComponentType;
  NotFound: ComponentType;
  ProjectDetail: ComponentType;
  Projects: ComponentType;
}

/** No navegador, cada página é um pedaço separado do pacote. */
export const lazyPages: Pages = {
  Dashboard: lazy(() => import("@/pages/Dashboard")),
  Home: lazy(() => import("@/pages/Home")),
  Links: lazy(() => import("@/pages/Links")),
  Login: lazy(() => import("@/pages/Login")),
  NotFound: lazy(() => import("@/pages/NotFound")),
  ProjectDetail: lazy(() => import("@/pages/ProjectDetail")),
  Projects: lazy(() => import("@/pages/Projects")),
};
