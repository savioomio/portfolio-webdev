# 0006. Harness de IA com Claude Code, versionado no repositório

- **Status:** Aceito
- **Data:** 2026-10-22
- **Research:** [research/harness-ia.md](../research/harness-ia.md)

## Contexto

A IA escreve a maior parte do código e precisa seguir os padrões sem que eles sejam repetidos em cada prompt. O PC do lab apaga tudo ao desligar, inclusive a memória da IA; só o que está no repositório sobrevive.

## Opções consideradas

- **Claude Code:** instruções, skills, agents, hooks e MCP, todos versionáveis. Por outro lado, o MCP com `npx` muda de comando entre Windows e Mac.
- **Cursor:** regras por glob e `AGENTS.md`. Por outro lado, hooks e subagents não foram confirmados na documentação consultada, e trocaria o editor.
- **GitHub Copilot:** instruções por repositório e por caminho, e aceita `CLAUDE.md`. Por outro lado, não há hooks que bloqueiam ações nem skills na documentação consultada.

## Critério

1. Regras críticas garantidas por código (hooks), não só por texto.
2. Tudo versionado no repositório, sobrevivendo ao PC do lab.
3. Fluxo inteiro (terminal e navegador) na mesma ferramenta.

## Decisão

Claude Code, com o modelo da sessão principal (Claude Opus 5.5). O harness fica no repositório:

| Peça | Arquivo | Papel |
| --- | --- | --- |
| Instruções | `CLAUDE.md` | Fluxo, regras, arquitetura e nomenclatura |
| Permissões e hooks | `.claude/settings.json` | Libera comandos de verificação; liga os hooks |
| Hook `PreToolUse` | `.claude/hooks/guard-bash.mjs` | Bloqueia pular os hooks do Git, config global do Git e deploy no Worker do site pessoal |
| Hook `SessionStart` | `.claude/hooks/lab-check.mjs` | No PC do lab, avisa o que falta do setup |
| Skills | `.claude/skills/` | `tarefa` (ciclo completo), `decisao` (research + ADR), `conferir-no-navegador` |
| Agents | `.claude/agents/` | `revisor` (diff contra as regras), `pesquisador` (research com fontes) |
| MCP | `.mcp.json` | Documentação da Cloudflare |

O MCP do Chrome fica no escopo de usuário, instalado pelo runbook do lab, porque o comando muda entre Windows e Mac.

## O que aceitamos perder

- Dependência de uma ferramenta paga; o `CLAUDE.md` continua legível por outras (o Copilot aceita).
- O MCP do Chrome não fica versionado; é um comando a rodar por máquina.
- Os hooks rodam em Node: sem Node na máquina, eles não funcionam (o projeto já exige Node).

## Consequências

- Uma regra nova que precise ser garantida vira hook; uma regra de estilo vira texto no `CLAUDE.md`.
- Credenciais (tokens, segredos) continuam sendo criadas pelo Savio; o harness não grava segredo.
