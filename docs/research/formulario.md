# R03. Biblioteca de formulário e validação

- **Data:** 2026-10-31
- **Requisitos atendidos:** 2, 4, 9

## Critérios

1. Mensagem específica por campo.
2. Compatibilidade com React 19.
3. Testabilidade.
4. Re-render.
5. Tamanho no bundle.

## Opções

### React Hook Form + Zod

- Prós: peer inclui React 19; inputs não controlados, então digitar não renderiza o formulário inteiro; mensagem no próprio schema; `isSubmitting` bloqueia o botão; a documentação tem seção de testes.
- Contras: é a opção mais pesada com o Zod clássico.
- Peso: 27 a 39 kB em gzip, somando RHF, resolver e Zod (medido no bundlejs).

### Formik + Yup

- Prós: `validationSchema` converte erros do Yup.
- Contras: valores no estado do React; a documentação não cita React 19; depende de `lodash`.
- Peso: cerca de 26,8 kB.

### Validação manual

- Prós: 0 kB; função pura é fácil de testar.
- Contras: erro, toque e envio escritos à mão; mais código para explicar.

## Comparação

| Critério | RHF + Zod | Formik + Yup | Manual |
| --- | --- | --- | --- |
| Mensagem por campo | No schema | No schema | À mão |
| React 19 | Peer declarado | Doc não cita | Nativo |
| Re-render ao digitar | Baixo | Maior | Depende do código |
| Testabilidade | Guia oficial | Sem guia lido | Função pura |
| Peso | 27 a 39 kB | ~26,8 kB | 0 kB |

## Recomendação

React Hook Form e Zod clássico, com `mode: "onTouched"`. Vira o [ADR 0011](../adr/0011-formulario-rhf-zod.md).

## Fontes

- [RHF: useForm](https://react-hook-form.com/docs/useform)
- [RHF: uso avançado e testes](https://react-hook-form.com/advanced-usage)
- [Resolvers](https://github.com/react-hook-form/resolvers)
- [Zod](https://zod.dev/)
- [Zod: mensagens](https://zod.dev/error-customization)
- [Formik](https://formik.org/docs/overview)
- [bundlejs](https://bundlejs.com/), ferramenta de medição, não é documentação oficial
