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

const loaders: { [Name in keyof Pages]: () => Promise<{ default: Pages[Name] }> } = {
  Dashboard: () => import("@/pages/Dashboard"),
  Home: () => import("@/pages/Home"),
  Links: () => import("@/pages/Links"),
  Login: () => import("@/pages/Login"),
  NotFound: () => import("@/pages/NotFound"),
  ProjectDetail: () => import("@/pages/ProjectDetail"),
  Projects: () => import("@/pages/Projects"),
};

/** No navegador, cada página é um pedaço separado do pacote. */
export const lazyPages: Pages = {
  Dashboard: lazy(loaders.Dashboard),
  Home: lazy(loaders.Home),
  Links: lazy(loaders.Links),
  Login: lazy(loaders.Login),
  NotFound: lazy(loaders.NotFound),
  ProjectDetail: lazy(loaders.ProjectDetail),
  Projects: lazy(loaders.Projects),
};

export function pageNameFor(pathname: string): keyof Pages {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return "Home";
  if (path === "/projetos") return "Projects";
  if (path.startsWith("/projetos/")) return "ProjectDetail";
  if (path === "/links") return "Links";
  if (path === "/login") return "Login";
  if (path === "/dashboard") return "Dashboard";
  return "NotFound";
}

/** Baixa a página antes de trocar de rota. */
export const preloadPage = (pathname: string) => loaders[pageNameFor(pathname)]();

/**
 * A página da URL precisa estar pronta antes de hidratar. Com ela ainda baixando,
 * o React descartaria o HTML gerado no build e mostraria o spinner no lugar.
 */
export async function pagesForHydration(pathname: string): Promise<Pages> {
  const name = pageNameFor(pathname);
  const page = await loaders[name]();
  return { ...lazyPages, [name]: page.default };
}
