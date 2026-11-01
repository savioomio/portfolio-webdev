# 0015. Contagens de lojas editadas no painel e publicadas no build

- **Status:** Aceito
- **Data:** 2026-11-01

## Contexto

O dono quer mudar a quantidade de lojas pelo painel, sem perder a pré-renderização: os números aparecem no HTML, no SEO e nas embalagens 3D.

## Opções consideradas

Buscar os números no navegador, o que tira o valor do HTML e troca o texto depois de carregar. Reescrever o HTML num Worker, com mais uma peça no ar a dois dias da entrega. Ler o banco no build, o que mantém tudo estático.

## Decisão

As contagens ficam em `site_stats`, com uma linha só. O Vite lê essa linha no build e a entrega ao código como `__STORE_COUNTS__`. Um build agendado por dia publica a mudança, e o botão Run workflow do GitHub publica na hora.

## Consequências

- O número é SSR em todo lugar, inclusive no SEO e no 3D.
- A mudança não é instantânea: leva até um dia, ou um clique no GitHub.
- Sem banco, o build usa os valores padrão de `tools/storeCounts.ts`.
- O painel não dispara o deploy sozinho: isso pediria um token guardado numa função do backend.
