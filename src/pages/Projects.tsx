import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { RepoGrid } from "@/components/projects/RepoGrid";
import { projects } from "@/content/projects";
import { useRepos } from "@/hooks/useRepos";
import { repoLanguages } from "@/lib/repos";
import { seoForProjects } from "@/lib/seo";

const ALL = "Todas";

export default function Projects() {
  const { data, isPending, error, refetch } = useRepos();
  const [language, setLanguage] = useState(ALL);

  const languages = useMemo(() => [ALL, ...repoLanguages(data ?? [])], [data]);
  const visible = useMemo(
    () => (language === ALL ? data : data?.filter((repo) => repo.language === language)),
    [data, language],
  );

  return (
    <main className="relative mx-auto w-full max-w-page-box px-[var(--gl)] pb-20 pt-28 md:pt-32">
      <Seo data={seoForProjects()} />
      <h1 className="text-[clamp(2.6rem,6vw,4.8rem)] font-black leading-[1.06] tracking-[-0.025em]">
        Projetos
      </h1>
      <p className="mt-3 max-w-[38em] text-lg text-mute">
        Além das lojas, os projetos que contam a minha história, e depois tudo o que está público no
        GitHub.
      </p>

      <section aria-labelledby="historia-titulo" className="mt-10">
        <h2 id="historia-titulo" className="text-3xl font-black tracking-[-0.02em]">
          Em destaque
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projetos/${project.slug}`}
                className="flex h-full min-h-[148px] flex-col justify-between rounded-2xl bg-[var(--c)] p-5 text-[var(--k)] no-underline transition-transform duration-200 hover:-translate-y-0.5"
                style={{ "--c": project.color, "--k": project.ink } as CSSProperties}
              >
                <span className="font-display text-sm font-extrabold">{project.when}</span>
                <span>
                  <b className="block font-display text-2xl font-black leading-tight">
                    {project.name}
                  </b>
                  <span className="mt-1 block text-sm leading-snug">{project.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="github-titulo" className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="github-titulo" className="text-3xl font-black tracking-[-0.02em]">
            No GitHub
          </h2>
          {languages.length > 2 && (
            <label className="flex items-center gap-2 text-sm font-bold">
              Linguagem
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="min-h-10 rounded-lg border-2 border-line bg-surface px-2 font-body"
              >
                {languages.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="mt-5">
          <RepoGrid
            repos={visible}
            loading={isPending}
            error={error}
            emptyTitle="Nenhum repositório nesta linguagem"
            onRetry={() => refetch()}
          />
        </div>
      </section>
    </main>
  );
}
