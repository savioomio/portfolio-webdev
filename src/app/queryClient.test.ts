import { QueryClient, type Query } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { shouldPersistQuery } from "./queryClient";

async function buildQuery(key: string, meta?: Record<string, unknown>) {
  const client = new QueryClient();
  await client.fetchQuery({ queryKey: [key], queryFn: () => "dado", meta });
  const query = client.getQueryCache().find({ queryKey: [key] }) as Query;
  client.unmount();
  return query;
}

describe("shouldPersistQuery", () => {
  it("guarda dados públicos no navegador", async () => {
    expect(shouldPersistQuery(await buildQuery("repos"))).toBe(true);
  });

  it("nunca guarda mensagens de visitantes", async () => {
    expect(shouldPersistQuery(await buildQuery("messages", { persist: false }))).toBe(false);
  });
});
