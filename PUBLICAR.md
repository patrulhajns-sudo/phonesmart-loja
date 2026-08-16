# 🚀 Colocar a PHONESMART no ar — SEM TERMINAL

Guia calmo, passo a passo. Tudo é feito pelo **navegador** e por **um programa
com botões**. Você não vai digitar nenhum comando.

Tempo total: ~20 minutos. Custo: R$ 0.

---

## ETAPA 1 — Ter a pasta do projeto no computador

Baixe/exporte a pasta do projeto e salve num lugar fácil de achar, por exemplo:

- **Windows:** `C:\Users\SeuNome\Documents\phonesmart`
- **Mac:** `/Users/SeuNome/Documents/phonesmart`

Abra a pasta e confirme que existem lá dentro:
`package.json`, `README.md`, `criar-tabelas.sql` e uma pasta `src`.

✅ Deu certo? Vá para a Etapa 2.

---

## ETAPA 2 — Enviar para o GitHub (com botões)

1. Baixe o **GitHub Desktop**: https://desktop.github.com
2. Instale e abra
3. Clique em **Sign in to GitHub.com** e entre com a conta **patrulhajns-sudu**
4. No menu de cima: **File → Add Local Repository**
5. Clique em **Choose...** e selecione a pasta `phonesmart` da Etapa 1
6. Clique em **Add Repository**
7. Aparece um botão azul **Publish repository** → clique
   - Name: `phonesmart`
   - Pode deixar marcado "Keep this code private"
8. Clique em **Publish Repository**

✅ Pronto. Seu código está em `github.com/patrulhajns-sudu/phonesmart`.

> Não precisa de token nem senha digitada. O GitHub Desktop cuida disso.

---

## ETAPA 3 — Criar o banco de dados (só navegador)

1. Acesse https://neon.tech e clique em **Sign up** (pode entrar com o GitHub)
2. Crie um projeto:
   - Project name: `phonesmart`
   - Region: escolha a mais próxima (ex.: US East)
3. Vai aparecer uma **Connection string** parecida com:
   ```
   postgresql://neondb_owner:senha123@ep-algo-123.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copie essa linha inteira** e guarde no bloco de notas. Você vai usar na Etapa 5.

---

## ETAPA 4 — Criar as tabelas (copiar e colar)

Ainda dentro do Neon:

1. No menu da esquerda, clique em **SQL Editor**
2. Abra o arquivo **`criar-tabelas.sql`** (está na pasta do projeto) com o
   Bloco de Notas
3. Selecione tudo (`Ctrl+A`), copie (`Ctrl+C`)
4. Cole na caixa do SQL Editor (`Ctrl+V`)
5. Clique no botão **Run**

Deve aparecer algo como "Success" / "4 statements executed".

✅ As 4 tabelas foram criadas.

> **Você NÃO precisa cadastrar os 48 celulares.** Eles entram sozinhos na
> primeira vez que alguém abrir o site.

---

## ETAPA 5 — Publicar o site (só navegador)

1. Acesse https://vercel.com
2. Clique em **Continue with GitHub** (entre com `patrulhajns-sudu`)
3. Clique em **Add New → Project**
4. Na lista aparece **phonesmart** → clique em **Import**
5. Abra a seção **Environment Variables** e adicione DUAS:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | a connection string que você copiou na Etapa 3 |
   | `ADMIN_PASSWORD` | uma senha forte sua (para entrar no `/admin`) |

6. Clique em **Deploy** e espere ~2 minutos

✅ Seu site está no ar em algo como `https://phonesmart.vercel.app`

---

## ETAPA 6 — Conferir

Abra seu novo endereço e teste:

- [ ] A home carrega com os celulares aparecendo
- [ ] `/produtos` mostra o catálogo
- [ ] `/admin` pede senha (use a que você definiu em `ADMIN_PASSWORD`)
- [ ] Faça um pedido de teste e veja se ele aparece no `/admin`

---

## E se eu quiser mudar algo depois?

1. Edite o arquivo no seu computador
2. Abra o **GitHub Desktop** → escreva um resumo embaixo à esquerda
3. Clique em **Commit to main** → depois em **Push origin**
4. A Vercel republica o site sozinha em ~1 minuto

---

## Domínio próprio (opcional, depois)

1. Compre `phonesmart.com.br` no https://registro.br (~R$ 40/ano)
2. Na Vercel: **Settings → Domains → Add** → digite o domínio
3. A Vercel mostra os registros DNS → copie e cole no painel do Registro.br
4. Em algumas horas o site responde no seu domínio, com cadeado HTTPS automático

---

## Deu erro? Os problemas mais comuns

### 🔑 Abriu uma janela/aba escrita "Connect to GitHub"

Isso NÃO é erro. É o Git pedindo para você fazer login, porque ele ainda não
sabe quem você é.

A janela tem 3 opções. Escolha a primeira:

| Opção | O que fazer |
|---|---|
| **Browser / Sign in with your browser** | ✅ Clique nesta. Abre o site do GitHub → faça login como `patrulhajns-sudu` → clique no botão verde **Authorize** → pode fechar o navegador |
| Device code | Só use se a do navegador falhar. Mostra um código para digitar em github.com/login/device |
| Token | Só use se você já tiver um Personal Access Token |

Depois de autorizar, volte para a janela de comandos: o envio continua sozinho.
No fim aparece algo como `main -> main`. Isso quer dizer que deu certo.

> Se pedir **usuário e senha digitados** no terminal: a "senha" NÃO é a senha da
> sua conta GitHub — é um Personal Access Token. Prefira sempre a opção do navegador.

---

### ❌ "failed to push some refs"

Mensagem completa:
```
error: failed to push some refs to 'https://github.com/patrulhajns-sudu/phonesmart.git'
hint: Updates were rejected because the remote contains work that
hint: you do not have locally.
```

**Causa:** o repositório foi criado no GitHub **com** o "Add a README file"
marcado. Então lá existe 1 arquivo que não existe aqui, e o Git trava por
segurança para não apagar nada.

**Solução (2 comandos, testados):**

```bash
git pull origin main --allow-unrelated-histories --no-rebase
git push origin main
```

Se abrir uma tela azul/preta pedindo mensagem de merge, aperte `Ctrl+X`
(ou digite `:wq` e Enter) para sair e continuar.

Nada é perdido: o README do GitHub e o seu projeto se juntam.

**Alternativa sem comando:** apague o repositório no GitHub
(Settings → Danger Zone → Delete this repository), crie de novo
**SEM** marcar "Add a README file", e publique pelo GitHub Desktop.

---

| Erro | Causa | Solução |
|---|---|---|
| Site abre mas sem produtos | `DATABASE_URL` errada ou tabelas não criadas | Refaça as Etapas 4 e 5 |
| "Senha incorreta" no /admin | `ADMIN_PASSWORD` não foi criada na Vercel | Settings → Environment Variables → adicione → Redeploy |
| Mudei a variável e não mudou nada | Vercel só aplica em novo deploy | Aba **Deployments** → botão `...` → **Redeploy** |
| `Authentication failed` no push | GitHub não aceita mais senha comum | Use o GitHub Desktop, ou gere um Personal Access Token |
