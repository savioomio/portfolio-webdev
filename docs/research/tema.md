# R04. Tema claro e escuro persistido, sem flash

- **Data:** 2026-10-31
- **Requisitos atendidos:** 6

## Critérios

1. Sem piscar o tema errado, inclusive com HTML pré-renderizado.
2. Persistência entre visitas.
3. Sem erro de hidratação.
4. Peso e manutenção.

O tema precisa ser aplicado antes da primeira pintura, logo antes do bundle. Só um script inline no HTML faz isso, e é o que a documentação do Tailwind recomenda.

## Opções

### next-themes

- Prós: 1,49 kB medidos; preferência do sistema e sincronização entre abas prontas.
- Contras: o README só trata do Next; o script é renderizado dentro da árvore do React, e a issue #385 traz o aviso do React 19 de que scripts em componentes não rodam em render no cliente. Pelo código da versão 0.4.6, o tema é aplicado em `useEffect`, então o shell renderizado no cliente (`404.html`) piscaria.

### Context, localStorage e script inline no `<head>`

- Prós: 0 kB; roda antes da primeira pintura em qualquer HTML; não depende do React.
- Contras: cerca de 40 linhas para escrever e testar; a sincronização entre abas fica por nossa conta.

### Zustand com persist

- Prós: 1,31 kB medidos.
- Contras: não resolve o flash, porque o store só existe depois do bundle. Uma biblioteca de estado só para isso é excesso.

## Comparação

| Critério | next-themes | Context + script | Zustand |
| --- | --- | --- | --- |
| Sem flash em HTML pré-renderizado | Sim | Sim | Só com script extra |
| Sem flash em shell do cliente | Não sozinho | Sim | Só com script extra |
| Persistência | Sim | Sim | Sim |
| Peso | 1,49 kB | 0 kB | 1,31 kB |

## Recomendação

Context, `localStorage` e script inline no `<head>`. Vira o [ADR 0012](../adr/0012-tema-sem-flash.md).

## Fontes

- [next-themes](https://github.com/pacocoursey/next-themes)
- [next-themes, issue 385](https://github.com/pacocoursey/next-themes/issues/385)
- [Tailwind 3: dark mode](https://v3.tailwindcss.com/docs/dark-mode)
- [Zustand: persist](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data)
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
