# 0007. Conferência no navegador do Mac com dev-browser

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/harness-ia.md](../research/harness-ia.md)

## Contexto

O [ADR 0006](./0006-harness-ia-claude-code.md) previu o MCP do Chrome em cada máquina. O Mac principal não tem Google Chrome: o navegador padrão é o Comet, baseado em Chromium, e o `--autoConnect` do MCP procura o perfil do Chrome. A conferência precisa usar a sessão já logada, pedir permissão uma vez só e ficar sempre na mesma aba.

## Opções consideradas

- **`dev-browser`:** conecta pelo WebSocket do navegador aberto e guarda a conexão num processo em segundo plano. Por outro lado, não roda no Windows e não faz Lighthouse.
- **MCP do Chrome apontado para o Comet:** mantém uma ferramenta só nas duas máquinas. Por outro lado, não foi testado com o Comet.
- **Instalar o Google Chrome no Mac só para isso:** nada muda no harness. Por outro lado, duplica logins num navegador que o Savio não usa.

## Critério

1. Reaproveitar a sessão logada com uma autorização só.
2. Funcionar hoje, com a entrega em 03/11.

## Decisão

No Mac, conferir com o `dev-browser`, sempre na aba nomeada `portfolio`, e medir o Lighthouse pelo CLI usando o binário do Comet. No PC do lab continua o MCP do Chrome.

## O que aceitamos perder

- Dois caminhos para a mesma tarefa, e a skill `conferir-no-navegador` precisa descrever os dois.
- O `dev-browser` é instalado por máquina, fora do repositório.

## Consequências

- O `dev-browser` tem acesso ao que está logado no Comet: use só a aba do projeto.
