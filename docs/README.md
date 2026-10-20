# Documentação do projeto

Tudo o que não é código, mas guia o código: o que precisa ser feito, por que cada decisão foi tomada e como operar o projeto.

| Pasta / arquivo | O que tem | Quando mexer |
| --- | --- | --- |
| [`requisitos.md`](./requisitos.md) | Enunciado do trabalho e diagnóstico do código herdado | Só se o professor mudar o enunciado |
| [`planejamento.md`](./planejamento.md) | Cronograma até 03/11, stack proposta, arquitetura alvo e fluxo de entrega | Quando o plano mudar |
| [`tasks/backlog.md`](./tasks/backlog.md) | Lista de tarefas com branch, requisito e critério de aceite | Ao começar e ao terminar cada tarefa |
| [`research/`](./research/) | Comparação de alternativas antes de uma decisão | Antes de escolher uma tecnologia |
| [`adr/`](./adr/) | Decisões de arquitetura (ADRs): o que foi escolhido, contra o quê e o que aceitamos perder | Depois de cada research concluída |
| [`runbooks/`](./runbooks/) | Passo a passo de operações (deploy, setup da máquina) | Quando um procedimento muda |

## Fluxo entre os documentos

```
tarefa no backlog ──► research (compara opções) ──► ADR (registra a escolha) ──► código
                                                         │
                                                         └──► vira a "justificativa da stack" no vídeo
```

A parte 2 do vídeo de entrevista ("quais opções você comparou, qual critério usou e o que aceitou perder") sai direto dos ADRs, por isso todo ADR tem essas três seções.

## Convenções

- Arquivos em `kebab-case.md`, em português.
- ADRs numerados em sequência: `adr/0003-titulo-curto.md`. Um ADR aceito não é editado; se a decisão mudar, cria-se outro que o substitui.
- Research: `research/titulo-curto.md`, sempre linkada pelo ADR que ela originou.
- Tarefas têm ID (`T01`, `R01` para research) e são referenciadas nas mensagens de PR.
