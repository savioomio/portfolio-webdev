# 0011. Formulário com React Hook Form e Zod

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/formulario.md](../research/formulario.md)

## Contexto

O requisito 4 pede validação por campo com mensagem específica, e o requisito 2 pede o botão bloqueado durante o envio. O requisito 9 pede testes dessa validação.

## Opções consideradas

React Hook Form com Zod, Formik com Yup, e validação manual.

## Decisão

React Hook Form com Zod, com `mode: "onTouched"`, para validar ao sair do campo e não a cada tecla. Os schemas ficam em `src/schemas/`, e o envio fica no hook `useContactForm`, com uma trava contra clique duplo.

## O que aceitamos perder

Até cerca de 39 kB no pedaço da Home, contra 0 kB da validação manual. É o pior número das três opções; ganhamos tipagem derivada do schema e menos re-render.
