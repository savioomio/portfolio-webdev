# 0013. Testes com Vitest e Testing Library

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/testes.md](../research/testes.md)

## Contexto

O requisito 9 pede testes que cubram, no mínimo, a validação do formulário e o bloqueio do dashboard sem login.

## Opções consideradas

Vitest com Testing Library, e Playwright.

## Decisão

Vitest 3.2.7 com Testing Library e jsdom, rodando no CI antes do build. O merge na `main` depende desse passo. Além dos dois casos pedidos, os testes cobrem o clique duplo no envio, o campo-armadilha, os estados de carregando, erro e vazio dos repositórios, o limite da API do GitHub e as tags de SEO.

## O que aceitamos perder

- Navegador real: F5, 404 e status do Worker seguem conferidos à mão no deploy.
- Vitest atual: a versão fica presa à 3.2 enquanto o projeto estiver no Vite 5.
- O teste prova o bloqueio da rota. Quem protege os dados é o RLS, e ele não é coberto aqui.
