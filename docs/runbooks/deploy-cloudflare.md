# Runbook: deploy na Cloudflare

Publica o build em `https://webdev.savioomiodev.com.br` (Worker `portfolio-webdev`). Decisão em [ADR 0002](../adr/0002-hospedagem-cloudflare-workers.md).

> **Atenção:** o Worker `savioomiodev` é o **site pessoal**. Antes de qualquer deploy, confira que `wrangler.jsonc` tem `"name": "portfolio-webdev"`.

## Quando usar

Até a T07 (deploy automático) ficar pronta, use este runbook depois de cada merge na `main`. Depois dela, só em emergência ou para fazer rollback.

## Pré-requisitos

- Dependências instaladas: `npm install`.
- Wrangler logado na conta `saviopessoaafonso@gmail.com`. Confira com `npx wrangler whoami`; se não estiver logado, siga o [setup do PC do lab](./setup-pc-do-lab.md#3-login-no-cloudflare).
- Estar na `main` atualizada: `git switch main && git pull`.

## Passos

```bash
npm run deploy          # = npm run build && wrangler deploy
```

A saída termina com as URLs e o `Current Version ID`. Anote o ID se for precisar de rollback.

## Verificação

```bash
for p in / /links /projetos/teste /rota-que-nao-existe; do
  printf "%s -> " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://webdev.savioomiodev.com.br$p"
done
```

Todas devem responder `200`: o Worker devolve o `index.html` e o React Router decide a página (inclusive o 404). Depois, abra o site no navegador e confira a mudança.

## Rollback

```bash
npx wrangler deployments list     # lista as versões publicadas
npx wrangler rollback <version-id> # volta para uma versão anterior
```

## Configuração envolvida

| Arquivo | Papel |
| --- | --- |
| `wrangler.jsonc` | Nome do Worker, pasta `dist/`, fallback de SPA (`not_found_handling`) e domínio (`routes`) |
| `public/_headers` | Cache: `assets/` e `fonts/` imutáveis; imagens por 7 dias; HTML sempre revalida |
| `package.json` | Script `deploy` |

## Problemas conhecidos

- **`wrangler login` falha com `request_forbidden` / CSRF:** o login aconteceu no meio do fluxo do OAuth, no navegador padrão. Use o fluxo com o Chrome do [setup](./setup-pc-do-lab.md#3-login-no-cloudflare).
- **URL `*.workers.dev` com erro de SSL logo após criar o Worker:** o certificado demora alguns minutos para ser emitido. O domínio próprio não é afetado.
