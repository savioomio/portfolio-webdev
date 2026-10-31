// Gera o HTML pronto de cada rota, o 404.html e o sitemap depois do build do Vite.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrBundle = path.join(root, "dist-ssr", "entry-server.js");

const { cleanRepos, renderPage, renderSeoTags, seoForNotFound, site, staticPaths } = await import(
  pathToFileURL(ssrBundle).href
);

async function fetchRepos() {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const url = `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed&type=owner`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
    return cleanRepos(await response.json());
  } catch (error) {
    // Sem o GitHub o deploy continua: só as páginas de repositório ficam para o navegador
    console.warn(`Repositórios fora do build: ${error.message}`);
    return [];
  }
}

const template = await readFile(path.join(dist, "index.html"), "utf8");

function fillHead(seo) {
  return template.replace(
    /<!--head:start-->[\s\S]*<!--head:end-->/,
    () => renderSeoTags(seo), // Função: um `$` no texto não vira padrão de substituição
  );
}

async function writePage(route, content) {
  const file =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

const repos = await fetchRepos();
const routes = [...staticPaths, ...repos.map((repo) => `/projetos/${repo.name}`)];
const sitemap = [];

for (const route of routes) {
  const { html, seo, state } = renderPage(route, repos);
  if (!seo) throw new Error(`A rota ${route} não declarou SEO`);

  const stateScript = state.queries.length
    ? `<script id="query-state" type="application/json">${JSON.stringify(state).replace(/</g, "\\u003c")}</script>`
    : "";
  const page = fillHead(seo)
    .replace("<!--app-html-->", () => html)
    .replace("</body>", () => `${stateScript}</body>`);
  await writePage(route, page);

  if (!seo.noindex) {
    const repo = repos.find((item) => route === `/projetos/${item.name}`);
    sitemap.push({ loc: `${site.url}${route === "/" ? "/" : route}`, lastmod: repo?.pushed_at });
  }
}

// O 404 vai sem conteúdo: o React decide no navegador, inclusive para repositório criado depois do build
await writeFile(
  path.join(dist, "404.html"),
  fillHead(seoForNotFound()).replace("<!--app-html-->", ""),
);

const urls = sitemap
  .map(({ loc, lastmod }) => {
    const date = lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : "";
    return `  <url><loc>${loc}</loc>${date}</url>`;
  })
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`Pré-renderização: ${routes.length} páginas, ${sitemap.length} no sitemap.`);
