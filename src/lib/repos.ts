import type { GithubRepo } from "@/types/github";

/** Repositórios públicos que não são projetos: perfil, pessoais e teste de processo seletivo. */
const HIDDEN_REPOS = new Set(["savioomio", "sites-dignissima", "Loves_Loves", "teste_wicomm"]);

/** Tira forks e repositórios escondidos, e guarda só os campos usados no site. */
export function cleanRepos(repos: GithubRepo[]): GithubRepo[] {
  return repos.filter((repo) => !repo.fork && !HIDDEN_REPOS.has(repo.name)).map(pickRepoFields);
}

export function pickRepoFields(repo: GithubRepo): GithubRepo {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    pushed_at: repo.pushed_at,
    topics: repo.topics ?? [],
    fork: repo.fork,
  };
}

export function isHiddenRepo(name: string) {
  return HIDDEN_REPOS.has(name);
}

export function repoLanguages(repos: GithubRepo[]) {
  const languages = repos.flatMap((repo) => (repo.language ? [repo.language] : []));
  return [...new Set(languages)].sort((a, b) => a.localeCompare(b));
}
