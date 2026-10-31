# Backend: Supabase e Formspree

Como recriar o backend do zero. O projeto atual é o `portfolio-webdev`, na conta do Savio.

## Supabase

1. Crie um projeto em <https://supabase.com/dashboard>, no plano Free.
2. Em **SQL Editor**, cole [`supabase/schema.sql`](../../supabase/schema.sql) e clique em **Run**.
3. Em **Authentication > Users > Add user > Create new user**, crie o dono com e-mail e senha e marque **Auto Confirm User**.
4. Em **Authentication > Sign In / Providers**, desligue **Allow new users to sign up** e salve. Sem isso, qualquer pessoa cria conta e vira `authenticated`.
5. Em **Project Settings > API Keys**, copie a URL e a publishable key. Nunca use a secret key no front.

Pausa: o plano Free pausa o projeto depois de 7 dias sem atividade suficiente. Para reativar, entre no painel e clique em **Restore**.

## Formspree

1. Crie uma conta em <https://formspree.io> e confirme o e-mail.
2. Clique em **New form** e use o e-mail do dono.
3. Copie o final do link `https://formspree.io/f/xxxxx`.

## Variáveis

- **Local:** copie `.env.example` para `.env` e preencha.
- **Deploy:** cadastre `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e `VITE_FORMSPREE_ID` em **Settings > Secrets and variables > Actions > Variables** no GitHub. São valores públicos, e o workflow lê como `vars`.

## Conferir

1. Envie uma mensagem pelo site: ela chega por e-mail e aparece no dashboard.
2. Consulte `messages` só com a chave pública: a resposta deve ser uma lista vazia, porque o RLS esconde as linhas.
