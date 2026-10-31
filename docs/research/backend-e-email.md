# R02. Backend (login e banco) e envio de e-mail

- **Data:** 2026-10-31
- **Requisitos atendidos:** 4, 5

## Critérios

1. Login pronto.
2. Regras de acesso no banco: visitante só envia mensagem, só o dono lê.
3. Plano gratuito, inclusive pausa de projeto inativo.
4. Funcionar com front estático na Cloudflare.
5. Quantidade de contas e passos do dono.

## Opções: backend

### Supabase

- Prós: Auth com cadastro público desligável; Postgres com RLS; a atividade da API conta contra a pausa.
- Contras: pausa após 7 dias sem atividade suficiente; tabelas novas podem exigir `GRANT` explícito; SDK pesado para a Home.
- Plano gratuito: 2 projetos ativos, 50 mil usuários ativos, 500 MB de banco, 5 GB de tráfego.
- Peso: 58,5 kB em gzip (medido no bundlejs).

### Firebase

- Prós: Auth pronto, Security Rules, plano Spark generoso.
- Contras: Cloud Functions não existe no plano gratuito, e o SDK é o mais pesado.
- Peso: 163 kB medidos (`app`, `auth` e `firestore`).

### Appwrite

- Prós: Auth, Functions e permissões por linha.
- Contras: a pausa depende de atividade no Console, e o tráfego da API não conta, segundo resposta da equipe em fórum; projetos pausados são apagados após 90 dias.
- Peso: 31,1 kB medidos.

### PocketBase

- Prós: API rules cobrem o caso; 11,2 kB medidos no SDK.
- Contras: precisa de servidor persistente com disco, e o dono cuida de TLS, SMTP e backup.

## Opções: e-mail

| | Plano gratuito | Observação |
| --- | --- | --- |
| EmailJS | 200 requisições/mês | Roda no front; exige ligar a conta de e-mail |
| Formspree | 50 envios/mês | Chamada simples do front, com filtro de spam; não alimenta o banco |
| Resend via Edge Function | 3.000/mês | Chave fora do front; exige função, segredo e domínio verificado |

## Chave pública

Projetos novos do Supabase usam a publishable key (`sb_publishable_...`). A documentação diz que ela é segura para expor no front: ela identifica a aplicação, e quem protege os dados é o RLS. A secret key ignora o RLS e nunca vai ao navegador.

## Spam

O CAPTCHA do Supabase Auth cobre login e cadastro, não as tabelas. O caminho mais forte é uma Edge Function com Turnstile, mas soma sete passos manuais do dono. O caminho simples é o insert direto com RLS, `CHECK` de tamanho nos campos e um campo-armadilha para robôs.

## Comparação

| Critério | Supabase | Firebase | Appwrite | PocketBase |
| --- | --- | --- | --- | --- |
| Login pronto | Sim | Sim | Sim | Sim |
| Regra no banco | RLS | Security Rules | Permissões | API rules |
| Pausa | 7 dias; API conta | Não confirmado na fonte | 7 dias; depende do Console | Não se aplica |
| Front estático | Sim | Sim | Sim | Exige servidor próprio |
| SDK medido | 58,5 kB | 163 kB | 31,1 kB | 11,2 kB |

## Recomendação

Supabase (Auth, Postgres e RLS) com Formspree. A pesquisa apontou Resend com Edge Function e Turnstile como o caminho mais forte contra spam, mas com muito mais passos a 3 dias da entrega. Vira o [ADR 0010](../adr/0010-backend-supabase-e-formspree.md).

## Fontes

- [Supabase: API keys](https://supabase.com/docs/guides/api/api-keys)
- [Supabase: preços](https://supabase.com/pricing)
- [Supabase: pausa de projetos](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Supabase: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: tabelas não expostas automaticamente](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)
- [Firebase: preços](https://firebase.google.com/pricing)
- [Appwrite: plano Free](https://appwrite.io/docs/advanced/platform/free)
- [PocketBase em produção](https://pocketbase.io/docs/going-to-production/)
- [EmailJS: preços](https://www.emailjs.com/pricing/)
- [Formspree: planos](https://formspree.io/plans)
- [Resend: preços](https://resend.com/pricing)
- [Turnstile: validação no servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [bundlejs](https://bundlejs.com/), ferramenta de medição, não é documentação oficial
