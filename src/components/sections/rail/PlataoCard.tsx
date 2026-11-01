import { useLayoutEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  EyeOff,
  FileText,
  MessageSquareText,
  Mic,
  Pause,
  PhoneOff,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Store,
  Timer,
  X,
} from "lucide-react";
import { useRailFrame } from "@/hooks/useRailFrame";
import {
  PLATAO_POSE,
  plataoExamples,
  plataoFinalScene,
  plataoSceneAt,
  type PlataoExample,
  type PlataoMode,
  type PlataoScene,
} from "@/lib/platao";
import { cn, prefersReducedMotion } from "@/lib/utils";

const STATE_NAME = { listening: "ouvindo", searching: "buscando", answer: "resposta" } as const;

const seconds = (ms: number) => (ms / 1000).toFixed(1).replace(".", ",");

/** O balão do Platão: os degradês acompanham a cor do modo. */
function PlataoLogo() {
  return (
    <svg viewBox="128 248 768 768" className="pj__logo" aria-hidden="true">
      <defs>
        <linearGradient id="pj-marca" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="pj-marca-1" />
          <stop offset="1" className="pj-marca-2" />
        </linearGradient>
        <linearGradient id="pj-reflexo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="pj-bolha">
          <path d="M416 248H608C768 248 896 376 896 536V600C896 760 768 888 608 888H448L288 1016V872C192 824 128 728 128 600V536C128 376 256 248 416 248Z" />
        </clipPath>
      </defs>
      <path
        d="M416 248H608C768 248 896 376 896 536V600C896 760 768 888 608 888H448L288 1016V872C192 824 128 728 128 600V536C128 376 256 248 416 248Z"
        fill="url(#pj-marca)"
      />
      <g clipPath="url(#pj-bolha)">
        <ellipse cx="470" cy="330" rx="420" ry="170" fill="url(#pj-reflexo)" />
      </g>
      <path
        d="M240 520C240 408 320 336 432 336H512"
        fill="none"
        stroke="#fff"
        strokeWidth="48"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
      <path
        d="M512 376C531 485 563 517 672 536C563 555 531 587 512 696C493 587 461 555 352 536C461 517 493 485 512 376Z"
        fill="#fff"
      />
    </svg>
  );
}

/** A fala de quem usa o app, com a frase que acorda o Platão marcada dentro dela. */
function Said({ example, marked }: { example: PlataoExample; marked: boolean }) {
  const start = example.said.toLowerCase().indexOf(example.trigger.toLowerCase());
  if (start < 0) return <>{example.said}</>;
  const end = start + example.trigger.length;
  return (
    <>
      {example.said.slice(0, start)}
      <mark className={marked ? "pj-marcada" : undefined}>{example.said.slice(start, end)}</mark>
      {example.said.slice(end)}
    </>
  );
}

function SceneBody({ example, scene }: { example: PlataoExample; scene: PlataoScene }) {
  const steps = [
    `Ouvi “${example.trigger}”`,
    "Entendendo a pergunta do cliente",
    `Buscando “${example.question}” na documentação ${example.platform}`,
    `Lendo a página “${example.sources[0].title}”…`,
  ];

  return (
    <div className="pj__card">
      <div className="pj__linha">
        {example.store ? (
          <span className="pj__conta">
            <Store className="i" />
            <span className="pj__conta-texto">Conta da loja</span>
          </span>
        ) : (
          <span className="pj__livre" />
        )}
        <span className="pj__pilula pj__perguntar">
          <Sparkles className="i" />
          Perguntar
        </span>
        <span className="pj__redondo">
          <SlidersHorizontal className="i" />
        </span>
      </div>

      {scene.stage === "listening" && (
        <div className="pj__pane" data-pane="ouvindo">
          <div className="pj__estado">
            <span className="pj__estado-icone">
              <em className="pj-ondas pj-ondas--sempre">
                <i />
                <i />
                <i />
                <i />
              </em>
            </span>
            <div>
              <p className="pj__titulo">Ouvindo seus gatilhos</p>
              <p className="pj__suave">
                Diga “{example.trigger}” e eu busco na documentação {example.platform}. Também ajudo
                se o cliente perguntar e você ficar em silêncio.
              </p>
            </div>
          </div>
        </div>
      )}

      {scene.stage === "searching" && (
        <div className="pj__pane" data-pane="buscando">
          <div className="pj__prog-topo">
            <strong>Buscando na documentação {example.platform}</strong>
            <span className="pj__prog-tempo">{seconds(scene.seconds * 1000)} s</span>
          </div>
          <span className="pj__prog-barra" />
          <ol className="pj__passos">
            {steps.map((text, index) => (
              <li
                key={text}
                className={index < scene.step ? "feito" : index === scene.step ? "atual" : "futuro"}
              >
                <span className="pj__marca-passo">
                  <Check className="i" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {scene.stage === "answer" && (
        <div className="pj__pane" data-pane="resposta">
          <div className="pj__frase" data-parte style={{ "--n": 0 } as React.CSSProperties}>
            <p className="pj__pergunta">{example.question}</p>
            <p className="pj__curta">{example.answer}</p>
          </div>
          <div className="pj__fontes">
            {example.sources.map((source, index) => (
              <div
                key={source.url}
                className="pj__fonte"
                data-parte
                style={{ "--n": index + 1 } as React.CSSProperties}
              >
                <FileText className="i pj__fonte-ic" />
                <span className="pj__fonte-txt">
                  <b>{source.title}</b>
                  <small>{source.host}</small>
                </span>
                <span className="pj__copiar">
                  <Copy className="i" />
                  Copiar link
                </span>
              </div>
            ))}
          </div>
          <div className="pj__rodape" data-parte style={{ "--n": 3 } as React.CSSProperties}>
            <Timer className="i" />
            <span>resposta curta em {seconds(example.ms)} s</span>
            {example.extraSources > 0 && (
              <span className="pj__mais">+{example.extraSources} fontes</span>
            )}
            <span className="pj__refazer">
              <RotateCcw className="i" />
              Refazer
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const sceneKey = (scene: PlataoScene) =>
  `${scene.stage}|${scene.clientSpoke}|${scene.youSpoke}|${scene.triggered}|${scene.step}|${scene.seconds}|${scene.leaving}`;

/**
 * A janelinha do Platão tocando uma dúvida de verdade, em 3D. O relógio anda com os quadros do
 * trilho: fora da tela a cena para, e com "reduzir movimento" fica só a resposta pronta.
 */
export function PlataoCard({ mode }: { mode: PlataoMode }) {
  const example = plataoExamples[mode];
  const [scene, setScene] = useState<PlataoScene>(() => plataoSceneAt(0, example.ms));
  const [still, setStill] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const clock = useRef({ ms: 0, last: -1, key: "" });
  const pose = useRef({ y: PLATAO_POSE.talking.y, x: PLATAO_POSE.talking.x, mouse: 0 });
  const fit = useRef({ scale: 1, narrow: false });
  const lastHeight = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const apply = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const { y, x, mouse } = pose.current;
    const { scale, narrow } = fit.current;
    wrap.style.transform = `perspective(1600px) translate(${narrow ? "-50%" : "0"}, -50%) rotateY(${(y + mouse * 3).toFixed(2)}deg) rotateX(${x.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
  };

  const measure = () => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    const stage = wrap?.parentElement;
    if (!wrap || !card || !stage) return;
    const narrow = window.matchMedia("(max-width: 860px)").matches;
    const height = stage.clientHeight / (card.offsetHeight + 16);
    const width = narrow ? stage.clientWidth / (card.offsetWidth + 8) : 1;
    fit.current = { scale: Math.min(1, height, width), narrow };
    apply();
  };

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) {
      setStill(true);
      setScene(plataoFinalScene(example.ms));
      pose.current = { y: PLATAO_POSE.answer.y, x: PLATAO_POSE.answer.x, mouse: 0 };
    }
    measure();
    const stage = wrapRef.current?.parentElement;
    if (!stage || !("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
    // `measure` só lê refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example.ms]);

  // O card cresce e encolhe aos poucos quando a cena troca de estado
  useLayoutEffect(() => {
    const card = cardRef.current?.querySelector<HTMLElement>(".pj__card");
    if (!card) return;
    const after = card.offsetHeight;
    const before = lastHeight.current;
    lastHeight.current = after;
    if (!before || before === after || still || !card.animate) return;
    card.animate([{ height: `${before}px` }, { height: `${after}px` }], {
      duration: 460,
      easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    });
  }, [scene.stage, still]);

  // Como no app: quando a conversa não cabe, fica à vista a fala mais nova, mesmo com o card mudando de altura
  useLayoutEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const toEnd = () => {
      scroll.scrollTop = scroll.scrollHeight;
      scroll.classList.toggle("pj__rolo--rolado", scroll.scrollTop > 2);
    };
    toEnd();
    if (!("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(toEnd);
    observer.observe(scroll);
    if (scroll.firstElementChild) observer.observe(scroll.firstElementChild);
    return () => observer.disconnect();
  }, [scene.stage, scene.clientSpoke, scene.youSpoke]);

  useRailFrame((loc, time, pointerX) => {
    if (still) return;
    const state = clock.current;
    const near = Math.abs(loc) < 0.6;
    const dt = state.last < 0 ? 0 : Math.min(0.08, time - state.last);
    state.last = near ? time : -1;
    if (!near) return;

    state.ms += dt * 1000;
    const next = plataoSceneAt(state.ms, example.ms);
    const key = sceneKey(next);
    if (key !== state.key) {
      state.key = key;
      setScene(next);
    }

    const target = next.stage === "answer" ? PLATAO_POSE.answer : PLATAO_POSE.talking;
    const slow = 1 - Math.exp(-dt / 0.32);
    const fast = 1 - Math.exp(-dt / 0.12);
    const current = pose.current;
    current.y += (target.y - current.y) * slow;
    current.x += (target.x - current.x) * slow;
    current.mouse += (pointerX - current.mouse) * fast;
    apply();
  });

  const client = scene.clientSpoke;
  const you = scene.youSpoke;

  return (
    <div ref={wrapRef} className="plt-card" aria-hidden="true">
      <div
        ref={cardRef}
        className={cn("pj", scene.leaving && "pj--saindo", still && "pj--pronta")}
        data-mode={mode}
        data-estado={STATE_NAME[scene.stage]}
      >
        <div className="pj__topo">
          <span className="pj__marca">
            <PlataoLogo />
            <i className="pj__ponto" />
          </span>
          <span className="pj__modos">
            <b className={mode === "vtex" ? "ativo" : undefined}>VTEX</b>
            <b className={mode === "wake" ? "ativo" : undefined}>Wake</b>
          </span>
          <span className="pj__livre" />
          <span className="pj__acoes">
            <span>
              <EyeOff className="i" />
            </span>
            <span>
              <X className="i" />
            </span>
          </span>
        </div>

        <SceneBody example={example} scene={scene} />

        <div className="pj__transcricao">
          <p className="pj__rotulo">Transcrição</p>
          {!client && !you && <p className="pj__vazio">Aguardando fala…</p>}
          <div ref={scrollRef} className="pj__rolo">
            <div className="pj__falas">
              {client && (
                <div className="pj-fala pj-fala--cliente">
                  <span className="pj-fala__quem">Cliente</span>
                  <span className="pj-fala__texto">{example.question}</span>
                </div>
              )}
              {you && (
                <div className="pj-fala pj-fala--voce">
                  <span className="pj-fala__quem">Você</span>
                  <span className="pj-fala__texto">
                    <Said example={example} marked={scene.triggered} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pj__barra">
          <span className="pj__pilula">
            <Pause className="i" />
            Pausar
          </span>
          <span className="pj__redondo pj__redondo--g">
            <Mic className="i" />
          </span>
          <span className="pj__redondo pj__redondo--g pj__redondo--fim">
            <PhoneOff className="i" />
          </span>
          <span className="pj__livre" />
          <span className="pj__pilula pj__pilula--transcricao">
            <MessageSquareText className="i" />
            <span className="pj__pilula-texto">Transcrição</span>
          </span>
        </div>
      </div>
    </div>
  );
}
