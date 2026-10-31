import { describe, expect, it, vi } from "vitest";
import type { GithubRepo } from "@/types/github";
import { GithubApiError, listRepos } from "./github";

const repo = (name: string, fork = false): GithubRepo => ({
  id: name.length,
  name,
  description: null,
  html_url: `https://github.com/savioomio/${name}`,
  homepage: null,
  language: "TypeScript",
  stargazers_count: 0,
  pushed_at: "2026-10-31T12:00:00Z",
  fork,
});

describe("listRepos", () => {
  it("tira forks e repositórios pessoais", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([repo("portfolio"), repo("copia", true), repo("savioomio")]), {
          status: 200,
        }),
      ),
    );

    const repos = await listRepos();

    expect(repos.map((item) => item.name)).toEqual(["portfolio"]);
  });

  it("identifica o limite da API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("{}", {
          status: 403,
          headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1793500000" },
        }),
      ),
    );

    const error = await listRepos().catch((failure: GithubApiError) => failure);

    expect(error).toBeInstanceOf(GithubApiError);
    expect((error as GithubApiError).isRateLimit).toBe(true);
    expect((error as GithubApiError).resetAt).toEqual(new Date(1793500000 * 1000));
  });

  it("não confunde um 403 comum com o limite", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 403 })));

    const error = await listRepos().catch((failure: GithubApiError) => failure);

    expect((error as GithubApiError).isRateLimit).toBe(false);
  });
});
