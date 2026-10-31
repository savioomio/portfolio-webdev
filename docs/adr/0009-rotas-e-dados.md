# 0009. React Router declarativo e TanStack Query

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/rotas-e-dados.md](../research/rotas-e-dados.md)

## Contexto

O site precisa de `/projetos/:slug`, 404 e erro de API, com dados do GitHub sem requisição repetida ao navegar. Sem token, a API do GitHub permite 60 requisições por hora por IP, e no laboratório a turma divide o mesmo IP.

## Opções consideradas

- **Roteador:** React Router 7, TanStack Router, wouter.
- **Dados:** TanStack Query, SWR, `fetch` manual.

## Decisão

React Router 7 no modo declarativo, com `React.lazy` por rota, e TanStack Query com:

- `staleTime` de 1 hora e `gcTime` de 24 horas;
- cache persistido no `localStorage`, invalidado a cada build pelo `buster`;
- `useRepo` lendo a lista já baixada como `initialData`, então abrir um projeto não gasta outra requisição;
- sem nova tentativa em erro da API do GitHub, com mensagem própria para o limite (403/429).

Na Home, a consulta só acontece quando a seção do GitHub chega perto da tela.

## O que aceitamos perder

- Cerca de 12 kB no bundle.
- A tipagem completa de rotas do TanStack Router.
- `errorElement` e `lazy` do modo de dados: o erro de renderização fica num `ErrorBoundary` nosso e o erro de API é tratado em cada tela.
- Dados com até 1 hora de atraso em relação ao GitHub.
