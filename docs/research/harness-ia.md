# R06. Harness de IA: ferramenta, modelo, instruções, skills, agents, hooks e MCPs

- **Data:** 2026-10-22
- **Status:** fechada, virou o [ADR 0006](../adr/0006-harness-ia-claude-code.md)
- **Requisitos atendidos:** 11, 12, vídeo parte 3

## Contexto

O projeto é feito com IA desde o primeiro commit, e o vídeo precisa mostrar como ela segue os padrões. Até aqui, as regras ficavam só no `CLAUDE.md` e na memória da sessão. A memória se perde no PC do lab, que apaga tudo ao desligar ([runbook](../runbooks/setup-pc-do-lab.md)).

## Critérios

1. Instruções versionadas no repositório, seguidas sem precisar repeti-las no prompt.
2. Regras críticas garantidas por código, e não só por texto que a IA pode esquecer.
3. Fluxo inteiro sem sair da ferramenta: terminal (`git`, `gh`, `npm`, `wrangler`) e navegador (MCP).
4. Tarefas repetidas empacotadas (ciclo de uma tarefa, research + ADR) e tarefas isoladas em contexto próprio (revisão, pesquisa).
5. Funcionar igual no Windows do lab e no Mac.

## Opções

### A. Claude Code

- Instruções: `CLAUDE.md` na raiz, lido em toda sessão.
- Skills: `.claude/skills/<nome>/SKILL.md`, versionadas. A IA carrega a skill sozinha quando a `description` combina com o pedido, ou pelo comando `/nome`.
- Agents: `.claude/agents/*.md`, cada um com contexto, prompt e ferramentas próprios; devolve só o resumo final.
- Hooks: `.claude/settings.json`. Um `PreToolUse` que sai com código 2 **bloqueia** a ação; um `SessionStart` pode verificar o ambiente ao abrir a sessão.
- MCP: `.mcp.json` versionado (escopo de projeto), com aprovação na primeira vez.
- Prós: é o único dos três em que as cinco peças (instruções, skills, agents, hooks e MCP) aparecem versionáveis na documentação consultada; já é a ferramenta usada no projeto.
- Contras: depende de assinatura; os comandos de MCP com `npx` mudam no Windows (`cmd /c`).

### B. Cursor

- Instruções: `.cursor/rules/*.mdc`, com quatro modos (sempre, por glob, a pedido do agente pela descrição, manual), ou `AGENTS.md` na raiz e em subpastas.
- Prós: regras por glob ajudam em projetos grandes; editor completo.
- Contras: a página de regras consultada não trata de MCP, hooks nem subagents, então esses pontos ficaram sem confirmação; trocaria o editor e o fluxo que já funcionam.

### C. GitHub Copilot

- Instruções: `.github/copilot-instructions.md` para o repositório inteiro e `.github/instructions/*.instructions.md` com `applyTo` por caminho. O agente também aceita `AGENTS.md`, ou um `CLAUDE.md` único na raiz.
- Prós: integrado ao GitHub (agente na nuvem e revisão de PR seguem as instruções).
- Contras: a documentação consultada não trata de hooks que bloqueiam ações nem de skills; a revisão de PR seria um segundo revisor, não o fluxo principal.

## Comparação

| Critério | A. Claude Code | B. Cursor | C. Copilot |
| --- | --- | --- | --- |
| 1. Instruções versionadas | `CLAUDE.md` | `.cursor/rules`, `AGENTS.md` | `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md` |
| 2. Regra garantida por código | hooks `PreToolUse` | não confirmado | não confirmado |
| 3. Terminal + navegador | sim (Bash e MCP) | não confirmado na fonte | agente na nuvem |
| 4. Skills e agents | `.claude/skills`, `.claude/agents` | não confirmado | não confirmado |
| 5. Windows e Mac | sim, com MCP do Chrome por máquina | sim | sim |

## Recomendação

A. Claude Code, com o modelo da sessão principal (Claude Opus 5.5) e os agents herdando o mesmo modelo. Um bônus: o Copilot aceita um `CLAUDE.md` na raiz, então as instruções não ficam presas à ferramenta.

## Fontes

- [Skills · Claude Code](https://code.claude.com/docs/en/skills)
- [Subagents · Claude Code](https://code.claude.com/docs/en/sub-agents)
- [Hooks · Claude Code](https://code.claude.com/docs/en/hooks)
- [MCP · Claude Code](https://code.claude.com/docs/en/mcp)
- [Rules · Cursor](https://cursor.com/docs/context/rules)
- [Repository custom instructions · GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)
