# Portfólio WebDev · Sávio Pessôa Afonso

Portfólio em React com uma cena 3D interativa, projetos carregados direto da API do GitHub, formulário de contato e um dashboard para o dono do site. Trabalho acadêmico com entrega em 03/11/2026.

> **Em desenvolvimento.** O que está feito e o que falta fica em [`docs/tasks/backlog.md`](./docs/tasks/backlog.md).

| | |
| --- | --- |
| Site | https://webdev.savioomiodev.com.br |
| Vercel | em breve |
| Vídeo de apresentação | em breve |

## Tecnologias

| Área | Tecnologia |
| --- | --- |
| Base | React 19, TypeScript 5.8, Vite 5 |
| Estilo | Tailwind CSS 3, Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| Rotas | React Router 7 |
| Qualidade | ESLint 9 (typescript-eslint, react-hooks), Prettier, Husky, lint-staged, commitlint |
| Hospedagem | Cloudflare Workers (Static Assets) |
| CI | GitHub Actions: padrão dos commits, lint, formatação e build a cada push e PR |

As próximas escolhas (busca de dados, backend, formulário, testes) passam por uma comparação de alternativas e ficam registradas como ADR em [`docs/adr/`](./docs/adr/).

## Como rodar

Pré-requisitos: Node.js 22 e npm.

```bash
git clone https://github.com/savioomio/portfolio-webdev.git
cd portfolio-webdev
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Checa os tipos e gera o build de produção em `dist/` |
| `npm run preview` | Serve o `dist/` localmente |
| `npm run lint` | Roda o ESLint |
| `npm run lint:fix` | Roda o ESLint corrigindo o que for automático |
| `npm run format` | Formata todos os arquivos com o Prettier |
| `npm run format:check` | Só confere a formatação (é o que o CI roda) |
| `npm run deploy` | Build e publicação na Cloudflare ([runbook](./docs/runbooks/deploy-cloudflare.md)) |

O `.npmrc` usa `legacy-peer-deps=true`, necessário para o npm resolver as dependências com o React 19.

### Variáveis de ambiente

Ainda não há nenhuma. Quando o backend entrar, as variáveis ficam listadas em `.env.example`; copie para `.env`, que é ignorado pelo Git.

## Estrutura

```
src/
├── components/     # seções da página (Hero, Experience, Projects, Contact...)
│   ├── ui/         # componentes visuais reaproveitados
│   └── assets/     # logo e ícones SVG
├── hooks/          # hooks personalizados (useIsMobile)
├── lib/            # funções utilitárias puras
├── pages/          # uma página por rota (Home, Links)
├── App.tsx         # rotas
└── main.tsx
public/             # arquivos servidos como estão: imagens, fontes, vídeos, _headers
docs/               # requisitos, planejamento, ADRs, research, runbooks e backlog
```

A estrutura alvo, com `services/` e a separação entre lógica e apresentação, está em [`docs/planejamento.md`](./docs/planejamento.md#arquitetura-alvo).

## Padrões do projeto

**Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) em português.

```
feat: adiciona validação do formulário de contato
fix: corrige o e-mail do rodapé
docs: registra a decisão de hospedagem
```

Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`.

**Checagem automática** ([ADR 0003](./docs/adr/0003-qualidade-de-codigo.md)): o `npm install` instala os hooks do Git pelo Husky.

| Momento | O que roda |
| --- | --- |
| `pre-commit` | lint-staged: ESLint (`--fix`) e Prettier só nos arquivos do commit |
| `commit-msg` | commitlint: recusa mensagens fora do Conventional Commits |
| CI (push e PR) | commitlint nos commits do PR, `npm run lint`, `npm run format:check` e `npm run build` |

**Branches:** GitHub Flow. A `main` está sempre publicável; cada tarefa ganha uma branch própria, integrada por pull request depois do CI passar.

| Prefixo | Uso |
| --- | --- |
| `feature/` | funcionalidade nova |
| `fix/` | correção |
| `docs/` | documentação |
| `chore/` | configuração e ferramentas |
| `refactor/` | mudança de estrutura sem mudar comportamento |
| `test/` | testes |
| `perf/` | performance |

**Nomenclatura:** componentes em PascalCase (`ProjectCard.tsx`), hooks começando com `use` (`useRepos.ts`), import absoluto a partir de `src` com `@/`.

## Documentação

| | |
| --- | --- |
| [`docs/requisitos.md`](./docs/requisitos.md) | Enunciado do trabalho e diagnóstico do ponto de partida |
| [`docs/planejamento.md`](./docs/planejamento.md) | Cronograma, stack, arquitetura e fluxo até o deploy |
| [`docs/tasks/backlog.md`](./docs/tasks/backlog.md) | Tarefas e status |
| [`docs/adr/`](./docs/adr/) | Decisões de arquitetura |
| [`docs/runbooks/`](./docs/runbooks/) | Deploy e setup da máquina |

## Desenvolvimento com IA

O projeto é desenvolvido com o Claude Code. As instruções que a IA segue (padrões de commits, branches e o fluxo de trabalho pelo backlog) ficam versionadas em [`CLAUDE.md`](./CLAUDE.md).

## Origem

O projeto partiu do meu portfólio pessoal ([savioomio/meu-portfolio-3d](https://github.com/savioomio/meu-portfolio-3d)), copiado com histórico novo. O motivo está no [ADR 0001](./docs/adr/0001-reaproveitar-portfolio-existente.md).

## Licença

© 2026 Sávio Pessôa Afonso. Todos os direitos reservados.
