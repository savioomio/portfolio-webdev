# Lighthouse

Medido em 31/10/2026 no site publicado, com Lighthouse 12 em modo mobile.

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 93 | 100 | 100 | 92 | 2,7 s | 0 ms | 0 |
| `/projetos` | 96 | 100 | 100 | 92 | 2,4 s | 0 ms | 0 |
| `/projetos/platao` | 95 | 100 | 100 | 92 | 2,6 s | 0 ms | 0 |
| `/projetos/faststore-login-extension` | 96 | 100 | 100 | 92 | 2,4 s | 0 ms | 0,037 |

![Relatório do Lighthouse na Home, no celular](./lighthouse-home-mobile.png)

O requisito 8 pede nota mínima de 80 em performance no mobile.

## Por que o SEO marca 92 no domínio

A Cloudflare injeta no `robots.txt` uma linha `Content-Signal`, que o Lighthouse não reconhece e aponta como inválida. Ela vem da configuração da zona, não deste repositório. No `wrangler dev`, sem essa injeção, as mesmas páginas marcam 100. O Google ignora diretivas desconhecidas.

## O que mudou a nota da Home

Medida no mesmo ambiente local, com o `wrangler dev`, a Home saiu de 50 para 95 com três mudanças:

- no celular, a cena 3D só baixa no primeiro gesto, com um desenho estático da folha até lá;
- os posters dos vídeos e o formulário só carregam quando chegam perto;
- cada rota sai pronta no build, então o texto aparece antes do JavaScript.

## Limite da medição

O Lighthouse não faz gestos, então ele mede a Home antes de o 3D entrar. Depois do primeiro gesto, o celular baixa cerca de 140 kB a mais em gzip e passa a renderizar a cena. Não foi testado em um aparelho físico.
