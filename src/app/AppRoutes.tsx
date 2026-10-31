import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import type { Pages } from "./pages";

export function AppRoutes({ pages }: { pages: Pages }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<pages.Home />} />
        <Route path="projetos" element={<pages.Projects />} />
        <Route path="projetos/:slug" element={<pages.ProjectDetail />} />
        <Route path="links" element={<pages.Links />} />
        <Route path="login" element={<pages.Login />} />
        <Route path="dashboard" element={<pages.Dashboard />} />
        <Route path="*" element={<pages.NotFound />} />
      </Route>
    </Routes>
  );
}
