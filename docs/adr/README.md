# ADRs: registros de decisão de arquitetura

Um ADR registra **uma** decisão: o contexto, as opções comparadas, o critério e o que aceitamos perder. Quando a decisão muda, escreve-se um ADR novo que substitui o antigo, e o antigo passa a ter status "Substituído por ADR XXXX".

| # | Decisão | Status |
| --- | --- | --- |
| [0001](./0001-reaproveitar-portfolio-existente.md) | Reaproveitar o portfólio pessoal como base, com histórico novo | Aceito |
| [0002](./0002-hospedagem-cloudflare-workers.md) | Hospedar em Cloudflare Workers, num Worker separado do site pessoal | Aceito; a parte da Vercel foi substituída pelo ADR 0004 |
| [0003](./0003-qualidade-de-codigo.md) | ESLint + Prettier, com Husky, lint-staged e commitlint | Aceito |
| [0004](./0004-entrega-sem-vercel.md) | Entregar só com a Cloudflare, sem a Vercel | Aceito |
| [0005](./0005-deploy-automatico-github-actions.md) | Deploy automático pelo GitHub Actions | Aceito |
| [0006](./0006-harness-ia-claude-code.md) | Harness de IA com Claude Code, versionado no repositório | Aceito; o navegador no Mac foi substituído pelo ADR 0007 |
| [0007](./0007-navegador-no-mac-com-dev-browser.md) | Conferência no navegador do Mac com dev-browser | Aceito |
| [0008](./0008-identidade-faca-dourada.md) | Identidade visual: Faca Dourada | Aceito |
| [0009](./0009-rotas-e-dados.md) | React Router declarativo e TanStack Query | Aceito |
| [0010](./0010-backend-supabase-e-formspree.md) | Backend em Supabase e e-mail pelo Formspree | Aceito |
| [0011](./0011-formulario-rhf-zod.md) | Formulário com React Hook Form e Zod | Aceito |
| [0012](./0012-tema-sem-flash.md) | Tema com script no head e Context | Aceito |
| [0013](./0013-testes-vitest.md) | Testes com Vitest e Testing Library | Aceito |
| [0014](./0014-seo-pre-renderizacao.md) | SEO com pré-renderização no build e 404 real | Aceito |

## Modelo

Copie para `NNNN-titulo-curto.md`:

```markdown
# NNNN. Título da decisão

- **Status:** Proposto | Aceito | Substituído por ADR XXXX
- **Data:** AAAA-MM-DD
- **Research:** [research/xxx.md](../research/xxx.md)

## Contexto
Que problema exige uma decisão e quais restrições existem (prazo, requisito do enunciado, custo).

## Opções consideradas
- **Opção A:** prós / contras
- **Opção B:** prós / contras

## Critério
O que pesou na escolha, em ordem de importância.

## Decisão
O que foi escolhido, em uma ou duas frases.

## O que aceitamos perder
As desvantagens assumidas conscientemente.

## Consequências
O que muda no projeto a partir daqui (tarefas novas, restrições para o código).
```
