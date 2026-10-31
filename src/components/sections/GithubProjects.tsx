import { RepoGrid } from "@/components/projects/RepoGrid";
import { ButtonLink } from "@/components/ui/Button";
import { useInView } from "@/hooks/useInView";
import { FEATURED_LIMIT, useFeaturedRepos } from "@/hooks/useFeatured";

/** Só consulta o GitHub quando a seção chega perto da tela. */
export function GithubProjects() {
  const { ref, inView } = useInView<HTMLElement>();
  const { data, isPending, error, refetch } = useFeaturedRepos({ enabled: inView });

  return (
    <section
      ref={ref}
      id="github"
      className="relative scroll-mt-20 bg-bg px-[var(--gl)] py-[clamp(72px,11svh,130px)]"
    >
      <div className="mx-auto w-full max-w-wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[clamp(2.2rem,4.4vw,4rem)] font-black leading-[1.04] tracking-[-0.022em]">
              Direto do meu GitHub
            </h2>
            <p className="mt-3 text-[1.1rem] text-mute">
              Repositórios em destaque, com dados vindos da API do GitHub.
            </p>
          </div>
          <ButtonLink to="/projetos" variant="outline">
            Ver todos
          </ButtonLink>
        </div>
        <div className="mt-8">
          <RepoGrid
            repos={data}
            loading={isPending}
            error={error}
            skeletons={FEATURED_LIMIT}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    </section>
  );
}
