import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { ExternalButton } from "@/components/ui/Button";
import { projects, type Project } from "@/content/projects";
import { seoForProject } from "@/lib/seo";

/** Página própria de um projeto: as mesmas cores do painel, com o texto e as imagens. */
export function ProjectStory({ project }: { project: Project }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <main>
      <Seo data={seoForProject(project)} />
      <header
        className="bg-[var(--c)] px-[var(--gl)] pb-14 pt-28 text-[var(--k)] md:pt-32"
        style={{ "--c": project.color, "--k": project.ink } as CSSProperties}
      >
        <div className="mx-auto grid w-full max-w-wrap items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <nav aria-label="Caminho" className="text-sm font-bold">
              <Link to="/projetos" className="inline-flex items-center gap-1.5">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Projetos
              </Link>
            </nav>
            <h1 className="mt-4 text-[clamp(2.6rem,6vw,4.8rem)] font-black leading-[1.04] tracking-[-0.025em]">
              {project.headline ?? project.name}
            </h1>
            <p className="mt-3 font-display font-extrabold">{project.period}</p>
          </div>
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            fetchPriority="high"
            className="mx-auto max-h-[420px] w-auto rounded-2xl object-contain"
          />
        </div>
      </header>

      <div className="mx-auto w-full max-w-wrap px-[var(--gl)] py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="text-lg leading-relaxed">
            {project.body.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
            {project.facts.length > 0 && (
              <ul className="mt-6 border-t-2 border-dashed border-gold">
                {project.facts.map((fact) => (
                  <li key={fact} className="border-b-2 border-dashed border-gold py-3">
                    {fact}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside>
            <h2 className="text-2xl font-black">Feito com</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-gold-soft px-3 py-1.5 font-display text-sm font-extrabold"
                >
                  {item}
                </li>
              ))}
            </ul>
            {project.links.length > 0 && (
              <div className="mt-6 flex flex-col items-start gap-2.5">
                {project.links.map((link) => (
                  <ExternalButton key={link.href} href={link.href} variant="outline" size="sm">
                    {link.label}
                  </ExternalButton>
                ))}
              </div>
            )}
          </aside>
        </div>

        {project.gallery.length > 0 && (
          <section aria-label="Imagens do projeto" className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-auto w-full rounded-2xl"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link
          to={`/projetos/${next.slug}`}
          className="mt-14 flex items-center justify-between gap-4 border-y-2 border-ink py-5 no-underline"
        >
          <span>
            <span className="block text-sm font-bold text-mute">Próximo projeto</span>
            <b className="font-display text-3xl font-black">{next.name}</b>
          </span>
          <ArrowRight className="size-7 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
