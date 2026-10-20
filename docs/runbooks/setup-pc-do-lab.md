# Runbook: preparar o PC do laboratório

Os PCs da FIAP são compartilhados (usuário Windows `labsfiap`) e não têm identidade do Git configurada. Sem este passo, os commits saem como "Laboratório FIAP".

## 1. Clonar e configurar o autor dos commits

```bash
git clone https://github.com/savioomio/portfolio-webdev.git
cd portfolio-webdev
git config user.name "savioomio"
git config user.email "saviopessoaafonso@gmail.com"
```

Configure **só no repositório** (sem `--global`): no PC compartilhado, uma config global assinaria os commits de outras pessoas com o seu nome.

Confira antes do primeiro commit:

```bash
git config user.email   # tem que mostrar saviopessoaafonso@gmail.com
```

## 2. Dependências e GitHub CLI

```bash
npm install
gh auth status          # se não estiver logado: gh auth login
```

## 3. Login no Cloudflare

O navegador padrão do lab quebra o OAuth (erro `request_forbidden: No CSRF value`). Gere o link sem abrir o navegador e abra no Chrome:

```bash
npx wrangler login --browser=false
```

Copie a URL impressa e, no PowerShell:

```powershell
Start-Process chrome '<URL copiada>'
```

Clique em **Allow**. O terminal confirma o login. Confira com `npx wrangler whoami`.

## 4. Ao sair do laboratório

O login do Wrangler fica salvo em `%APPDATA%\xdg.config\.wrangler`, e qualquer pessoa usando o PC conseguiria publicar na sua conta. Saia sempre:

```bash
npx wrangler logout
gh auth logout          # se não quiser deixar o GitHub logado
```
