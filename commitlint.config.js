// Conventional Commits em português, com os mesmos tipos descritos no README e no CLAUDE.md.
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "chore", "refactor", "test", "perf"]],
  },
};
