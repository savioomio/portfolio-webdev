# 0014. SEO com pré-renderização no build e 404 real

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/seo-spa.md](../research/seo-spa.md)

## Contexto

Como SPA, toda rota devolvia o mesmo HTML vazio com status 200. Quem compartilhava um link via os dados da Home, e um endereço inexistente era um soft 404 para o Google.

## Opções consideradas

Só metadados no cliente, head estático sem hidratação, `renderToString` com script próprio e Framework Mode do React Router. `vite-react-ssg` e `react-snap` foram eliminadas por incompatibilidade.

## Decisão

Depois do `vite build`, um segundo build (`src/entry-server.tsx`) renderiza cada rota com `renderToString`, e `tools/prerender.mjs` grava `dist/<rota>/index.html` com título, descrição, canônica, Open Graph e JSON-LD próprios. O navegador usa `hydrateRoot` no `#root`.

- **Rotas geradas:** Home, projetos, os 8 projetos e cada repositório público lido do GitHub no build, com o `GITHUB_TOKEN` do CI.
- **Workers:** `html_handling: drop-trailing-slash` e `not_found_handling: 404-page`. Rota inexistente responde 404 de verdade, com um `404.html` vazio que abre o app.
- **SEO por página:** o componente `Seo` declara os dados; o build escreve no HTML e o navegador atualiza ao navegar.
- **Dados estruturados:** `ProfilePage` com `Person` na Home, `BreadcrumbList` nos projetos.
- O sitemap é gerado no build, com `lastmod` só nos repositórios, e saem `keywords`, `priority` e `changefreq`.

O código das páginas continua dividido no navegador: `entry-server.tsx` importa as páginas direto e `app/pages.ts` usa `React.lazy`.

## O que aceitamos perder

- **Build mais longo e mais peças:** dois builds e um script próprio, que seguram o componente de cada rota em dois lugares.
- **Página precisa ser segura para renderizar fora do navegador:** nada de `window` durante o render.
- **Repositório novo:** abre normalmente para o visitante, mas responde 404 ao Google até o próximo deploy.
- **Dados do GitHub no HTML:** ficam com a idade do último deploy até o navegador atualizar.
- O Framework Mode faria parte disso sozinho; preferimos não trocar a estrutura a 3 dias da entrega.
