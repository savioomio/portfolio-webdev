import { site } from "@/content/site";
import { cleanRepos, pickRepoFields } from "@/lib/repos";
import type { GithubRepo } from "@/types/github";

const API_URL = "https://api.github.com";

export class GithubApiError extends Error {
  status: number;
  /** Quando o limite da API volta a liberar requisições. */
  resetAt: Date | null;

  constructor(status: number, resetAt: Date | null) {
    super(`GitHub respondeu ${status}`);
    this.name = "GithubApiError";
    this.status = status;
    this.resetAt = resetAt;
  }

  get isRateLimit() {
    return this.status === 429 || (this.status === 403 && this.resetAt !== null);
  }

  get isNotFound() {
    return this.status === 404;
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    signal,
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const reset = response.headers.get("x-ratelimit-reset");
    const limited = remaining === "0" && reset;
    throw new GithubApiError(response.status, limited ? new Date(Number(reset) * 1000) : null);
  }

  return response.json() as Promise<T>;
}

export async function listRepos(signal?: AbortSignal) {
  const path = `/users/${site.githubUser}/repos?per_page=100&sort=pushed&type=owner`;
  return cleanRepos(await request<GithubRepo[]>(path, signal));
}

export async function getRepo(name: string, signal?: AbortSignal) {
  const repo = await request<GithubRepo>(
    `/repos/${site.githubUser}/${encodeURIComponent(name)}`,
    signal,
  );
  return pickRepoFields(repo);
}
