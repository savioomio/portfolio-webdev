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
- Backend em Supabase e e-mail pelo Formspree ([ADR 0010](docs/adr/0010-backend-supabase-e-formspree.md)).

## Brand Commitments

- Nome público: Sávio Pessôa. Título usado no site: "Especialista E-commerce VTEX e Wake". VTEX é o forte, com lojas do começo ao fim; em Wake ele foi dev de apoio, não responsável.
- O Sávio prefere visual claro, com branco presente.
- Tipografia: Nunito nos títulos e Lato no texto. Na parte de e-commerce, fundo claro, blur e dourado de destaque; cada plataforma usa o logo e a cor oficial.
- E-commerce é o foco do site. O site fala só de VTEX (FastStore e Store Framework), de Wake e de 2 projetos reais em WordPress, e não cita as marcas das lojas.
- Robótica, drones e os outros projetos aparecem no fim, como a origem: alguém apaixonado por tecnologia e doido para ganhar. Primeiro uma lista; depois um trilho horizontal, com uma seção por projeto, cada uma com fundo e letras na cor do projeto.
- A foto dele sai do hero: o objeto 3D assume o primeiro impacto, e a foto aparece numa seção seguinte.
- O site precisa ter objetos 3D que mudam com a rolagem.

## Evidence on Hand

Dados publicados no LinkedIn (`linkedin.com/in/savioomio`, lidos em 30/10/2026) e no site atual.

- **Experiência:** Desenvolvedor Front-End Pleno na Wicomm, remoto, desde out/2024: referência técnica em VTEX FastStore e dev lead em projetos FastStore, reportando ao tech lead. Estágio bolsista no IF Baiano, set/2023 a ago/2024, no projeto Callidus Link (automação e monitoramento de consumo hídrico com IoT em perímetros irrigados, 352 h).
- **Lojas:** 33 lojas no site: FastStore (11), Store Framework (11) e Wake (11), mais 2 projetos em WordPress. Deco não é citado: foi um projeto de uma vez. A loja com Eitri + VTEX fica fora das contas do site. Os nomes das marcas não entram no site nem no repositório.
- **Formação:** Bacharelado em Computer Software Engineering na FIAP, fev/2026 a dez/2029. Técnico em Informática para Internet no IF Baiano, ago/2021 a out/2024.
- **Destaques:** 2º lugar no primeiro Wackathon da Wicomm, em dupla com Rafael Gomes de Oliveira, construindo uma loja completa só com prompts. Equipe campeã na Competição Nacional de Drones (Florianópolis, 2023). IMAV 2024 em Bristol, Inglaterra, de 16 a 20/09/2024, representando o Brasil como única equipe de ensino médio ao lado de pós-graduação, como a USP: modelagem 3D e mecânica do drone da equipe Drones Guanambi e apresentação em inglês do artigo "Comparative Analysis of Cameras for ArUco Marker Recognition in Unmanned Aerial Vehicles".
- **Certificados:** Python Development e Design Thinking (FIAP, 2026), Competição de Drones (IFSC, 2023), IV Vila da Ciência, VIMAD e Tenda da Ciência com Premiação 2 (Even3, 2023).
- **Competências:** Vtex, Vtex Store Framework, Vtex FastStore, Vtex IO, Wake, Scriban, WordPress, React.js, TypeScript, JavaScript, Tailwind CSS, SASS, Bootstrap, PHP, Django, Claude Code, Python, Web Scraping, Automação de processos, Arduino, Robótica, Drones, C, C++.
- **Projetos no site:** Gas Master (sistema desktop para postos, repositório `sistema-notas-posto`), E-commerce Platform, Task Management App, 3D Portfolio Website. Capas em `public/projects/`.
- **Números:** 2 anos de experiência no mercado, mais 1 de estágio; 22 participações em lojas VTEX, 11 em Wake e 2 projetos em WordPress para blogs de e-commerce. Os "+22 projetos" e "+15 com participação ativa" do site atual estão defasados em relação à lista de lojas.
- **Mídia:** vídeo da aranha robô em `public/videos/`. Fora do repositório: outro vídeo da aranha (`~/Videos/A melhor aranha.mp4`), mão robótica em Libras (`~/Videos/sinais ‐ Feito com o Clipchamp.mp4`), fotos da IMAV e guincho do drone em 3D (`~/Drone Guanambi`) e fotos da competição do IFSC (`~/Portfólio`).
- **Origem:** aranha robô e sistema de detecção de vazamento de gás no segundo ano do ensino médio (Projeto Integrador I), mão robótica em Libras em 2024 (`~/Escola IF📖✍️/Mão Robotica`).
- **Mão robótica:** artigo na Mostra Nacional de Robótica 2024, em equipe de três alunos e um orientador. Reproduziu 16 letras do alfabeto em Libras; F, H, J, K, M, N, P, Q, R e Z falharam e dependem de um novo pulso.
- **JSOM:** Projeto de Conclusão de Curso em grupo, sistema de gestão de alunos de academia em Django (`~/PCC(JSOM)`).
- **GasMaster:** usado por 2 postos de gasolina. Electron e SQLite, com um computador servindo os outros na rede local.
- **Platão:** app de ajuda em call para quem atende clientes VTEX e Wake. Escuta a reunião, percebe quando a pessoa não lembra a resposta e mostra a resposta certa da documentação oficial, com os links. Tauri 2, Rust, React e SQLite. Página em `platao.savioomiodev.com.br`.
- **Synesthesia:** app Android da equipe SAVAC no JOVI Challenge da FIAP 2026. Lê a cena com IA e entrega foto, filtro e trilha sonora prontos para postar. Repositório público em `SAVAC-Challenge-FIAP/synesthesia-app`. O site mostra a gravação do app em uso, cortada antes da tela de compartilhamento, que tem contatos reais.
- **Tenda da Ciência:** o Sávio apresentou o Callidus Link e a mão robótica na mesma feira e ganhou 2 medalhas de honra ao mérito científico.
- **Guincho do drone:** modelo 3D feito pelo Sávio, o mecanismo de coleta da prova. O vídeo da prova traz a legenda da equipe aprovando o mecanismo.
- **Fontes:** LinkedIn, currículo em `docs/research/Curriculo_Savio_Pessoa_Afonso.pdf`, perfil no portal de carreiras da FIAP e lista enviada pelo Sávio.
- **Não existem e não podem ser inventados:** depoimentos, preços, métricas de resultado de lojas e idiomas (o LinkedIn não lista nenhum). Os números "+40%", "-60%" e "95+" do site atual são lorem ipsum.
- **Não usar:** telas do Gas Master com nomes e valores de clientes, documentos internos da Wicomm, fotos com o rosto de colegas no site público sem a autorização deles e a malha 3D original da mão: a base é da BBProjects (Brian Brocken), sob CC BY-NC-ND 4.0, que não permite distribuir versão modificada. A mão 3D do site é modelada em código, em `src/components/three/hand.ts`.

## Product Principles

1. Prova antes de discurso: cada afirmação aponta para algo real que dá para abrir, ler ou conferir.
2. O site demonstra o que promete: quem vende performance precisa ser rápido.
3. Em segundos fica claro quem é, o que faz e como falar com ele.
4. Serve aos dois momentos: atende ao enunciado da FIAP sem parecer trabalho escolar.

## Accessibility & Inclusion

Layout responsivo testado em 390 px e 1440 px. O 3D nunca é a única forma de chegar a um conteúdo, e o movimento respeita `prefers-reduced-motion`.
