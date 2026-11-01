export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectVideo {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  /** Nome curto, usado na navegação do trilho. */
  label: string;
  name: string;
  /** Título do painel, quando for diferente do nome. */
  headline?: string;
  period: string;
  /** Período curto da lista de projetos. */
  when: string;
  summary: string;
  /** Texto de busca e de compartilhamento da página do projeto. */
  description: string;
  color: string;
  ink: string;
  body: string[];
  facts: string[];
  tech: string[];
  links: ProjectLink[];
  cover: ProjectImage;
  video?: ProjectVideo;
  /** Vídeos que aparecem na página do projeto, depois do principal. */
  moreVideos?: ProjectVideo[];
  gallery: ProjectImage[];
}

/** Projetos fora das lojas, do mais antigo ao mais recente. A ordem é a do trilho da Home. */
export const projects: Project[] = [
  {
    slug: "aranha-robo",
    label: "Aranha",
    name: "Aranha robô",
    period: "2022/23, Projeto Integrador I",
    when: "2022/23",
    summary: "Meu primeiro contato com robótica, no ensino médio.",
    description:
      "Aranha robô feita por Sávio Pessôa no ensino médio, com corpo de madeira, servos e Arduino, controlada pelo celular.",
    color: "#E8923A",
    ink: "#21110A",
    body: [
      "No segundo ano do ensino médio tive meu primeiro contato com robótica. A aranha tem corpo de madeira, servos e Arduino, e é controlada pelo celular.",
    ],
    facts: ["Da mesma fase saiu um sistema de detecção de vazamento de gás."],
    tech: ["Arduino", "C++", "Servos"],
    links: [
      {
        label: "Ver o código no GitHub",
        href: "https://github.com/savioomio/codigos-da-aranha-robotica",
      },
    ],
    cover: {
      src: "/media/aranha-poster.webp",
      alt: "Aranha robô de madeira parada no chão",
      width: 640,
      height: 360,
    },
    video: {
      src: "/media/aranha.mp4",
      poster: "/media/aranha-poster.webp",
      label: "A aranha robô andando",
      width: 640,
      height: 360,
    },
    moreVideos: [
      {
        src: "/media/aranha-perto.mp4",
        poster: "/media/aranha-perto.webp",
        label: "A aranha robô vista de perto",
        width: 540,
        height: 960,
      },
    ],
    gallery: [
      {
        src: "/media/aranha-app.webp",
        alt: "Tela do controle da aranha no celular",
        width: 400,
        height: 400,
      },
    ],
  },
  {
    slug: "drones-guanambi",
    label: "Drones",
    name: "De Guanambi a Bristol",
    period: "2023 e 2024, Drones Guanambi",
    when: "2023 e 2024",
    summary: "Campeão nacional de drones e Brasil na competição internacional IMAV.",
    description:
      "Equipe Drones Guanambi: campeã da Competição Nacional de Drones e representante do Brasil na competição internacional IMAV 2024, em Bristol, com modelagem 3D e mecânica de Sávio Pessôa.",
    color: "#2272D2",
    ink: "#FFFFFF",
    body: [
      "Fomos campeões na Competição Nacional de Drones, em Florianópolis. Em 2024 representamos o Brasil na IMAV, competição internacional em Bristol, como única equipe de ensino médio ao lado de pós-graduação, como a USP.",
    ],
    facts: [
      "Cuidei da modelagem 3D e da mecânica do drone.",
      "Fiz o guincho, o mecanismo de coleta da prova.",
      "Apresentei nosso artigo em inglês.",
    ],
    tech: ["Modelagem 3D", "Mecânica", "Drones"],
    links: [],
    cover: {
      src: "/media/voo-bristol.webp",
      alt: "Drone da equipe em voo na IMAV 2024, em Bristol",
      width: 960,
      height: 638,
    },
    video: {
      src: "/media/missao-guincho.mp4",
      poster: "/media/missao-guincho.webp",
      label: "O drone em voo na prova do guincho, com a legenda da equipe aprovando o mecanismo",
      width: 360,
      height: 640,
    },
    gallery: [
      {
        src: "/media/drone-bristol.webp",
        alt: "Drone da equipe na bancada do Bristol Robotics Laboratory",
        width: 640,
        height: 469,
      },
      {
        src: "/media/trofeu.webp",
        alt: "Troféu de primeiro lugar da Competição Nacional de Drones, na minha mão",
        width: 400,
        height: 400,
      },
    ],
  },
  {
    slug: "callidus-link",
    label: "Callidus",
    name: "Callidus Link",
    period: "set/2023 a ago/2024, estágio bolsista no IF Baiano",
    when: "2023/24",
    summary: "Estágio com IoT para monitorar água no campo.",
    description:
      "Callidus Link: automação e monitoramento de consumo hídrico com IoT em perímetros irrigados, no estágio de Sávio Pessôa no IF Baiano.",
    color: "#2FE0CF",
    ink: "#042F2C",
    body: [
      "Automação e monitoramento de consumo hídrico com IoT em perímetros irrigados. Foi meu primeiro ano de experiência.",
    ],
    facts: [
      "352 horas de estágio bolsista.",
      "Medalha de honra ao mérito científico na Tenda da Ciência.",
    ],
    tech: ["IoT", "Automação"],
    links: [],
    cover: {
      src: "/media/callidus.webp",
      alt: "Minha mesa de trabalho no estágio",
      width: 400,
      height: 400,
    },
    gallery: [
      {
        src: "/media/tenda.webp",
        alt: "Sávio apresentando o projeto na Tenda da Ciência",
        width: 400,
        height: 400,
      },
      {
        src: "/media/medalhas-tenda.webp",
        alt: "As 2 medalhas de honra ao mérito científico da Tenda da Ciência, na minha mão",
        width: 456,
        height: 456,
      },
    ],
  },
  {
    slug: "mao-robotica",
    label: "Mão",
    name: "Mão robótica em Libras",
    period: "2024, Mostra Nacional de Robótica",
    when: "2024",
    summary: "16 letras do alfabeto, com Arduino e impressão 3D.",
    description:
      "Mão robótica impressa em 3D que faz 16 letras do alfabeto em Libras, com servos e Arduino, apresentada na Mostra Nacional de Robótica 2024.",
    color: "#B8A6FF",
    ink: "#170B45",
    body: [
      "Impressa em 3D e movida por servos e Arduino. Você mandava a letra pelo teclado e a mão fazia o sinal.",
    ],
    facts: [
      "16 letras do alfabeto em Libras.",
      "Artigo em equipe na Mostra Nacional de Robótica 2024.",
      "Medalha de honra ao mérito científico na Tenda da Ciência.",
      "As outras 10 letras pedem um novo pulso.",
    ],
    tech: ["Arduino", "Impressão 3D", "Servos"],
    links: [],
    cover: {
      src: "/media/mao-poster.webp",
      alt: "Mão robótica impressa em 3D fazendo um sinal",
      width: 640,
      height: 360,
    },
    video: {
      src: "/media/mao.mp4",
      poster: "/media/mao-poster.webp",
      label: "A mão real fazendo os sinais",
      width: 640,
      height: 360,
    },
    gallery: [
      {
        src: "/media/medalhas-tenda.webp",
        alt: "As 2 medalhas de honra ao mérito científico da Tenda da Ciência, na minha mão",
        width: 456,
        height: 456,
      },
    ],
  },
  {
    slug: "jsom",
    label: "JSOM",
    name: "JSOM",
    period: "2024, Projeto de Conclusão de Curso",
    when: "2024",
    summary: "Nosso PCC: gestão de alunos de academia em Django.",
    description:
      "JSOM: sistema de gestão de alunos de academia em Django, com treinos, exercícios e avaliações físicas. Projeto de conclusão de curso.",
    color: "#C92E18",
    ink: "#FFFFFF",
    body: [
      "Sistema de gestão de alunos de academia. O personal acompanha alunos, treinos, exercícios e avaliações. O aluno vê os próprios treinos.",
    ],
    facts: ["Django 5 e Bootstrap 5.", "Tema claro e escuro, e versão para celular."],
    tech: ["Django", "Python", "Bootstrap"],
    links: [{ label: "Ver o repositório", href: "https://github.com/savioomio/PCC" }],
    cover: {
      src: "/media/jsom-alunos.webp",
      alt: "Lista de alunos do JSOM, com dados fictícios",
      width: 1200,
      height: 750,
    },
    gallery: [
      {
        src: "/media/jsom-avaliacao.webp",
        alt: "Avaliação física de um aluno, com dados fictícios",
        width: 1200,
        height: 750,
      },
      {
        src: "/media/jsom-perfil.webp",
        alt: "Perfil de um aluno, com dados fictícios",
        width: 1200,
        height: 750,
      },
      {
        src: "/media/jsom-exercicios.webp",
        alt: "Lista de exercícios do JSOM",
        width: 1200,
        height: 750,
      },
    ],
  },
  {
    slug: "gasmaster",
    label: "GasMaster",
    name: "GasMaster",
    headline: "Usado por 2 postos de gasolina",
    period: "2025 até hoje, GasMaster",
    when: "2025 até hoje",
    summary: "Sistema real, usado por 2 postos de gasolina.",
    description:
      "GasMaster: sistema desktop em Electron e SQLite que 2 postos de gasolina usam para controlar clientes, notas de venda e pagamentos.",
    color: "#046C4E",
    ink: "#FFFFFF",
    body: [
      "Sistema real para postos de gasolina. Controla clientes, notas de venda, pagamentos e quem está devendo.",
    ],
    facts: [
      "Desktop em Electron, com SQLite.",
      "Um computador vira servidor e os outros entram pela rede do posto.",
      "Versão 1.3.2, com atualização automática.",
    ],
    tech: ["Electron", "SQLite", "JavaScript"],
    links: [],
    cover: {
      src: "/media/gm-painel.webp",
      alt: "Painel de controle do GasMaster, com dados fictícios",
      width: 1200,
      height: 750,
    },
    gallery: [
      {
        src: "/media/gm-graficos.webp",
        alt: "Gráficos de gestão do GasMaster, com dados fictícios",
        width: 1200,
        height: 750,
      },
      {
        src: "/media/gm-clientes.webp",
        alt: "Lista de clientes do GasMaster, com dados fictícios",
        width: 1200,
        height: 750,
      },
      {
        src: "/media/gm-notas.webp",
        alt: "Notas de venda do GasMaster, com dados fictícios",
        width: 1200,
        height: 750,
      },
    ],
  },
  {
    slug: "synesthesia",
    label: "Synesthesia",
    name: "Synesthesia",
    period: "2026, JOVI Challenge da FIAP, equipe SAVAC",
    when: "2026",
    summary: "Câmera que transforma a cena em filtro e trilha sonora.",
    description:
      "Synesthesia: app Android do JOVI Challenge da FIAP que lê a cena com IA e entrega foto, filtro e trilha sonora prontos para postar.",
    color: "#1C0507",
    ink: "#FBE9D0",
    body: [
      "A câmera lê a cena e monta o pacote: filtro, trilha sonora e vídeo pronto para postar, com o mínimo de escolhas.",
    ],
    facts: [
      "Expo e React Native, só para Android.",
      "O Gemini lê a foto e sugere 3 looks e até 4 músicas.",
      "8 filtros ao vivo e memória do seu gosto.",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Gemini"],
    links: [
      {
        label: "Ver no GitHub",
        href: "https://github.com/SAVAC-Challenge-FIAP/synesthesia-app",
      },
      {
        label: "Baixar o APK",
        href: "https://github.com/SAVAC-Challenge-FIAP/synesthesia-app/releases/latest",
      },
    ],
    cover: {
      src: "/media/syn-captura.webp",
      alt: "Tela de captura do Synesthesia, com a vibe lida pela IA e os looks sugeridos",
      width: 360,
      height: 800,
    },
    video: {
      src: "/media/synesthesia-app.mp4",
      poster: "/media/synesthesia-app-poster.webp",
      label:
        "Gravação da tela do app: foto, leitura da cena, look aplicado, escolha da trilha e vídeo gerado",
      width: 360,
      height: 800,
    },
    gallery: [
      {
        src: "/media/syn-camera.webp",
        alt: "Tela da câmera do Synesthesia, com o carrossel de filtros",
        width: 360,
        height: 800,
      },
      {
        src: "/media/syn-trilhas.webp",
        alt: "Tela com quatro sugestões de música para a foto",
        width: 360,
        height: 800,
      },
      {
        src: "/media/syn-pronto.webp",
        alt: "Confirmação do vídeo gerado, pronto para postar",
        width: 360,
        height: 800,
      },
      {
        src: "/media/syn-tela-galeria.webp",
        alt: "Galeria com os momentos salvos no app",
        width: 360,
        height: 800,
      },
      {
        src: "/media/syn-tela-ajustes.webp",
        alt: "Tela de ajustes do Synesthesia",
        width: 360,
        height: 800,
      },
    ],
  },
  {
    slug: "platao",
    label: "Platão",
    name: "Platão",
    period: "2026, app desktop",
    when: "2026",
    summary: "Meu app de ajuda em call para quem atende VTEX e Wake.",
    description:
      "Platão: assistente de reunião que escuta a call, percebe quando você não lembra a resposta e mostra a resposta certa da documentação oficial de VTEX e Wake.",
    color: "#142032",
    ink: "#FFFFFF",
    body: [
      "Meu app de ajuda em call, para quem atende clientes VTEX e Wake. Ele escuta a reunião, percebe quando você não lembra a resposta e em segundos mostra a resposta certa, tirada da documentação oficial, com os links.",
    ],
    facts: [
      "Tauri 2, Rust, React e SQLite.",
      "No Mac, com Windows e Linux em beta.",
      "A cor e a documentação mudam com o modo VTEX ou Wake.",
    ],
    tech: ["Tauri", "Rust", "React", "SQLite"],
    links: [{ label: "Conhecer o Platão", href: "https://platao.savioomiodev.com.br" }],
    cover: {
      src: "/media/platao-inicio-vtex.webp",
      alt: "Tela inicial do Platão no modo VTEX",
      width: 1200,
      height: 786,
    },
    gallery: [
      {
        src: "/media/platao-inicio-wake.webp",
        alt: "Tela inicial do Platão no modo Wake",
        width: 1200,
        height: 786,
      },
      {
        src: "/media/platao-historico.webp",
        alt: "Histórico de reuniões do Platão, com dados de exemplo",
        width: 1200,
        height: 786,
      },
    ],
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
