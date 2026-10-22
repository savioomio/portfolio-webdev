# 0005. Deploy automático pelo GitHub Actions

- **Status:** Aceito
- **Data:** 2026-10-22
- **Research:** [research/deploy-automatico.md](../research/deploy-automatico.md)

## Contexto

O requisito 10 pede publicação automática, e o deploy na Cloudflare ainda era manual ([ADR 0002](./0002-hospedagem-cloudflare-workers.md)). A `main` é protegida: só recebe merge por PR com o check `Build de validacao` verde.

## Opções consideradas

- **Workers Builds:** a Cloudflare conecta o repositório e publica a cada push, com preview por branch. Por outro lado, o build fica configurado no painel e roda à parte do nosso CI.
- **GitHub Actions com `CLOUDFLARE_API_TOKEN`:** um job a mais no workflow existente, que só roda depois do build passar. Por outro lado, exige criar e guardar um token.

## Critério

1. Nunca publicar um commit que não passou no CI.
2. Configuração versionada no repositório.
3. Pouca configuração fora do repositório.

## Decisão

GitHub Actions. O job **Deploy na Cloudflare** roda em todo push na `main`, depende do `Build de validacao` e executa `npm run deploy` com o segredo `CLOUDFLARE_API_TOKEN`. O ID da conta fica no `wrangler.jsonc`, porque não é segredo.

## O que aceitamos perder

- Preview automático por PR.
- Um token para manter: se expirar ou vazar, ele precisa ser recriado ([runbook](../runbooks/deploy-cloudflare.md#token-da-cloudflare-criar-ou-trocar)).

## Consequências

- O deploy manual vira só emergência ou rollback.
- Cada merge aparece como um deploy no ambiente `producao` do GitHub, com o link do site.
