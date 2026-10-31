# R01. Rotas e busca de dados: qual roteador e qual camada de cache?

- **Data:** 2026-10-31
- **Requisitos atendidos:** 1, 2, 3, 8

## Critérios

1. Cache entre páginas, sem requisição repetida ao GitHub.
2. Estados de carregamento, erro e vazio.
3. Compatibilidade com a pré-renderização no build.
4. Tamanho do bundle.
5. Curva de aprendizado.

## Opções: roteador

### React Router 7

- Prós: já instalado; rotas aninhadas, `useParams` e `Navigate` cobrem o que precisamos; `StaticRouter` renderiza no build.
- Contras: pré-render oficial só existe no Framework Mode; sem cache entre rotas.
- Peso: 32,3 kB em gzip (medido no bundlejs), já no bundle atual.

### TanStack Router

- Prós: tipagem completa de rotas e parâmetros de busca; cache SWR nos loaders.
- Contras: migração completa, e o guia de SSR avisa que as APIs podem mudar até o TanStack Start estabilizar.
- Peso: não confirmado na fonte.

### wouter

- Prós: 2,93 kB medidos; SSR com `ssrPath`.
- Contras: sem data loaders e sem erro declarativo por rota. Compatibilidade com React 19 não confirmada na fonte.

## Opções: dados

### TanStack Query

- Prós: cache, deduplicação e novas tentativas prontos; `isPending`, `isError` e dado vazio mapeiam direto para o requisito 2; persistência oficial com `maxAge` e `buster`.
- Contras: o padrão é `staleTime` 0, então sem configurar a navegação refaz a chamada; `gcTime` precisa ser maior ou igual a `maxAge`.
- Peso: 9,92 kB + 2,02 kB de persistência (medidos, versão 5.105).

### SWR

- Prós: 6,39 kB medidos; API simples.
- Contras: `revalidateIfStale` vem ligado, não há TTL na página de API, e o exemplo oficial de persistência grava só no `beforeunload`.

### fetch manual

- Prós: 0 kB.
- Contras: cache, deduplicação e persistência escritos à mão; `useEffect` refaz a chamada a cada montagem.

## Comparação

| Critério | RR 7 + Query | TanStack Router + Query | wouter + SWR | RR 7 + fetch |
| --- | --- | --- | --- | --- |
| Cache entre páginas | Sim, com `staleTime` longo | Sim | Sim, com imutável | Manual |
| TTL no localStorage | `maxAge` nativo | `maxAge` nativo | Manual | Manual |
| Estados | Prontos | Prontos | Prontos | Manual |
| Peso adicionado | ~12 kB | Roteador + ~12 kB | ~9 kB, troca o roteador | 0 kB |
| Curva | Baixa | Alta | Baixa, mas falta recurso | Baixa, muito código |

## Recomendação

React Router 7 no modo declarativo, com TanStack Query e persistência em `localStorage`. Vira o [ADR 0009](../adr/0009-rotas-e-dados.md).

Limite da API do GitHub: 60 requisições por hora por IP, sem token. O `304` só é isento com `Authorization`, então ETag não economiza cota no navegador.

## Fontes

- [React Router: modos](https://reactrouter.com/start/modes)
- [TanStack Router: comparação](https://tanstack.com/router/latest/docs/framework/react/comparison)
- [TanStack Router: SSR](https://tanstack.com/router/latest/docs/framework/react/guide/ssr)
- [wouter](https://github.com/molefrog/wouter)
- [TanStack Query: padrões](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [TanStack Query: persistência](https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient)
- [TanStack Query: persister assíncrono](https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister)
- [SWR: API](https://swr.vercel.app/docs/api)
- [SWR: cache](https://swr.vercel.app/docs/advanced/cache)
- [GitHub: limites da API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [GitHub: boas práticas](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api)
- [bundlejs](https://bundlejs.com/), ferramenta de medição, não é documentação oficial
