# ADRs: registros de decisão de arquitetura

Um ADR registra **uma** decisão: o contexto, as opções comparadas, o critério e o que aceitamos perder. Quando a decisão muda, escreve-se um ADR novo que substitui o antigo, e o antigo passa a ter status "Substituído por ADR XXXX".

| # | Decisão | Status |
| --- | --- | --- |
| [0001](./0001-reaproveitar-portfolio-existente.md) | Reaproveitar o portfólio pessoal como base, com histórico novo | Aceito |
| [0002](./0002-hospedagem-cloudflare-workers.md) | Hospedar em Cloudflare Workers, num Worker separado do site pessoal | Aceito; a parte da Vercel foi substituída pelo ADR 0004 |
| [0003](./0003-qualidade-de-codigo.md) | ESLint + Prettier, com Husky, lint-staged e commitlint | Aceito |
| [0004](./0004-entrega-sem-vercel.md) | Entregar só com a Cloudflare, sem a Vercel | Aceito |
| [0005](./0005-deploy-automatico-github-actions.md) | Deploy automático pelo GitHub Actions | Aceito |
| [0006](./0006-harness-ia-claude-code.md) | Harness de IA com Claude Code, versionado no repositório | Aceito |

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
