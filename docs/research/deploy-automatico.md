# R08. Deploy automático na Cloudflare: Workers Builds ou GitHub Actions?

- **Data:** 2026-10-22
- **Status:** fechada, virou o [ADR 0005](../adr/0005-deploy-automatico-github-actions.md)
- **Requisitos atendidos:** 10, 11

## Contexto

O requisito 10 pede publicação automática. Até aqui, o deploy era manual (`npm run deploy`) depois de cada merge ([runbook](../runbooks/deploy-cloudflare.md)). A `main` é protegida e só recebe merge com o check `Build de validacao` verde (T03).

## Critérios

1. Nunca publicar um commit que não passou no CI.
2. Configuração versionada no repositório, que dá para mostrar no vídeo.
3. Pouca coisa para configurar fora do repositório.
4. Plano gratuito.

## Opções

### A. Workers Builds (CI da própria Cloudflare)

O repositório é conectado ao Worker pelo painel, e cada push gera um build e um deploy.

- Prós: nenhum segredo para guardar no GitHub; preview automático para branches que não são a de produção, com a URL na seção **Previews** do Worker.
- Contras: comando de build e de deploy configurados no painel (**Settings > Builds**), fora do repositório; o build roda à parte do nosso CI, e a documentação não diz que ele espera outros checks; mais uma conexão com o GitHub para autorizar no painel.

### B. GitHub Actions com `CLOUDFLARE_API_TOKEN`

Um job a mais no workflow que já existe, rodando `npm run deploy` com um token da Cloudflare guardado como segredo do repositório.

- Prós: o job depende do `Build de validacao` (`needs`), então nada que falhou no CI é publicado; tudo em `.github/workflows/deploy.yml`; usa a mesma versão do Wrangler do `package-lock.json` e o mesmo script do deploy manual.
- Contras: um token para criar e guardar; preview por PR não vem pronto.

## Comparação

| Critério | A. Workers Builds | B. GitHub Actions |
| --- | --- | --- |
| Só publica o que passou no CI | não garantido | sim (`needs: build`) |
| Configuração no repositório | parcial (o build fica no painel) | total |
| Configuração fora do repositório | conectar o GitHub no painel | criar um token e um segredo |
| Preview por branch | sim | não |
| Plano gratuito | sim | sim |

## Recomendação

B. Os dois primeiros critérios pesam mais do que o preview por branch, que o projeto não usa: só há um desenvolvedor e cada PR é conferido localmente antes do merge.

## Fontes

- [GitHub Actions · Cloudflare Workers docs](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
- [Workers Builds · Cloudflare Workers docs](https://developers.cloudflare.com/workers/ci-cd/builds/)
