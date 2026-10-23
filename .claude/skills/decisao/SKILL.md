---
name: decisao
description: Escreve a research e o ADR de uma escolha de tecnologia ou de arquitetura no portfolio-webdev. Use antes de adicionar uma biblioteca, serviço ou ferramenta nova, quando o backlog pede uma research (R01, R02, ...) ou quando uma decisão já registrada precisa mudar.
---

# Research e ADR

A regra do projeto: escolha de tecnologia passa por uma research em `docs/research/` e vira ADR em `docs/adr/` antes do código.

## 1. Research

- Copie o modelo de `docs/research/README.md` para `docs/research/<titulo-curto>.md`. Use o ID que o backlog já deu (R01, R02...) ou o próximo livre.
- Os critérios vêm do backlog e do enunciado (`docs/requisitos.md`), em ordem de importância.
- Toda afirmação sobre uma ferramenta vem da documentação oficial, com o link em **Fontes**. O que a fonte não confirma fica escrito como "não confirmado na fonte".
- Com três opções ou mais, delegue a coleta ao agent `pesquisador` e revise o que ele trouxer.

## 2. Quem decide

- Escolha técnica com um critério claro (bundle, compatibilidade com a stack, plano gratuito): recomende e siga para o ADR.
- Escolha de gosto, conteúdo ou custo (identidade visual, serviço pago): deixe a research com **Status: em aberto, aguardando a decisão do Savio**, mostre as opções e pare.

## 3. ADR

- Copie o modelo de `docs/adr/README.md` para `docs/adr/NNNN-titulo-curto.md`, com o próximo número.
- Preencha **O que aceitamos perder** com desvantagens reais, não genéricas.
- Se substitui um ADR antigo, mude o status do antigo para "Substituído por ADR NNNN".

## 4. Índices

Atualize as tabelas de `docs/research/README.md` e de `docs/adr/README.md`, e o item no backlog.
