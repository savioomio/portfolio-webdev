import { useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { clamp, ease, prefersReducedMotion } from "@/lib/utils";
import { PanelCopy } from "./PanelCopy";
import { RailPanel } from "./RailPanel";
import { RailVideo } from "./RailVideo";
import { ScreenTabs } from "./ScreenTabs";
import { useRailFrame } from "./railContext";

interface PanelProps {
  project: Project;
}

export function AranhaPanel({ project }: PanelProps) {
  return (
    <RailPanel project={project}>
      <div className="panel-inner">
        <PanelCopy project={project} />
        <div className="media-aranha">
          <RailVideo
            src="/media/aranha-perto.mp4"
            poster="/media/aranha-perto.webp"
            label="A aranha robô vista de perto"
          />
          <RailVideo
            src="/media/aranha.mp4"
            poster="/media/aranha-poster.webp"
            label="A aranha robô andando"
          />
          <img
            className="aranha-app h-full w-full rounded-[14px] object-cover"
            src="/media/aranha-app.webp"
            alt="Tela do controle da aranha no celular"
            width={400}
            height={400}
            loading="lazy"
          />
        </div>
      </div>
    </RailPanel>
  );
}

export function CallidusPanel({ project }: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const reduced = useRef(false);

  useRailFrame((loc) => {
    reduced.current = prefersReducedMotion();
    const level = clamp(1 - Math.abs(loc) * 1.1);
    panelRef.current?.style.setProperty("--w", String(level));
    if (hoursRef.current) {
      hoursRef.current.textContent = String(reduced.current ? 352 : Math.round(ease(level) * 352));
    }
  });

  return (
    <RailPanel project={project} style={{ isolation: "isolate" }}>
      <div ref={panelRef} className="absolute inset-0">
        <div className="water" aria-hidden="true">
          <svg className="wave" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0 22 Q75 2 150 22 T300 22 T450 22 T600 22 T750 22 T900 22 T1050 22 T1200 22 V40 H0Z" />
          </svg>
        </div>
        <div className="panel-inner">
          <PanelCopy
            project={project}
            hideFacts
            lead={
              <p className="hours">
                <span ref={hoursRef}>352</span>
                <small> horas</small>
              </p>
            }
          />
          <div className="grid max-h-[30svh] grid-cols-2 items-end gap-3 self-end md:max-h-none">
            <figure>
              <img
                className="aspect-square h-auto w-full rounded-[14px] object-cover"
                src="/media/medalhas-tenda.webp"
                alt="As 2 medalhas de honra ao mérito científico da Tenda da Ciência, na minha mão"
                width={456}
                height={456}
                loading="lazy"
              />
              <figcaption className="mt-1.5 text-sm font-bold">
                2 medalhas na feira: Callidus Link e mão robótica.
              </figcaption>
            </figure>
            <figure>
              <img
                className="aspect-square h-auto w-full rounded-[14px] object-cover"
                src="/media/tenda.webp"
                alt="Sávio apresentando o projeto na Tenda da Ciência"
                width={400}
                height={400}
                loading="lazy"
              />
              <figcaption className="mt-1.5 text-sm font-bold">
                Apresentando na Tenda da Ciência.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </RailPanel>
  );
}

export function JsomPanel({ project }: PanelProps) {
  return (
    <RailPanel project={project}>
      <img
        className="absolute inset-0 size-full object-cover opacity-60 mix-blend-multiply"
        src="/media/jsom-fundo.webp"
        alt=""
        width={1400}
        height={788}
        loading="lazy"
      />
      <div className="panel-inner">
        <PanelCopy project={project} />
        <ScreenTabs
          title="Telas do JSOM"
          screens={[
            { label: "Alunos", src: "/media/jsom-alunos.webp", alt: project.cover.alt },
            { label: "Avaliação", src: "/media/jsom-avaliacao.webp", alt: project.gallery[0].alt },
            { label: "Perfil", src: "/media/jsom-perfil.webp", alt: project.gallery[1].alt },
            {
              label: "Exercícios",
              src: "/media/jsom-exercicios.webp",
              alt: project.gallery[2].alt,
            },
          ]}
        />
      </div>
    </RailPanel>
  );
}

export function GasMasterPanel({ project }: PanelProps) {
  return (
    <RailPanel project={project}>
      <div className="panel-inner">
        <PanelCopy
          project={project}
          top={
            <span className="mb-3 inline-block rounded-xl bg-[#F7FFF4] px-3.5 py-2">
              <img
                src="/media/gasmaster.svg"
                alt="GasMaster"
                width={120}
                height={44}
                className="h-11 w-auto"
              />
            </span>
          }
        />
        <ScreenTabs
          title="Telas do GasMaster"
          screens={[
            { label: "Painel", src: "/media/gm-painel.webp", alt: project.cover.alt },
            { label: "Gestão", src: "/media/gm-graficos.webp", alt: project.gallery[0].alt },
            { label: "Clientes", src: "/media/gm-clientes.webp", alt: project.gallery[1].alt },
            { label: "Notas", src: "/media/gm-notas.webp", alt: project.gallery[2].alt },
          ]}
        />
      </div>
    </RailPanel>
  );
}

const lenses = [
  { name: "Original", filter: "none" },
  { name: "Vívido", filter: "saturate(1.7) contrast(1.08)" },
  { name: "Neon", filter: "saturate(1.9) hue-rotate(-28deg) contrast(1.12)" },
  { name: "Noir", filter: "grayscale(1) contrast(1.22)" },
  { name: "Vintage", filter: "sepia(0.62) saturate(1.2) brightness(0.96)" },
];

export function SynesthesiaPanel({ project }: PanelProps) {
  const [lens, setLens] = useState(lenses[0]);

  return (
    <RailPanel
      project={project}
      style={{ "--accent": "#F4A20C", "--on-accent": "#1C0507" } as CSSProperties}
    >
      <div className="panel-inner">
        <PanelCopy project={project}>
          <div className="chip-row" role="group" aria-label="Filtros do vídeo">
            {lenses.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={item.name === lens.name}
                onClick={() => setLens(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </PanelCopy>
        <div className="media-syn">
          <div className="phone" style={{ "--lens": lens.filter } as CSSProperties}>
            <RailVideo
              src="/media/synesthesia.mp4"
              poster="/media/synesthesia-poster.webp"
              label="Vídeo do app Synesthesia, com o filtro escolhido"
              className="[filter:var(--lens)]"
            />
          </div>
          <div className="syn-shots">
            {project.gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </RailPanel>
  );
}

/** Os dois exemplos saem do banco de testes do app, com o tempo que levaram de verdade. */
const plataoModes = {
  vtex: {
    label: "VTEX",
    background: "#142032",
    accent: "#C20C4A",
    image: "/media/platao-inicio-vtex.webp",
    alt: "Tela inicial do Platão no modo VTEX",
    question: "Dá para ter um preço diferente para cada canal de venda?",
    trigger: "Hmm, não me lembro bem.",
    answer:
      "Sim, é possível: dá para ter preços diferentes por política comercial (canal de venda) e também por tabelas de preços associadas a clientes específicos.",
    time: "1,6 s",
  },
  wake: {
    label: "Wake",
    background: "#1A1A1A",
    accent: "#C505F2",
    image: "/media/platao-inicio-wake.webp",
    alt: "Tela inicial do Platão no modo Wake",
    question: "Dá para vender por assinatura com cobrança recorrente?",
    trigger: "Deixa eu confirmar isso.",
    answer:
      "Sim, dá para vender por assinatura com cobrança recorrente, configurando Grupos de Assinatura em Assinaturas > Grupo de Assinaturas.",
    time: "2,0 s",
  },
};

type PlataoMode = keyof typeof plataoModes;

export function PlataoPanel({ project }: PanelProps) {
  const [mode, setMode] = useState<PlataoMode>("vtex");
  const current = plataoModes[mode];

  return (
    <RailPanel
      project={project}
      style={
        {
          "--c": current.background,
          "--accent": current.accent,
          "--on-accent": "#FFFFFF",
        } as CSSProperties
      }
    >
      <div className="panel-inner">
        <PanelCopy project={project}>
          <div className="chip-row" role="group" aria-label="Modo do Platão">
            {(Object.keys(plataoModes) as PlataoMode[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={key === mode}
                onClick={() => setMode(key)}
              >
                {plataoModes[key].label}
              </button>
            ))}
          </div>
        </PanelCopy>
        <figure className="relative min-w-0">
          <img
            className="h-auto w-full rounded-[14px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.8)]"
            src={current.image}
            alt={current.alt}
            width={1200}
            height={786}
            loading="lazy"
          />
          <figcaption className="answer-card">
            <p className="text-white/70">Cliente: {current.question}</p>
            <p className="mt-1 text-white/70">Você: {current.trigger}</p>
            <p className="mt-2 font-bold">{current.answer}</p>
            <p className="mt-1 text-[13px] text-white/70">Respondido em {current.time}</p>
          </figcaption>
        </figure>
      </div>
    </RailPanel>
  );
}
