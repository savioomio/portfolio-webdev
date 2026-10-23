// PreToolUse (Bash): bloqueia o que o CLAUDE.md proíbe, mesmo que a IA esqueça a regra.
// Sair com código 2 cancela o comando; o texto no stderr volta para a IA como motivo.
import { readFileSync } from "node:fs";

const { tool_input: toolInput } = JSON.parse(readFileSync(0, "utf8"));
const command = toolInput?.command ?? "";

const rules = [
  {
    pattern: /--no-verify\b/,
    reason:
      "Não pule os hooks do Git. Se o pre-commit ou o commit-msg recusou, corrija a causa e faça um commit novo (ADR 0003).",
  },
  {
    pattern: /\bgit\s+config\s+(--global|--system)\b/,
    reason:
      "Configure o Git só no repositório, nunca global: no PC do lab, a config global assinaria os commits de outras pessoas (docs/runbooks/setup-pc-do-lab.md).",
  },
  {
    pattern: /\bwrangler\b.*--name[=\s]+["']?savioomiodev\b/,
    reason:
      "O Worker savioomiodev é o site pessoal. Este projeto publica só no portfolio-webdev (docs/runbooks/deploy-cloudflare.md).",
  },
];

const blocked = rules.find(({ pattern }) => pattern.test(command));
if (blocked) {
  process.stderr.write(`Bloqueado pelo harness do projeto: ${blocked.reason}\n`);
  process.exit(2);
}
