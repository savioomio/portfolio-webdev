import { useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { PanelCopy } from "./PanelCopy";
import { RailPanel } from "./RailPanel";
import { RailVideo } from "./RailVideo";

interface AppScreen {
  label: string;
  text: string;
  src?: string;
  alt?: string;
}

const screens: AppScreen[] = [
  { label: "Em uso", text: "O app funcionando, gravado no aparelho." },
  {
    label: "Câmera",
    text: "Visor com filtro ao vivo.",
    src: "/media/syn-camera.webp",
    alt: "Tela da câmera do Synesthesia, com o carrossel de filtros",
  },
  {
    label: "Captura",
    text: "A IA lê a cena e sugere 3 looks.",
    src: "/media/syn-captura.webp",
    alt: "Tela de captura com a vibe lida pela IA e os looks sugeridos",
  },
  {
    label: "Trilhas",
    text: "Até 4 músicas para aquela vibe.",
    src: "/media/syn-trilhas.webp",
    alt: "Tela com quatro sugestões de música para a foto",
  },
  {
    label: "Vídeo pronto",
    text: "Imagem e trilha num só arquivo.",
    src: "/media/syn-pronto.webp",
    alt: "Confirmação do vídeo gerado, pronto para postar",
  },
  {
    label: "Galeria",
    text: "Cada momento guarda vibe e trilha.",
    src: "/media/syn-tela-galeria.webp",
    alt: "Galeria com os momentos salvos no app",
  },
  {
    label: "Ajustes",
    text: "IA e localização são opcionais.",
    src: "/media/syn-tela-ajustes.webp",
    alt: "Tela de ajustes do Synesthesia",
  },
];

export function SynesthesiaPanel({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  return (
    <RailPanel
      project={project}
      style={{ "--accent": "#F4A20C", "--on-accent": "#1C0507" } as CSSProperties}
    >
      <div className="panel-inner">
        <PanelCopy project={project} />
        <div className="media-syn">
          <div className="phone" role="tabpanel" aria-label={screen.label}>
            {project.video && (
              <RailVideo
                src={project.video.src}
                poster={project.video.poster}
                label={project.video.label}
                className={screen.src ? "hidden" : undefined}
              />
            )}
            {screen.src && (
              <img src={screen.src} alt={screen.alt} width={360} height={800} loading="lazy" />
            )}
          </div>
          <div className="syn-tabs" role="tablist" aria-label="Telas do Synesthesia">
            {screens.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
              >
                <b>{item.label}</b>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </RailPanel>
  );
}
