---
name: conferir-no-navegador
description: Confere uma mudança no Chrome do Savio pelo MCP chrome-devtools (site local ou publicado) — print, erros do console, requisições com falha e versão de celular em 390 px — e, quando a tarefa é de performance, roda o Lighthouse mobile. Use depois de qualquer mudança de interface e depois de cada deploy.
---

# Conferir no navegador

## Pré-requisitos

- As ferramentas `mcp__chrome-devtools__*` precisam estar disponíveis. Se não estiverem, siga o passo 4 de `docs/runbooks/setup-pc-do-lab.md` (no Mac, o mesmo comando sem `cmd /c` e sem `MSYS_NO_PATHCONV=1`).
- Site local: `npm run dev` em segundo plano, em <http://localhost:5173>. Site publicado: <https://webdev.savioomiodev.com.br>.

## Passos

1. Abra uma aba nova com a página da mudança (`new_page`). Não feche nem mexa nas outras abas do Savio.
2. Confira o conteúdo pela árvore de acessibilidade (`take_snapshot`) e tire um print (`take_screenshot`) quando o visual importar.
3. Console: `list_console_messages` com `error` e `warn`. Erro novo é problema; aviso antigo, só anote.
4. Rede: `list_network_requests` e procure respostas 4xx e 5xx ou requisições que não deveriam existir.
5. Celular: `emulate` (ou `resize_page`) para 390 × 844 e repita os passos 2 e 3.
6. Performance (tarefas de req 8): `lighthouse_audit` no modo mobile; a meta é nota ≥ 80.

## Limites

- Não digite senhas, não crie tokens e não aceite telas de permissão ou de pagamento: peça ao Savio.
- Com a depuração remota ligada, o MCP enxerga tudo o que está logado no Chrome. Use só as abas do projeto.

## Relatório

Uma linha por item conferido (ok ou problema, com o que apareceu), e o print quando houver mudança visual.
