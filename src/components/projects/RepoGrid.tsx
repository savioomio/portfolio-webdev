import { ExternalButton, Button } from "@/components/ui/Button";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { site } from "@/content/site";
import { formatTime } from "@/lib/format";
import { GithubApiError } from "@/services/github";
import type { GithubRepo } from "@/types/github";
import { RepoCard, RepoCardSkeleton } from "./RepoCard";

const gridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

interface RepoGridProps {
  repos: GithubRepo[] | undefined;
  loading: boolean;
  error: Error | null;
  skeletons?: number;
  emptyTitle?: string;
  onRetry: () => void;
}

export function RepoError({ error, onRetry }: { error: Error; onRetry: () => void }) {
  if (error instanceof GithubApiError && error.isRateLimit) {
    const when = error.resetAt ? ` às ${formatTime(error.resetAt)}` : " em até uma hora";
    return (
      <StatusMessage
        title="O GitHub pediu uma pausa"
        action={
          <ExternalButton href={site.github} variant="outline" size="sm">
            Ver direto no GitHub
          </ExternalButton>
        }
      >
        Esta rede atingiu o limite de consultas por hora. A lista volta{when}.
      </StatusMessage>
    );
  }

  return (
    <StatusMessage
      title="Não consegui falar com o GitHub"
      action={
        <Button variant="outline" size="sm" onClick={onRetry}>
          Tentar de novo
        </Button>
      }
    >
      Pode ser a sua conexão ou uma instabilidade na API.
    </StatusMessage>
  );
}

/** Cartões vindos da API, com os estados de carregando, erro e lista vazia. */
export function RepoGrid({
  repos,
  loading,
  error,
  skeletons = 6,
  emptyTitle = "Nenhum repositório por aqui",
  onRetry,
}: RepoGridProps) {
  if (error && !repos) return <RepoError error={error} onRetry={onRetry} />;

  if (loading || !repos) {
    return (
      <div className={gridClass} role="status" aria-label="Carregando repositórios">
        {Array.from({ length: skeletons }, (_, index) => (
          <RepoCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (repos.length === 0) return <StatusMessage title={emptyTitle} />;

  return (
    <ul className={gridClass}>
      {repos.map((repo) => (
        <li key={repo.id}>
          <RepoCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}
