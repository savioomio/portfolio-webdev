import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { hydrate } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/app/AppRoutes";
import { lazyPages, pagesForHydration, type Pages } from "@/app/pages";
import { CACHE_KEY, CACHE_MAX_AGE, createQueryClient, shouldPersistQuery } from "@/app/queryClient";
import { ThemeProvider } from "@/app/ThemeProvider";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
const queryClient = createQueryClient();

// Dados do GitHub que vieram prontos no HTML da página
const preloaded = document.getElementById("query-state")?.textContent;
if (preloaded) hydrate(queryClient, JSON.parse(preloaded));

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    // O navegador pode bloquear o acesso: o site funciona sem cache salvo
    return undefined;
  }
}

const persister = createAsyncStoragePersister({ storage: browserStorage(), key: CACHE_KEY });

const renderApp = (pages: Pages) => (
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: CACHE_MAX_AGE,
        buster: __BUILD_ID__,
        dehydrateOptions: { shouldDehydrateQuery: shouldPersistQuery },
      }}
    >
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes pages={pages} />
        </BrowserRouter>
      </ThemeProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);

async function start() {
  // Página gerada no build já vem com o HTML pronto; o 404.html vem vazio.
  if (root.firstElementChild) {
    const pages = await pagesForHydration(window.location.pathname).catch(() => lazyPages);
    hydrateRoot(root, renderApp(pages));
  } else {
    createRoot(root).render(renderApp(lazyPages));
  }
}

void start();
