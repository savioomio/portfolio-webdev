# 0012. Tema com script no head e Context

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/tema.md](../research/tema.md)

## Contexto

O requisito 6 pede tema claro e escuro persistido entre visitas. O risco é piscar a cor errada ao abrir a página, porque o React só roda depois do bundle.

## Opções consideradas

`next-themes`, Context com `localStorage` e script inline, e Zustand com persist.

## Decisão

Um script inline no `<head>` lê o `localStorage` (ou a preferência do sistema) e grava `data-theme` no `<html>` antes da primeira pintura. O `ThemeProvider` só acompanha o valor, grava a escolha e sincroniza outras abas pelo evento `storage`. O botão traz os dois ícones no HTML e o CSS mostra um, então o primeiro render não depende do tema e não há erro de hidratação.

## O que aceitamos perder

- A API pronta do `next-themes`: são cerca de 40 linhas nossas.
- Uma CSP futura vai precisar de hash para o script inline.
