import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { ExternalButton } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRepo } from "@/hooks/useRepos";
import { formatDate } from "@/lib/format";
import { isHiddenRepo } from "@/lib/repos";
import { seoForRepo } from "@/lib/seo";
import { GithubApiError } from "@/services/github";
import NotFound from "@/pages/NotFound";
import { RepoError } from "./RepoGrid";

const wrapperClass = "mx-auto min-h-[70svh] w-full max-w-wrap px-[var(--gl)] pb-20 pt-28 md:pt-32";

/** Página de um repositório: os dados vêm da API do GitHub. */
export function RepoDetail({ name }: { name: string }) {
  const { data: repo, isPending, error, refetch } = useRepo(name);

  const notFound = error instanceof GithubApiError && error.isNotFound;
  if (notFound || isHiddenRepo(name)) return <NotFound />;

  if (isPending) {
    return (
      <main className={wrapperClass} aria-busy="true">
        <Skeleton className="h-14 w-2/3" />
        <Skeleton className="mt-5 h-5 w-full max-w-xl" />
        <Skeleton className="mt-2 h-5 w-4/5 max-w-lg" />
      </main>
    );
  }

  if (error && !repo) {
    return (
      <main className={wrapperClass}>
        <h1 className="mb-6 text-4xl font-black [overflow-wrap:anywhere]">{name}</h1>
        <RepoError error={error} onRetry={() => refetch()} />
      </main>
    );
  }

  if (!repo) return <NotFound />;

  return (
    <main className={wrapperClass}>
      <Seo data={seoForRepo(repo)} />
      <nav aria-label="Caminho" className="text-sm font-bold">
        <Link to="/projetos" className="inline-flex items-center gap-1.5">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Projetos
        </Link>
      </nav>
      <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.08] tracking-[-0.022em] [overflow-wrap:anywhere]">
        {repo.name}
      </h1>
      <p className="mt-4 max-w-[38em] text-lg text-mute">
        {repo.description ?? "Sem descrição no GitHub."}
      </p>
      <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4 border-y-2 border-dashed border-gold py-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-bold text-mute">Linguagem</dt>
          <dd className="font-display text-lg font-extrabold">
            {repo.language ?? "Não informada"}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-mute">Última atualização</dt>
          <dd className="font-display text-lg font-extrabold">{formatDate(repo.pushed_at)}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-mute">Estrelas</dt>
          <dd className="flex items-center gap-1 font-display text-lg font-extrabold">
            <Star className="size-4" aria-hidden="true" />
            {repo.stargazers_count}
          </dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <ExternalButton href={repo.html_url}>Ver no GitHub</ExternalButton>
        {repo.homepage && (
          <ExternalButton href={repo.homepage} variant="outline">
            Abrir o projeto
          </ExternalButton>
        )}
      </div>
    </main>
  );
}
