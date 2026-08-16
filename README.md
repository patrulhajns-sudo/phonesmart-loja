# PHONESMART — Loja + Assistência Técnica

Site completo da PHONESMART: venda de celulares (iPhone 11 ao 15, Xiaomi/Redmi, Poco,
Motorola e Realme) + assistência técnica com orçamento online.

Feito com **Next.js (App Router) + PostgreSQL + Drizzle ORM + Tailwind CSS**.

---

## 📁 O que tem no projeto

| Rota | O que é |
|---|---|
| `/` | Home com destaque para os iPhones |
| `/produtos` | Catálogo com filtros (marca, condição, preço, busca) |
| `/produtos/[slug]` | Página do aparelho com ficha técnica |
| `/checkout` | Finalização do pedido (gera código `PS-XXXXX`) |
| `/pedido/[code]` | Comprovante do pedido |
| `/assistencia` | Serviços + orçamento de conserto (gera `OS-XXXXX`) |
| `/acompanhar` | Cliente consulta pedido ou conserto pelo código |
| `/sobre` e `/contato` | Institucional, endereço e horários |
| `/admin` | **Painel interno**: pedidos e ordens de serviço |
| `/api/health` | Healthcheck |

Arquivos que você mais vai mexer:

- `src/lib/site.ts` → **telefone, WhatsApp, endereço, e-mail, horários, Instagram**
- `src/lib/catalog.ts` → lista de aparelhos e serviços (o catálogo inicial)
- `src/db/schema.ts` → tabelas do banco

---

## 🚀 Como colocar no ar (passo a passo)

O caminho mais simples e barato: **Vercel** (hospedagem do site) + **Neon** (banco PostgreSQL).
Os dois têm plano gratuito e o processo leva ~15 minutos.

### Passo 1 — Enviar o código para o GitHub

O repositório Git **já está inicializado e com o primeiro commit feito**.
Conta GitHub: **patrulhajns-sudu**

1. Crie um repositório vazio em https://github.com/new com o nome `phonesmart`
   (NÃO marque "Add a README file")
2. Na pasta do projeto, rode:

```bash
git remote add origin https://github.com/patrulhajns-sudu/phonesmart.git
git push -u origin main
```

Quando o Git pedir a senha, cole um **Personal Access Token** do GitHub
(GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
→ Generate new token → marque o escopo `repo`).
A senha normal da conta não funciona mais para push desde 2021.

> O arquivo `.env` **não** vai para o GitHub (está no `.gitignore`). Isso é proposital:
> senhas nunca devem ir para o repositório.

### Passo 2 — Criar o banco de dados

1. Acesse **neon.tech** (ou supabase.com / railway.app) e crie uma conta grátis
2. Crie um projeto PostgreSQL
3. Copie a **connection string**, algo assim:
   `postgresql://usuario:senha@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

### Passo 3 — Criar as tabelas no banco novo

No seu computador, dentro da pasta do projeto:

```bash
npm install
DATABASE_URL="postgresql://...sua-url-do-neon..." npx drizzle-kit push --config=drizzle.config.prod.ts
```

Isso cria as 4 tabelas: `products`, `orders`, `order_items`, `repair_requests`.

> **O catálogo se popula sozinho.** Na primeira vez que alguém abrir o site, os 48
> aparelhos são inseridos automaticamente. Você não precisa importar nada.

### Passo 4 — Publicar na Vercel

1. Acesse **vercel.com** → *Add New* → *Project*
2. Importe o repositório do GitHub
3. Em **Environment Variables**, adicione as DUAS variáveis:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | a connection string do Passo 2 |
   | `ADMIN_PASSWORD` | uma senha forte sua, para entrar no `/admin` |

4. Clique em **Deploy**

Pronto. Em ~2 minutos o site estará no ar em `https://phonesmart.vercel.app`.

### Passo 5 — Domínio próprio (opcional)

1. Compre o domínio (ex.: `phonesmart.com.br` no Registro.br)
2. Na Vercel: *Settings* → *Domains* → adicione o domínio
3. A Vercel mostra os registros DNS; cole-os no painel do Registro.br
4. O certificado HTTPS é gerado automaticamente

---

## ✅ Checklist antes de divulgar

- [ ] Trocar telefone/WhatsApp/endereço em `src/lib/site.ts`
- [ ] Conferir os preços dos aparelhos que você realmente tem
- [ ] Fazer um pedido de teste e ver se ele aparece em `/admin`
- [ ] Enviar um orçamento de teste em `/assistencia`
- [x] Proteger a rota `/admin` com senha ✔ **já implementado**
- [ ] Definir uma senha forte em `ADMIN_PASSWORD` na Vercel

---

## 🔐 Painel administrativo

O `/admin` é protegido por senha.

- A senha vem da variável de ambiente **`ADMIN_PASSWORD`**
- Senha padrão (só para testes): `phonesmart2024`
- A sessão dura **8 horas** e fica num cookie `httpOnly` (não é lida por JavaScript)
- A senha **nunca** é gravada no cookie — só um hash SHA-256
- Botão **"Sair do painel"** no canto superior direito

> ⚠️ Troque a senha padrão antes de publicar. Na Vercel:
> *Settings → Environment Variables → `ADMIN_PASSWORD`*.

---

## 💰 Mexendo em preços e estoque

Os preços ficam em **centavos** (`179900` = R$ 1.899,00).

```sql
-- mudar preço e estoque
UPDATE products SET price = 179900, stock = 3 WHERE name = 'iPhone 11';

-- colocar na vitrine de destaques da home
UPDATE products SET featured = true WHERE name = 'iPhone 14 Pro';

-- marcar como esgotado (vira "Sob encomenda")
UPDATE products SET stock = 0 WHERE name = 'Moto G24';
```

Para adicionar modelos novos, edite `src/lib/catalog.ts` ou insira direto na tabela `products`.

---

## 💻 Rodando na sua máquina

```bash
npm install
cp .env.example .env      # e ajuste a DATABASE_URL
npx drizzle-kit push      # cria as tabelas no banco local
npm run dev               # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

---

## 🔗 Links prontos para divulgar

| Objetivo | Link |
|---|---|
| Só iPhones | `/produtos?brand=Apple` |
| Só seminovos | `/produtos?condition=Seminovo` |
| Até R$ 1.000 | `/produtos?maxPrice=1000` |
| Mais barato primeiro | `/produtos?sort=menor` |
| Orçamento de conserto | `/assistencia` |
