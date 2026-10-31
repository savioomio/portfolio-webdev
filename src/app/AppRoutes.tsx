import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import type { Pages } from "./pages";

export function AppRoutes({ pages }: { pages: Pages }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<pages.Home />} />
        <Route path="links" element={<pages.Links />} />
        <Route path="*" element={<pages.NotFound />} />
      </Route>
    </Routes>
  );
}
