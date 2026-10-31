import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSession, onAuthChange } from "@/services/auth";
import { listRepos } from "@/services/github";
import { listMessages } from "@/services/messages";
import Dashboard from "./Dashboard";

vi.mock("@/services/auth", () => ({
  getSession: vi.fn(),
  onAuthChange: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock("@/services/messages", () => ({
  listMessages: vi.fn(),
  setMessageAnswered: vi.fn(),
}));
vi.mock("@/services/github", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/services/github")>()),
  listRepos: vi.fn(),
}));
vi.mock("@/services/featured", () => ({ listFeatured: vi.fn(), saveFeatured: vi.fn() }));

function renderDashboard() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<h1>Tela de login</h1>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.mocked(onAuthChange).mockResolvedValue(() => undefined);
    vi.mocked(listMessages).mockReset();
    vi.mocked(listRepos).mockResolvedValue([]);
  });

  it("manda para o login quem não está autenticado e não busca mensagens", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    renderDashboard();

    expect(await screen.findByRole("heading", { name: "Tela de login" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Painel" })).not.toBeInTheDocument();
    expect(listMessages).not.toHaveBeenCalled();
  });

  it("também bloqueia quando não dá para conferir a sessão", async () => {
    vi.mocked(getSession).mockRejectedValue(new Error("fora do ar"));
    renderDashboard();

    expect(await screen.findByRole("heading", { name: "Tela de login" })).toBeVisible();
  });

  it("mostra as mensagens para o dono logado", async () => {
    vi.mocked(getSession).mockResolvedValue({ user: { id: "dono" } } as Session);
    vi.mocked(listMessages).mockResolvedValue([
      {
        id: "1",
        name: "Maria Silva",
        email: "maria@empresa.com",
        message: "Quero conversar sobre uma loja.",
        answered: false,
        created_at: "2026-10-31T12:00:00Z",
      },
    ]);
    renderDashboard();

    expect(await screen.findByRole("heading", { name: "Painel" })).toBeVisible();
    expect(await screen.findByText("Maria Silva")).toBeVisible();
    expect(screen.getByRole("button", { name: "Marcar como respondida" })).toBeEnabled();
  });
});
