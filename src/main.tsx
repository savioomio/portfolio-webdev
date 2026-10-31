import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/app/AppRoutes";
import { lazyPages } from "@/app/pages";
import { CACHE_MAX_AGE, createQueryClient } from "@/app/queryClient";
import { ThemeProvider } from "@/app/ThemeProvider";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;
const queryClient = createQueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: "portfolio-cache",
});

const app = (
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: CACHE_MAX_AGE, buster: __BUILD_ID__ }}
    >
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes pages={lazyPages} />
        </BrowserRouter>
      </ThemeProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);

// Página gerada no build já vem com o HTML pronto; o 404.html vem vazio.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
