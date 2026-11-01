import { useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { clamp, ease, prefersReducedMotion } from "@/lib/utils";
import { useRailFrame } from "@/hooks/useRailFrame";
import { plataoExamples, type PlataoMode } from "@/lib/platao";
import { PlataoCard } from "./PlataoCard";
import { useZoom } from "@/hooks/useZoom";
import { PanelCopy } from "./PanelCopy";
import { RailPanel } from "./RailPanel";
import { RailVideo } from "./RailVideo";
import { ScreenTabs } from "./ScreenTabs";

interface PanelProps {
  project: Project;
}

const aranhaApp = {
  src: "/media/aranha-app.webp",
  alt: "Tela do controle da aranha no celular",
};

export function AranhaPanel({ project }: PanelProps) {
  const zoom = useZoom();

  return (
    <RailPanel project={project}>
      <div className="panel-inner">
        <PanelCopy project={project} hideFacts />
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
            src={aranhaApp.src}
            alt={aranhaApp.alt}
            width={400}
            height={400}
            loading="lazy"
            {...zoom(aranhaApp)}
          />
        </div>
      </div>
    </RailPanel>
  );
}

const tendaPhotos = {
  medals: {
    src: "/media/medalhas-tenda.webp",
    alt: "As 2 medalhas de honra ao mérito científico da Tenda da Ciência, na minha mão",
  },
  stand: {
    src: "/media/tenda.webp",
    alt: "Sávio apresentando o projeto na Tenda da Ciência",
  },
};

export function CallidusPanel({ project }: PanelProps) {
  const zoom = useZoom();
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
                src={tendaPhotos.medals.src}
                alt={tendaPhotos.medals.alt}
                width={456}
                height={456}
                loading="lazy"
                {...zoom(tendaPhotos.medals)}
              />
              <figcaption className="mt-1.5 text-sm font-bold">
                2 medalhas na feira: Callidus Link e mão robótica.
              </figcaption>
            </figure>
            <figure>
              <img
                className="aspect-square h-auto w-full rounded-[14px] object-cover"
                src={tendaPhotos.stand.src}
                alt={tendaPhotos.stand.alt}
                width={400}
                height={400}
                loading="lazy"
                {...zoom(tendaPhotos.stand)}
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
        <PanelCopy project={project} />
        <ScreenTabs
          title="Telas do GasMaster"
          screens={[
            { label: "Painel", src: "/media/gm-painel.webp", alt: project.cover.alt },
            { label: "Gestão", src: "/media/gm-graficos.webp", alt: project.gallery[0].alt },
            { label: "Clientes", src: "/media/gm-clientes.webp", alt: project.gallery[1].alt },
            { label: "Notas", src: "/media/gm-notas.webp", alt: project.gallery[2].alt },
            { label: "IA", src: "/media/gm-assistente.webp", alt: project.gallery[3].alt },
          ]}
        />
      </div>
    </RailPanel>
  );
}

/** O card e as respostas vêm dos testes do app (`lib/platao.ts`); aqui ficam só as cores e o print. */
const plataoModes = {
  vtex: {
    background: "#142032",
    accent: "#C20C4A",
    image: "/media/platao-inicio-vtex.webp",
    alt: "Tela inicial do Platão no modo VTEX",
  },
  wake: {
    background: "#1A1A1A",
    accent: "#C505F2",
    image: "/media/platao-inicio-wake.webp",
    alt: "Tela inicial do Platão no modo Wake",
  },
};

export function PlataoPanel({ project }: PanelProps) {
  const [mode, setMode] = useState<PlataoMode>("vtex");
  const current = plataoModes[mode];
  const example = plataoExamples[mode];
  const zoom = useZoom();

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
                {plataoExamples[key].label}
              </button>
            ))}
          </div>
        </PanelCopy>
        <figure className="plt-stage">
          <img
            className="plt-shot"
            src={current.image}
            alt={current.alt}
            width={1200}
            height={786}
            loading="lazy"
            {...zoom({ src: current.image, alt: current.alt })}
          />
          <PlataoCard key={mode} mode={mode} />
          <figcaption className="sr-only">
            Demonstração da janelinha do Platão no modo {example.label}: o cliente pergunta “
            {example.question}”, você diz “{example.said}” e o Platão responde em{" "}
            {(example.ms / 1000).toFixed(1).replace(".", ",")} segundos: {example.answer}
          </figcaption>
        </figure>
      </div>
    </RailPanel>
  );
}
