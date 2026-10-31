import { useState } from "react";
import { RepoError } from "@/components/projects/RepoGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { FEATURED_LIMIT, useFeaturedNames, useSaveFeatured } from "@/hooks/useFeatured";
import { useRepos } from "@/hooks/useRepos";

/** Escolhe até 6 repositórios para a seção do GitHub na Home. */
export function FeaturedPicker() {
  const repos = useRepos();
  const featured = useFeaturedNames();
  const save = useSaveFeatured();
  const [picked, setPicked] = useState<string[] | null>(null);

  // Repositório apagado ou renomeado não ocupa vaga
  const selected = (picked ?? featured.data ?? []).filter((name) =>
    repos.data?.some((repo) => repo.name === name),
  );

  const toggle = (name: string) => {
    setPicked(
      selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name],
    );
  };

  if (repos.error && !repos.data) {
    return <RepoError error={repos.error} onRetry={() => repos.refetch()} />;
  }

  if (featured.isError) {
    return (
      <StatusMessage
        title="Não consegui ler os destaques atuais"
        action={
          <Button variant="outline" size="sm" onClick={() => featured.refetch()}>
            Tentar de novo
          </Button>
        }
      >
        Sem essa leitura, salvar poderia apagar a escolha que já existe.
      </StatusMessage>
    );
  }

  if (!repos.data || featured.isLoading) {
    return (
      <Card role="status" aria-label="Carregando repositórios">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} className="mb-3 h-5 w-2/3" />
        ))}
      </Card>
    );
  }

  const full = selected.length >= FEATURED_LIMIT;

  return (
    <Card>
      <p className="text-sm font-bold text-mute">
        {selected.length} de {FEATURED_LIMIT} escolhidos. Sem escolha, a Home mostra os mais
        recentes.
      </p>
      <ul className="mt-3 grid max-h-[420px] gap-1 overflow-y-auto">
        {repos.data.map((repo) => {
          const checked = selected.includes(repo.name);
          return (
            <li key={repo.id}>
              <label className="flex min-h-10 items-center gap-2.5">
                <input
                  type="checkbox"
                  className="size-5 accent-[#F5B800]"
                  checked={checked}
                  disabled={!checked && full}
                  onChange={() => toggle(repo.name)}
                />
                <span className="[overflow-wrap:anywhere]">{repo.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <Button
          size="sm"
          disabled={save.isPending || picked === null}
          onClick={() => save.mutate(selected)}
        >
          {save.isPending && <Spinner />}
          Salvar destaques
        </Button>
        <p role="status" className="text-sm font-bold">
          {save.isSuccess && "Destaques salvos."}
          {save.isError && "Não consegui salvar. Tente de novo."}
        </p>
      </div>
    </Card>
  );
}
