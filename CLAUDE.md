# portfolio-webdev

Trabalho da faculdade com entrega em **03/11/2026**: portfólio em React publicado e vídeo de entrevista técnica. O enunciado completo está em `docs/requisitos.md`.

## Antes de qualquer tarefa

1. Leia `docs/planejamento.md` (cronograma, stack proposta, arquitetura alvo, fluxo de entrega).
2. Pegue a próxima tarefa aberta em `docs/tasks/backlog.md`, use a branch indicada nela e marque `[~]` ao começar.
3. Decisões tomadas estão em `docs/adr/`. Não reabra uma decisão sem um motivo novo; se mudar, escreva um ADR que substitui o anterior.
4. Escolha de tecnologia passa por uma research em `docs/research/` e vira ADR antes do código.

## Regras

- **PC do laboratório** (Windows, usuário `labsfiap`): ele apaga tudo ao desligar, inclusive a memória do Claude Code. No começo da sessão, rode o [setup do PC do lab](docs/runbooks/setup-pc-do-lab.md) inteiro (autor, dependências, login no Cloudflare, MCP do Chrome); antes de sair, tudo enviado ao GitHub e os logins encerrados. No Mac (máquina principal) nada se perde e o runbook não se aplica.
- **Comandos:** antes de rodar cada comando, diga em uma frase o que ele faz e por quê; depois, o resultado. Nunca rode comandos em sequência sem explicar.
- **Autor dos commits:** `savioomio <saviopessoaafonso@gmail.com>`. No PC do laboratório, confira `git config user.email` antes do primeiro commit e configure só no repo, nunca `--global` (`docs/runbooks/setup-pc-do-lab.md`).
- **Commits:** Conventional Commits em português, ex.: `feat: adiciona validação do formulário de contato`. Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`.
- **Hooks do Git** ([ADR 0003](docs/adr/0003-qualidade-de-codigo.md)): o `pre-commit` roda ESLint e Prettier nos arquivos do commit e o `commit-msg` roda o commitlint. Nunca use `--no-verify`; se um hook recusar, corrija a causa e faça um commit novo. O CI repete as mesmas checagens.
- **Branches:** GitHub Flow. Uma branch por tarefa (`feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, `test/*`, `perf/*`), integrada na `main` por PR. Não commitar direto na `main`.
- **Deploy:** este projeto é o Worker `portfolio-webdev` (`webdev.savioomiodev.com.br`). Nunca publicar no Worker `savioomiodev`, que é o site pessoal (`docs/runbooks/deploy-cloudflare.md`).
- **Logins por navegador** (Wrangler etc.): gerar o link sem abrir o navegador e abrir no Chrome.
- **Ao terminar uma tarefa:** siga a definição de pronto em `docs/planejamento.md` e marque `[x]` no backlog no mesmo PR.

As convenções de pastas, nomenclatura e código entram aqui na T09 e na T10.
