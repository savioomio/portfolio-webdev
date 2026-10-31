import { describe, expect, it } from "vitest";
import { pageNameFor } from "./pages";

describe("pageNameFor", () => {
  it.each([
    ["/", "Home"],
    ["/projetos", "Projects"],
    ["/projetos/", "Projects"],
    ["/projetos/platao", "ProjectDetail"],
    ["/links", "Links"],
    ["/login", "Login"],
    ["/dashboard", "Dashboard"],
    ["/qualquer-coisa", "NotFound"],
  ])("%s abre %s", (path, page) => {
    expect(pageNameFor(path)).toBe(page);
  });
});
