# Roteiro do vídeo

Até 8 minutos, com rosto e tela visíveis o tempo todo, publicado como **não listado** no YouTube. O texto tem cerca de 1.000 palavras, o que dá 7 min 30 s em ritmo de conversa. Use como guia e fale com as suas palavras.

## Antes de gravar

- Deixe abertos: o site publicado, o repositório no GitHub, `docs/diagramas.md`, o PR #15 e o terminal na pasta do projeto.
- Grave fora da rede do lab, por causa do limite da API do GitHub.
- Faça login no dashboard antes, em outra aba.
- Abra o Lighthouse já com o resultado, para não esperar em vídeo.
- Revise uma mensagem de teste no dashboard para mostrar "marcar como respondida".

## Abertura (0:00 a 0:25)

**Tela:** site aberto no topo.

> Oi, eu sou o Sávio, desenvolvedor front-end especialista em e-commerce. Trabalho com VTEX e Wake e estudo Engenharia de Software na FIAP. Este é o meu portfólio. Vou mostrar a stack, por que escolhi cada peça, e o harness de IA que montei para desenvolver.

**Tela:** role devagar até a caixa dobrar.

> Sou da área de loja, então a identidade nasceu de uma faca de embalagem: a folha com linhas de corte e vinco dobra em caixa, sacola e envelope conforme a rolagem.

## Parte 1: stack e arquitetura (0:25 a 3:00)

**Tela:** `docs/diagramas.md`, diagrama de pastas.

> É um site em React 19 com TypeScript e Vite. O estilo é Tailwind, o 3D é Three.js, as rotas são React Router, os dados passam pelo TanStack Query, o backend é Supabase, e o site está na Cloudflare.
>
> O critério para dividir os componentes é a responsabilidade. Em `ui` ficam peças que só apresentam, como botão, cartão e skeleton. `sections` e `pages` montam a tela. A lógica fica nos hooks, e só os `services` falam com APIs. A regra é: componente visual não chama API.

**Tela:** diagrama de fluxo de dados. Depois abra `src/hooks/useRepos.ts` e `src/services/github.ts`.

> Veja os projetos: a API do GitHub entra pelo service, o hook `useRepos` guarda em cache, e o cartão só recebe os dados. Vou provar: abro a aba Network, rolo até o GitHub, entro num projeto e volto. Foi uma requisição só.

**Tela:** Network mostrando uma chamada. Depois uma rota inexistente e o F5 em `/projetos/platao`.

> O formulário valida por campo, salva no banco e manda e-mail. O dashboard fica atrás de login.

**Tela:** erros do formulário, botão com spinner, `/dashboard` indo para `/login`. Faça login, marque uma mensagem como respondida e escolha um destaque.

**Tela:** diagrama da branch até o deploy e a aba Actions.

> Uma alteração nasce numa branch própria. No commit, o Husky roda lint, formatação e o padrão da mensagem. No PR, o CI repete tudo e roda os testes. Com o verde, o merge na `main` dispara o deploy na Cloudflare. A `main` é protegida: nem eu consigo dar push direto.

## Parte 2: justificativas da stack (3:00 a 5:40)

**Tela:** pasta `docs/adr` e um arquivo aberto a cada decisão.

> Toda escolha passou por uma comparação em `docs/research` e virou um ADR, com o que aceitei perder. Vou citar as principais.

- **Three.js direto** (ADR 0008)
  > Comparei com React Three Fiber, que já vinha no projeto. O critério foi controlar a rolagem sem renderizar o React a cada quadro. Perdi a escrita declarativa das cenas.
- **React Router e TanStack Query** (ADR 0009)
  > Comparei com TanStack Router, wouter, SWR e fetch manual. O critério foi cache entre páginas, porque a API do GitHub só dá 60 requisições por hora por IP. Aceitei cerca de 12 kB a mais no pacote.
- **Supabase e Formspree** (ADR 0010)
  > Comparei com Firebase, Appwrite e PocketBase. O critério foi login pronto e regra de acesso no banco, sem servidor próprio. O visitante só insere, e só eu leio. O que aceitei perder: uma função com captcha seria mais forte contra spam, mas pedia muito mais passos. Fiquei com o RLS, limite de tamanho e um campo-armadilha.
- **React Hook Form e Zod** (ADR 0011)
  > Comparei com Formik e validação manual. Foi a opção mais pesada, e aceitei isso em troca de tipos e de menos renderização. Para compensar, o formulário só carrega quando a seção chega perto.
- **Tema com script no head** (ADR 0012)
  > O `next-themes` já estava instalado, mas não evitava o flash em toda página. Um script antes da primeira pintura resolve, com cerca de 40 linhas minhas.
- **Pré-renderização** (ADR 0014)
  > Como SPA, toda rota devolvia o mesmo HTML. Agora cada rota sai pronta no build, e endereço inexistente responde 404 de verdade. Aceitei um build mais longo e o cuidado de não usar `window` durante o render.
- **Vercel** (ADR 0004)
  > O enunciado pedia Vercel. Comparei manter as duas hospedagens com ficar só na Cloudflare, e escolhi a Cloudflare, que já tinha domínio próprio. O requisito é deploy automático, e isso está cumprido. Foi uma decisão consciente, registrada no repositório.

**Tela:** Lighthouse mobile.

> Na performance, a Home marca 93 no celular, no site publicado. O maior ganho foi adiar o 3D até o primeiro gesto da pessoa: no meu teste local, a nota foi de 50 para 95.

## Parte 3: harness de IA (5:40 a 7:40)

**Tela:** `CLAUDE.md`.

> A ferramenta é o Claude Code, com o modelo Claude Opus. Comparei com Cursor e Copilot, e o critério principal foi garantir regra por código, não só por texto, com tudo versionado no repositório. O que aceitei perder: é uma ferramenta paga.
>
> O `CLAUDE.md` traz o fluxo, a arquitetura e a nomenclatura. A IA lê no início de cada sessão, então não preciso repetir.

**Tela:** `.claude/settings.json` e `.claude/hooks/guard-bash.mjs`.

> Texto a IA pode esquecer, então as regras críticas viraram hooks. Este aqui bloqueia pular os hooks do Git, mudar a configuração global e publicar no Worker do meu site pessoal. Criar token e segredo continua sendo comigo.

**Tela:** `.claude/skills/tarefa/SKILL.md`, depois `decisao`.

> As skills são receitas. A `tarefa` faz o ciclo inteiro, do backlog ao deploy conferido. A `decisao` obriga a passar por research e ADR antes de adicionar uma tecnologia. A `impeccable` guiou o design.

**Tela:** `.claude/agents/` e `.mcp.json`.

> Os agents são especialistas: o `pesquisador` compara opções com documentação oficial, e o `revisor` lê o diff contra as regras do projeto. O MCP traz a documentação da Cloudflare para dentro da conversa.

**Tela:** PR #15 no GitHub, depois a lista de PRs.

> Na prática, foi assim: pedi a identidade, a IA criou a branch, fez os commits no padrão, abriu o PR e só integrou com o CI verde. E as camadas se protegem: num commit, um caminho errado fez os hooks locais serem ignorados, e foi o CI que garantiu a checagem. Por isso os mesmos testes rodam nos dois lugares.
>
> A IA escreveu a maior parte do código, mas as decisões são minhas, e sei explicar cada uma: estão escritas nos ADRs.

## Fecho (7:40 a 8:00)

**Tela:** o trilho horizontal passando pelos projetos.

> Esse é o portfólio: um site de loja feito por quem faz loja, com a minha história de robótica, drones e sistemas reais no final. Obrigado!
