# 0003. ESLint + Prettier, com Husky, lint-staged e commitlint

- **Status:** Aceito
- **Data:** 2026-10-20

## Contexto

O enunciado pede padrão de código verificado automaticamente, com lint e formatação aplicados antes de cada commit (requisito 12), e commits seguindo um padrão de mensagem definido (requisito 11). O projeto herdou o ESLint 9 configurado (typescript-eslint, react-hooks, react-refresh), mas sem formatador: o código misturava aspas simples e duplas, e arquivos com e sem ponto e vírgula. Os commits já seguiam Conventional Commits, só que por disciplina, sem nada que impedisse uma mensagem fora do padrão.

## Opções consideradas

- **ESLint + Prettier:** cada ferramenta faz uma coisa (o ESLint acha erros, o Prettier formata) e o `eslint-config-prettier` evita que as duas briguem. Aproveita a config do ESLint que já existe. Por outro lado, são duas ferramentas e duas configs.
- **Biome:** um binário só para lint e formatação, bem mais rápido. Por outro lado, exigiria refazer as regras do ESLint atual e conferir se cada uma tem equivalente, e num projeto deste tamanho a velocidade não faz diferença perceptível.
- **Hooks com Husky + lint-staged:** o Husky instala os hooks do Git pelo `npm install` (script `prepare`) e o lint-staged roda as ferramentas só nos arquivos do commit. É o par mais documentado.
- **Hooks com lefthook ou simple-git-hooks:** mais leves, mas com menos material de referência, e a diferença não pesa aqui.
- **Mensagens com commitlint (Conventional Commits) ou Gitmoji:** o Conventional Commits já era o padrão do repositório e é o exemplo do próprio enunciado. O commitlint transforma a convenção em regra.

## Critério

1. Aproveitar o que já está configurado e funcionando (o ESLint).
2. Aplicar os padrões sozinho, sem depender de lembrar, para mim e para a IA.
3. Ser fácil de explicar e de achar referência.

## Decisão

ESLint para erros, Prettier para formatação, Husky + lint-staged no `pre-commit` e commitlint no `commit-msg`, aceitando os tipos `feat`, `fix`, `docs`, `chore`, `refactor`, `test` e `perf`. O CI repete commitlint, lint e checagem de formatação, porque os hooks locais podem ser pulados com `--no-verify`.

## O que aceitamos perder

- Duas ferramentas onde o Biome seria uma, e um `pre-commit` um pouco mais lento.
- Um commit grande só de formatação no histórico (`chore: formata o código com o Prettier`).
- O Markdown fica fora do Prettier: a documentação é escrita à mão e ele realinharia as tabelas.

## Consequências

- `.gitattributes` força LF em todos os arquivos de texto. Nos PCs do lab o `core.autocrlf` está ligado e, sem isso, o Prettier acusaria todo arquivo por causa do CRLF.
- Commits da IA também passam pelos hooks: se a mensagem sair do padrão, o commit é recusado e ela precisa corrigir.
- Configs: `.prettierrc.json`, `.prettierignore`, `eslint.config.js`, `commitlint.config.js`, `.husky/` e a chave `lint-staged` do `package.json`.
