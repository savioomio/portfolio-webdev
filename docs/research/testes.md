# R05. Ferramentas de teste

- **Data:** 2026-10-31
- **Requisitos atendidos:** 9

## Critérios

1. Cobrir a validação do formulário e o bloqueio do dashboard sem login.
2. Integração com Vite 5.
3. Tempo no CI.

## Opções

### Vitest + Testing Library

- Prós: lê o Vite, com os mesmos aliases; `@testing-library/react` tem peer para React 19; validação testada com `userEvent`, como orienta a documentação do React Hook Form.
- Contras: roda em DOM simulado, sem navegador real. Vitest 5 exige Vite 6.4 e Vitest 4 exige Vite 6, então no Vite 5 o caminho é a versão 3.2.7.

### Playwright

- Prós: navegador real; `page.route()` simula GitHub e Supabase; é o único que valida F5 e link direto de verdade.
- Contras: exige instalar navegadores no CI, e a documentação não recomenda cacheá-los.

## Comparação

| Critério | Vitest + Testing Library | Playwright |
| --- | --- | --- |
| Validação do formulário | Sim | Sim |
| Bloqueio sem login | Sim, com rota em memória | Sim, no navegador |
| Integração com Vite 5 | Sim, na 3.2.7 | Independe do Vite |
| Tempo no CI | Sem download de navegador | Com download de navegador |
| F5 e link direto | Não | Sim |

O tempo no CI não está confirmado na fonte: a comparação é por inferência.

## Recomendação

Vitest 3.2.7, Testing Library e jsdom. Vira o [ADR 0013](../adr/0013-testes-vitest.md).

## Fontes

- [Vitest](https://vitest.dev/guide/)
- [Vitest: migração](https://vitest.dev/guide/migration)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [React Hook Form: testes](https://react-hook-form.com/advanced-usage)
- [Playwright: CI](https://playwright.dev/docs/ci)
- [Vite: versões](https://vite.dev/releases)
