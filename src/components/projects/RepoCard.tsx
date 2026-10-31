import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/format";
import type { GithubRepo } from "@/types/github";

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <Card className="flex h-full flex-col">
      <h3 className="text-xl font-extrabold leading-tight [overflow-wrap:anywhere]">
        <Link to={`/projetos/${repo.name}`} className="no-underline hover:underline">
          {repo.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-snug text-mute">
        {repo.description ?? "Sem descrição no GitHub."}
      </p>
      <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Linguagem</dt>
            <span className="size-2.5 rounded-full bg-gold" aria-hidden="true" />
            <dd className="font-bold">{repo.language}</dd>
          </div>
        )}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1">
            <dt>
              <Star className="size-3.5" aria-label="Estrelas" />
            </dt>
            <dd>{repo.stargazers_count}</dd>
          </div>
        )}
        <div>
          <dt className="sr-only">Última atualização</dt>
          <dd className="text-mute">{formatDate(repo.pushed_at)}</dd>
        </div>
      </dl>
    </Card>
  );
}

export function RepoCardSkeleton() {
  return (
    <Card className="flex h-full min-h-[172px] flex-col">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <Skeleton className="mt-auto h-4 w-1/2" />
    </Card>
  );
}
