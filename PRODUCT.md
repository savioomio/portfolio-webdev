# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Agora:** o professor da FIAP, que avalia o site publicado, o repositório e o vídeo de entrevista técnica na entrega de 03/11/2026.
- **Depois da entrega:** o site vira o portfólio principal do Sávio, visto por recrutadores e empresas de e-commerce que precisam entender em segundos o que ele entrega.

## Product Purpose

Portfólio do Sávio Pessôa Afonso, desenvolvedor front-end. Serve de prova de trabalho: mostra projetos reais, puxa os repositórios do GitHub, recebe contato e dá ao dono um painel para responder mensagens e escolher os destaques. O sucesso é o site ser aprovado no trabalho e, depois, gerar conversas com quem contrata.

## Positioning

Especialista em front-end para e-commerce, com loja de verdade em produção: VTEX (Store Framework e FastStore) e Wake na Wicomm, onde é uma das referências técnicas em FastStore. Une isso a uma base pouco comum para a área: formação técnica com robótica, automação e IoT, e a modelagem 3D e mecânica de um drone levado a uma competição internacional.

## Operating Context

- O avaliador abre três links: GitHub, site publicado na Cloudflare e vídeo não listado no YouTube.
- O vídeo mostra rosto e tela e explica stack, justificativas e harness de IA.
- O Sávio conduz o desenvolvimento com IA e precisa saber explicar tudo o que está no código.

## Capabilities and Constraints

- Requisitos em `docs/requisitos.md`: rotas com 404, dados do GitHub com estados de carregamento, formulário validado, dashboard com login, tema claro/escuro persistido, testes.
- Lighthouse mobile ≥ 80, com a cena 3D e o dashboard fora do pacote inicial. A nota medida em 30/10/2026 no site atual foi 68.
- SPA estática em Cloudflare Workers; backend em serviço gerenciado.
- Em aberto: identidade visual (R07), backend e serviço de e-mail (R02).

## Brand Commitments

- Nome público: Sávio Pessôa. Título usado no site: "Especialista E-commerce VTEX & Wake".
- O Sávio prefere visual claro, com branco presente.
- E-commerce é o foco do site. Robótica, drones e a mão robótica aparecem no fim, como a origem: alguém apaixonado por tecnologia e doido para ganhar. Cada época da vida tem uma página própria, com os detalhes.
- A foto dele sai do hero: o objeto 3D assume o primeiro impacto, e a foto aparece numa seção seguinte.
- O site precisa ter objetos 3D que mudam com a rolagem.

## Evidence on Hand

Dados publicados no LinkedIn (`linkedin.com/in/savioomio`, lidos em 30/10/2026) e no site atual.

- **Experiência:** Desenvolvedor Front-End Pleno na Wicomm, remoto, desde out/2024: referência técnica em VTEX FastStore e dev lead em projetos FastStore, reportando ao tech lead. Estágio bolsista no IF Baiano, set/2023 a ago/2024, no projeto Callidus Link (automação e monitoramento de consumo hídrico com IoT em perímetros irrigados, 352 h).
- **Lojas:** 36 lojas em FastStore (11), Store Framework (11), Wake (10), Wake + Deco (1), Eitri + VTEX (1) e WordPress (2), pela lista do Sávio de 30/10/2026. Os nomes das marcas só entram no repositório depois que ele confirmar que podem ser públicos.
- **Formação:** Bacharelado em Computer Software Engineering na FIAP, fev/2026 a dez/2029. Técnico em Informática para Internet no IF Baiano, ago/2021 a out/2024.
- **Destaques:** 2º lugar no primeiro Wackathon da Wicomm, em dupla com Rafael Gomes de Oliveira, construindo uma loja completa só com prompts. Equipe campeã na Competição Nacional de Drones (Florianópolis, 2023). IMAV 2024 em Bristol, Inglaterra, de 16 a 20/09/2024, representando o Brasil como única equipe de ensino médio ao lado de pós-graduação, como a USP: modelagem 3D e mecânica do drone da equipe Drones Guanambi e apresentação em inglês do artigo "Comparative Analysis of Cameras for ArUco Marker Recognition in Unmanned Aerial Vehicles".
- **Certificados:** Python Development e Design Thinking (FIAP, 2026), Competição de Drones (IFSC, 2023), IV Vila da Ciência, VIMAD e Tenda da Ciência com Premiação 2 (Even3, 2023).
- **Competências:** Vtex, Vtex Store Framework, Vtex FastStore, Vtex IO, Wake, Scriban, Deco, WordPress, React.js, TypeScript, JavaScript, Tailwind CSS, SASS, Bootstrap, PHP, Django, Claude Code, Python, Web Scraping, Automação de processos, Arduino, Robótica, Drones, C, C++.
- **Projetos no site:** Gas Master (sistema desktop para postos, repositório `sistema-notas-posto`), E-commerce Platform, Task Management App, 3D Portfolio Website. Capas em `public/projects/`.
- **Números:** +2 anos de experiência e 36 lojas. Os "+22 projetos" e "+15 com participação ativa" do site atual estão defasados em relação à lista de lojas.
- **Mídia:** vídeo da aranha robô em `public/videos/`. Fora do repositório: mão robótica em Libras (`~/Videos/sinais ‐ Feito com o Clipchamp.mp4`), fotos da IMAV (`~/Drone Guanambi`) e da competição do IFSC (`~/Portfólio`).
- **Origem:** aranha robô e sistema de detecção de vazamento de gás no segundo ano do ensino médio (Projeto Integrador I), mão robótica em Libras em 2024 (`~/Escola IF📖✍️/Mão Robotica`).
- **Fontes:** LinkedIn, currículo em `docs/research/Curriculo_Savio_Pessoa_Afonso.pdf`, perfil no portal de carreiras da FIAP e lista enviada pelo Sávio.
- **Não existem e não podem ser inventados:** depoimentos, preços, métricas de resultado de lojas e idiomas (o LinkedIn não lista nenhum). Os números "+40%", "-60%" e "95+" do site atual são lorem ipsum.
- **Não usar:** telas do Gas Master com nomes e valores de clientes, documentos internos da Wicomm e fotos de colegas no site público sem a autorização deles.

## Product Principles

1. Prova antes de discurso: cada afirmação aponta para algo real que dá para abrir, ler ou conferir.
2. O site demonstra o que promete: quem vende performance precisa ser rápido.
3. Em segundos fica claro quem é, o que faz e como falar com ele.
4. Serve aos dois momentos: atende ao enunciado da FIAP sem parecer trabalho escolar.

## Accessibility & Inclusion

Layout responsivo testado em 390 px e 1440 px. O 3D nunca é a única forma de chegar a um conteúdo, e o movimento respeita `prefers-reduced-motion`.
