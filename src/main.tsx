import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/app/AppRoutes";
import { lazyPages } from "@/app/pages";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes pages={lazyPages} />
    </BrowserRouter>
  </StrictMode>
);

// Página gerada no build já vem com o HTML pronto; o 404.html vem vazio.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
