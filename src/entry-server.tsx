import { QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "@/app/AppRoutes";
import type { Pages } from "@/app/pages";
import { createQueryClient } from "@/app/queryClient";
import { SeoContext } from "@/app/seoContext";
import { ThemeProvider } from "@/app/ThemeProvider";
import { projects } from "@/content/projects";
import { site, stores } from "@/content/site";
import { REPOS_KEY } from "@/hooks/useRepos";
import { cleanRepos } from "@/lib/repos";
import { renderSeoTags, seoForNotFound, type SeoData } from "@/lib/seo";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Links from "@/pages/Links";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import type { GithubRepo } from "@/types/github";

/** No build as páginas são renderizadas direto; no navegador continuam em pedaços separados. */
const pages: Pages = { Dashboard, Home, Links, Login, NotFound, ProjectDetail, Projects };

export function renderPage(url: string, repos: GithubRepo[]) {
  const queryClient = createQueryClient();
  const seo: { current: SeoData | null } = { current: null };

  // Sem repositórios no build, o navegador busca: lista vazia aqui viraria dado válido por 1 hora
  if (url === "/projetos" && repos.length > 0) queryClient.setQueryData(REPOS_KEY, repos);
  const repo = repos.find((item) => url === `/projetos/${item.name}`);
  if (repo) queryClient.setQueryData(["repos", repo.name], repo);

  const html = renderToString(
    <SeoContext.Provider value={seo}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StaticRouter location={url}>
            <AppRoutes pages={pages} />
          </StaticRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </SeoContext.Provider>,
  );

  const state = dehydrate(queryClient);
  // Sem isso os temporizadores do cache não deixam o processo do build terminar
  queryClient.clear();
  return { html, seo: seo.current, state };
}

export const staticPaths = [
  "/",
  "/projetos",
  "/links",
  "/login",
  "/dashboard",
  ...projects.map((project) => `/projetos/${project.slug}`),
];

export { cleanRepos, renderSeoTags, seoForNotFound, site, stores };
