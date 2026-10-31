# Researches

Uma research compara alternativas **antes** de uma decisão. Ao terminar, ela vira um ADR em [`../adr/`](../adr/) e a escolha passa a valer para o código.

| ID | Pergunta | Fase | Arquivo |
| --- | --- | --- | --- |
| R01 | Rotas e busca de dados: qual roteador e qual camada de cache? | 1 | a criar |
| R02 | Backend (auth + banco) e envio de e-mail | 2 | a criar |
| R03 | Biblioteca de formulário e validação | 2 | a criar |
| R04 | Tema claro/escuro persistido sem flash | 3 | a criar |
| R05 | Ferramentas de teste | 4 | a criar |
| R06 | Harness de IA: ferramenta, modelo, instruções, skills, agents, MCPs | 0 | [harness-ia.md](./harness-ia.md) (ADR 0006) |
| R07 | Identidade visual: o que representa a área de e-commerce? | 1 | [identidade-visual.md](./identidade-visual.md) (ADR 0008) |
| R08 | Deploy automático: Workers Builds ou GitHub Actions? | 0 | [deploy-automatico.md](./deploy-automatico.md) (ADR 0005) |

As perguntas detalhadas e os critérios de cada uma estão no [backlog](../tasks/backlog.md).

## Modelo

Copie para `titulo-curto.md`:

```markdown
# RNN. Pergunta

- **Data:** AAAA-MM-DD
- **Requisitos atendidos:** 2, 3, 8

## Critérios
1. O que mais importa (ex.: cache entre páginas)
2. ...

## Opções
### Opção A
- Prós:
- Contras:
- Peso no bundle / custo / plano gratuito:

### Opção B
...

## Comparação
| Critério | A | B | C |
| --- | --- | --- | --- |

## Recomendação
Qual escolher e por quê. Vira o ADR NNNN.

## Fontes
- links da documentação oficial consultada
```
