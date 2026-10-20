# 0001. Reaproveitar o portfólio pessoal como base, com histórico novo

- **Status:** Aceito
- **Data:** 2026-10-20

## Contexto

O trabalho pede um portfólio em React com identidade visual própria, e eu já tinha um publicado em `savioomiodev.com.br` (repositório `savioomio/meu-portfolio-3d`): React 19, TypeScript, Vite, Tailwind e uma cena 3D em React Three Fiber. O prazo é de 14 dias (20/10 a 03/11). O site pessoal precisa continuar no ar sem ser afetado pelo trabalho.

## Opções consideradas

- **Começar do zero:** histórico 100% dentro do prazo e liberdade total de arquitetura. Por outro lado, gasta dias refazendo identidade visual e cena 3D que já existem.
- **Desenvolver no próprio repositório pessoal:** zero setup. Por outro lado, mistura o trabalho com o site em produção, e cada experimento arrisca quebrar o site pessoal.
- **Copiar para um repositório novo, mantendo o histórico antigo:** preserva a origem de cada linha. Por outro lado, o histórico começaria meses antes do prazo, e um dos commits antigos saiu com o autor errado ("Laboratório FIAP").
- **Copiar para um repositório novo com histórico zerado:** um commit de importação que declara a origem, e daí em diante só commits do trabalho.

## Critério

1. Tempo para cumprir os 12 requisitos funcionais, que são onde está o trabalho de verdade.
2. Não arriscar o site pessoal em produção.
3. Histórico de commits distribuído dentro do prazo, como o enunciado pede.

## Decisão

Copiar o código do commit `36082d3` de `meu-portfolio-3d` para o repositório novo `savioomio/portfolio-webdev`, com histórico zerado. O commit inicial (`dc92a80`) cita o repositório e o commit de origem.

## O que aceitamos perder

- O histórico de como a parte visual e a cena 3D foram construídas não aparece neste repositório. Ele continua público em `savioomio/meu-portfolio-3d`.
- Herdamos dívidas do código antigo: componentes grandes, dados fixos no código e os bugs listados em [`requisitos.md`](../requisitos.md#bugs-encontrados-no-código-herdado).

## Consequências

- O primeiro commit é grande. Todos os seguintes seguem o padrão de branches e commits do projeto.
- Mudanças feitas aqui não voltam automaticamente para o site pessoal. Se algo valer para os dois, é preciso aplicar à mão.
