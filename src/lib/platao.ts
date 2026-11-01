export type PlataoMode = "vtex" | "wake";

export interface PlataoSource {
  title: string;
  host: string;
  url: string;
}

/** Respostas de verdade, dadas pelo Platão nos testes de ponta a ponta do app. */
export interface PlataoExample {
  label: string;
  question: string;
  /** Fala de quem usa o app, com a frase que acorda o Platão dentro dela. */
  said: string;
  trigger: string;
  answer: string;
  /** Tempo real da busca. */
  ms: number;
  sources: PlataoSource[];
  /** Fontes que a resposta trazia além das que cabem no card. */
  extraSources: number;
  platform: string;
  /** Há "conta da loja" só no modo VTEX. */
  store: boolean;
}

export const plataoExamples: Record<PlataoMode, PlataoExample> = {
  vtex: {
    label: "VTEX",
    question: "Dá para ter um preço diferente para cada canal de venda?",
    said: "Hmm, não me lembro bem.",
    trigger: "não me lembro bem",
    answer:
      "Sim, é possível: dá para ter preços diferentes por política comercial (canal de venda) e também por tabelas de preços associadas a clientes específicos.",
    ms: 1602,
    sources: [
      {
        title: "Configurar tabelas de preços para usuários específicos",
        host: "help.vtex.com",
        url: "https://help.vtex.com/pt/docs/tutorials/configurar-price-tables-especificas",
      },
      {
        title: "Preço Fixo - Definição de conceito",
        host: "help.vtex.com",
        url: "https://help.vtex.com/pt/docs/tracks/preco-fixo-definicao-de-conceito",
      },
    ],
    extraSources: 0,
    platform: "da VTEX",
    store: true,
  },
  wake: {
    label: "Wake",
    question: "Dá para vender por assinatura com cobrança recorrente?",
    said: "Deixa eu confirmar isso.",
    trigger: "deixa eu confirmar",
    answer:
      "Sim, dá para vender por assinatura com cobrança recorrente, configurando Grupos de Assinatura em Assinaturas > Grupo de Assinaturas.",
    ms: 2002,
    sources: [
      {
        title: "Como criar Grupos de Assinatura",
        host: "atendimento.wake.tech",
        url: "https://atendimento.wake.tech/hc/pt-br/articles/21406538647959",
      },
      {
        title: "Como criar regras de assinatura anual",
        host: "atendimento.wake.tech",
        url: "https://atendimento.wake.tech/hc/pt-br/articles/29360210989975",
      },
    ],
    extraSources: 2,
    platform: "da Wake",
    store: false,
  },
};

export type PlataoStage = "listening" | "searching" | "answer";

export interface PlataoScene {
  stage: PlataoStage;
  clientSpoke: boolean;
  youSpoke: boolean;
  triggered: boolean;
  /** Passo da busca em andamento, de 0 a 3. */
  step: number;
  /** Tempo da busca em décimos de segundo. */
  seconds: number;
  leaving: boolean;
}

/** Momentos da cena, em ms: as esperas são mais curtas que na conversa de verdade. */
export const PLATAO_TIMING = {
  client: 1100,
  you: 2200,
  trigger: 2700,
  search: 3200,
  reading: 7500,
  leave: 360,
} as const;

export const plataoCycle = (searchMs: number) =>
  PLATAO_TIMING.search + searchMs + PLATAO_TIMING.reading + PLATAO_TIMING.leave;

/** A cena em um instante: a mesma entrada sempre dá o mesmo quadro, e o tempo recomeça sozinho. */
export function plataoSceneAt(elapsedMs: number, searchMs: number): PlataoScene {
  const t = ((elapsedMs % plataoCycle(searchMs)) + plataoCycle(searchMs)) % plataoCycle(searchMs);
  const { client, you, trigger, search, reading } = PLATAO_TIMING;

  if (t < search) {
    return {
      stage: "listening",
      clientSpoke: t >= client,
      youSpoke: t >= you,
      triggered: t >= trigger,
      step: 0,
      seconds: 0,
      leaving: false,
    };
  }

  const spoken = { clientSpoke: true, youSpoke: true, triggered: true };
  const into = t - search;
  if (into < searchMs) {
    return {
      ...spoken,
      stage: "searching",
      step: Math.min(3, Math.floor((into / searchMs) * 4)),
      seconds: Math.floor(into / 100) / 10,
      leaving: false,
    };
  }

  return {
    ...spoken,
    stage: "answer",
    step: 3,
    seconds: Math.floor(searchMs / 100) / 10,
    leaving: into >= searchMs + reading,
  };
}

/** Quadro final, para quem pede menos movimento. */
export const plataoFinalScene = (searchMs: number): PlataoScene =>
  plataoSceneAt(PLATAO_TIMING.search + searchMs + 1, searchMs);

/** Inclinação da janelinha, em graus: de lado na conversa, quase de frente para ler a resposta. */
export const PLATAO_POSE: Record<"talking" | "answer", { y: number; x: number }> = {
  talking: { y: -10, x: 3.5 },
  answer: { y: -4, x: 1.5 },
};
