// SessionStart: no PC do lab (Windows, usuário labsfiap), que apaga tudo ao desligar, diz à IA
// o que falta do setup. O que este script imprime entra no contexto da sessão. No Mac, não faz nada.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir, userInfo } from "node:os";
import { join } from "node:path";

if (process.platform !== "win32" || userInfo().username !== "labsfiap") process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const runbook = "docs/runbooks/setup-pc-do-lab.md";

function gitEmail() {
  try {
    return execFileSync("git", ["-C", projectDir, "config", "user.email"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

function hasChromeMcp() {
  try {
    const config = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf8"));
    return Boolean(config.mcpServers?.["chrome-devtools"]);
  } catch {
    return false;
  }
}

const wranglerLogin = join(
  process.env.APPDATA ?? "",
  "xdg.config",
  ".wrangler",
  "config",
  "default.toml",
);

const missing = [
  gitEmail() !== "saviopessoaafonso@gmail.com" && "autor dos commits (passo 1)",
  !existsSync(join(projectDir, "node_modules")) && "npm install (passo 2)",
  !existsSync(wranglerLogin) && "login no Cloudflare (passo 3)",
  !hasChromeMcp() && "MCP do Chrome (passo 4)",
].filter(Boolean);

console.log(
  missing.length
    ? `PC do lab: falta ${missing.join(", ")}. Siga o ${runbook} antes da tarefa, explicando cada comando.`
    : `PC do lab: setup completo. Antes de sair: git push de tudo, npx wrangler logout e desligar a depuração remota do Chrome (${runbook}, passo 5).`,
);
