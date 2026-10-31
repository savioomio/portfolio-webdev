# 0010. Backend em Supabase e e-mail pelo Formspree

- **Status:** Aceito
- **Data:** 2026-10-31
- **Research:** [research/backend-e-email.md](../research/backend-e-email.md)

## Contexto

O site é estático. Os requisitos 4 e 5 pedem salvar mensagens, enviar e-mail ao dono, login e escolha de destaques.

## Opções consideradas

- **Backend:** Supabase, Firebase, Appwrite, PocketBase.
- **E-mail:** EmailJS, Formspree, Resend com Edge Function.

## Decisão

**Supabase** com Auth e Postgres. O cadastro público fica desligado, então `authenticated` é só o dono. Com RLS, o visitante só insere mensagem, só o dono lê e altera, e todos leem os destaques. O esquema está em [`supabase/schema.sql`](../../supabase/schema.sql).

**Formspree** para o e-mail, chamado pelo front junto com o insert. A mensagem só dá erro se os dois caminhos falharem.

A Home não carrega o SDK do Supabase: o formulário e os destaques usam `fetch` direto na API do banco. O SDK só entra no login e no dashboard.

## O que aceitamos perder

- **Spam:** a pesquisa recomendava Edge Function com Turnstile, que soma sete passos manuais. Ficamos com RLS, `CHECK` de tamanho, campo-armadilha e o filtro do Formspree. Um robô determinado ainda consegue gravar linhas no banco.
- **E-mail e banco separados:** a mensagem pode ficar só em um dos dois, se o outro cair.
- **Cota:** 50 envios por mês no plano gratuito do Formspree.
- **Pausa:** o Supabase pausa o projeto após 7 dias sem atividade suficiente. Nesse caso os destaques caem para os repositórios recentes e o formulário ainda envia o e-mail.
