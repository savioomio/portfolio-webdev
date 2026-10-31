import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { GithubApiError } from "@/services/github";
import type { GithubRepo } from "@/types/github";
import { RepoGrid } from "./RepoGrid";

const repo: GithubRepo = {
  id: 1,
  name: "faststore-login-extension",
  description: "Extensão de login para FastStore.",
  html_url: "https://github.com/savioomio/faststore-login-extension",
  homepage: null,
  language: "JavaScript",
  stargazers_count: 0,
  pushed_at: "2026-09-04T12:00:00Z",
  fork: false,
};

const renderGrid = (props: Partial<Parameters<typeof RepoGrid>[0]>) =>
  render(
    <MemoryRouter>
      <RepoGrid repos={undefined} loading={false} error={null} onRetry={() => {}} {...props} />
    </MemoryRouter>,
  );

describe("RepoGrid", () => {
  it("mostra o skeleton enquanto carrega", () => {
    renderGrid({ loading: true });
    expect(screen.getByRole("status", { name: "Carregando repositórios" })).toBeVisible();
  });

  it("mostra os dados do repositório", () => {
    renderGrid({ repos: [repo] });
    expect(screen.getByRole("link", { name: repo.name })).toHaveAttribute(
      "href",
      `/projetos/${repo.name}`,
    );
    expect(screen.getByText("JavaScript")).toBeVisible();
    expect(screen.getByText("Extensão de login para FastStore.")).toBeVisible();
  });

  it("mostra a lista vazia", () => {
    renderGrid({ repos: [] });
    expect(screen.getByText("Nenhum repositório por aqui")).toBeVisible();
  });

  it("mostra o erro e deixa tentar de novo", async () => {
    const onRetry = vi.fn();
    renderGrid({ error: new Error("rede"), onRetry });

    await userEvent.click(screen.getByRole("button", { name: "Tentar de novo" }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("explica o limite da API do GitHub", () => {
    const resetAt = new Date("2026-10-31T15:30:00Z");
    renderGrid({ error: new GithubApiError(403, resetAt) });

    expect(screen.getByText("O GitHub pediu uma pausa")).toBeVisible();
    expect(screen.getByText(/A lista volta às 12:30/)).toBeVisible();
  });
});
