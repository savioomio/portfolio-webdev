import type { CSSProperties, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/content/projects";

/** Lista dos projetos: cada linha leva ao painel do trilho, ou à página do projeto em nova aba. */
export function ProjectIndex({ onSelect }: { onSelect: (index: number) => void }) {
  const handleClick = (event: MouseEvent, index: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    onSelect(index);
  };

  return (
    <section
      id="historia"
      className="relative scroll-mt-20 bg-bg px-[var(--gl)] py-[clamp(72px,11svh,130px)]"
    >
      <div className="mx-auto w-full max-w-wrap">
        <h2 className="max-w-[18em] text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]">
          Da robótica ao software, sempre movido por tecnologia
        </h2>
        <p className="mt-3.5 text-[1.1rem] text-mute">
          Fora das lojas, do ensino médio até hoje. Escolha um projeto ou continue rolando.
        </p>
        <ol className="mt-8 border-t-2 border-ink">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link
                to={`/projetos/${project.slug}`}
                onClick={(event) => handleClick(event, index)}
                className="project-row"
                style={{ "--c": project.color, "--k": project.ink } as CSSProperties}
              >
                <span className="font-display text-[15px] font-extrabold leading-none">
                  {project.when}
                </span>
                <b className="font-display text-[clamp(1.45rem,2.6vw,2.2rem)] font-black leading-[1.08] tracking-[-0.015em]">
                  {project.name}
                </b>
                <span className="text-base leading-[1.35]">{project.summary}</span>
                <ArrowRight className="size-6" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
