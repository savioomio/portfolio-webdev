import { createContext } from "react";
import type { SeoData } from "@/lib/seo";

/** No build, guarda o SEO da página renderizada para escrever no `<head>`. */
export const SeoContext = createContext<{ current: SeoData | null } | null>(null);
