import { useContext, useEffect } from "react";
import { SeoContext } from "@/app/seoContext";
import { applySeo, type SeoData } from "@/lib/seo";

/** Cada página declara o próprio SEO: o build escreve no HTML e o navegador atualiza ao navegar. */
export function Seo({ data }: { data: SeoData }) {
  const collector = useContext(SeoContext);
  if (collector) collector.current = data;

  const serialized = JSON.stringify(data);
  useEffect(() => {
    applySeo(JSON.parse(serialized) as SeoData);
  }, [serialized]);

  return null;
}
