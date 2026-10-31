# R09. SEO de uma SPA estática

- **Data:** 2026-10-31
- **Requisitos atendidos:** 1, 8

## Critérios

1. Funcionar no Workers Static Assets sem quebrar rotas, login, dashboard e 404.
2. HTML próprio por rota.
3. Compatibilidade com Vite 5 e React 19.
4. Risco até a entrega.
5. Código que o Savio consiga explicar no vídeo.

## Como o Workers serve os arquivos

O arquivo existente vence o fallback. O fallback `single-page-application` sempre serve `/index.html` com 200, sem opção de outro arquivo. Com a Home pré-renderizada, qualquer rota desconhecida receberia o HTML da Home com 200, o que o Google trata como soft 404.

| Requisição | Hoje | Proposto: `drop-trailing-slash` + `404-page` |
| --- | --- | --- |
| `/projetos/x`, com `projetos/x/index.html` | 307 para `/projetos/x/` | 200 |
| `/qualquer-coisa` | 200 com a Home | 404 com o `404.html` |
| `/assets/antigo.js` | 200 com HTML | 404 |

## O que o Google Search Central diz

- JavaScript é processado, mas a documentação recomenda SSR ou pré-render, porque melhora a velocidade e nem todos os bots executam JavaScript.
- Para SPA: History API e `<a href>` reais; erro com status 404 ou `noindex`.
- `noindex` no HTML original pode evitar a renderização: só em páginas que não devem ser indexadas.
- Sitemap: URLs absolutas e canônicas; `priority` e `changefreq` são ignorados.
- Dados estruturados em JSON-LD. `Person` entra dentro de `ProfilePage.mainEntity`; `BreadcrumbList` serve nas páginas de projeto.
- A tag `keywords` não é usada pela busca do Google.

## Opções

### A. Só metadados no cliente

Sem mudança de build, mas o HTML inicial é igual em todas as rotas: previews sociais e bots sem JavaScript veem os dados da Home.

### B. Head estático por rota, sem hidratação

Resolve metadados e 404, mas o corpo não vem no HTML e não há ganho de LCP.

### C. `renderToString` com script próprio

Sem dependência nova. `renderToString` aceita fragmento e combina com `hydrateRoot` em `#root`, mas não espera `React.lazy`. A saída é usar importações diretas no build e `lazy` no navegador.

### D. React Router Framework Mode

Caminho oficial de pré-render, mas remove o `index.html`, troca o plugin do Vite e muda a pasta de saída.

### E. vite-react-ssg e react-snap

Eliminadas: `vite-react-ssg` 0.9.2 exige Vite 6.4 e React Router 6, e `react-snap` depende de `puppeteer` 1.

## Comparação

| Critério | A | B | C | D |
| --- | --- | --- | --- | --- |
| Head por rota no HTML | Não | Sim | Sim | Sim |
| Corpo no HTML | Não | Parcial | Sim | Sim |
| Dependência nova | Não | Não | Não | Sim |
| Muda a estrutura do projeto | Não | Não | Pouco | Sim |
| Risco até 03/11 | Mínimo | Baixo | Médio | Médio |

## Recomendação

A pesquisa preferia D, com B como rede de segurança. Ficamos com C: entrega o corpo no HTML sem trocar a estrutura do projeto, e `hydrateRoot` em `#root` com `renderToString` é um uso documentado. Vira o [ADR 0014](../adr/0014-seo-pre-renderizacao.md).

## Fontes

- [Cloudflare: SPA](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- [Cloudflare: HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [Cloudflare: SSG e 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: erros e soft 404](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- [Google: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google: ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google: BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [React: renderToString](https://react.dev/reference/react-dom/server/renderToString)
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [React Router: pré-render](https://reactrouter.com/7.18.5/how-to/pre-rendering)
- [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg)
- [react-snap](https://github.com/stereobooster/react-snap)
