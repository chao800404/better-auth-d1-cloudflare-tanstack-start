# TanStack Start + Better Auth + Cloudflare D1 Template

<div align="center">

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chao800404/better-auth-d1-cloudflare-tanstack-start)
[![Use this template](https://img.shields.io/badge/Use_this_template-2ea44f?style=for-the-badge&logo=github)](https://github.com/chao800404/better-auth-d1-cloudflare-tanstack-start/generate)

**The Ultimate Zero-Config Starter** for building full-stack apps on Cloudflare.

</div>

---

## ✨ Why this template?

Most Cloudflare D1 templates require complex manual setup (creating databases, binding resources, running initial SQL migrations...).
**This template eliminates all that friction.**

- 🚀 **One-Click Deploy**: Fully automated infrastructure setup via Cloudflare's official Deploy Button.
- 🔄 **Auto-Init Database**: **Zero manual setup required.** The application automatically detects missing tables and initializes the schema on the first request (Runtime Migration).
- 🔐 **Better Auth Pre-configured**: Complete authentication system (Email/Password, Session management) ready out-of-the-box.
- ⚡ **TanStack Start**: Modern React framework with SSR, streaming, and type-safe routing.

## ⚡ Quick Start (Deploy)

**Just click the "Deploy to Cloudflare Workers" button above.**

Cloudflare will guide you to:

1. **Fork** this repository.
2. **Automatically create** the D1 Database (`better-auth-db`) and KV Namespace.
3. **Deploy** the worker.

**👉 Verification:**
Once deployed, simply visit your new website URL. The database tables will be **automatically created** instantly upon your first visit. You can start registering users right away!

> **Note:** For production security, you should rotate the `BETTER_AUTH_SECRET` later using `wrangler secret put BETTER_AUTH_SECRET`.

---

## 💻 Local Development

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd better-auth-d1-cloudflare-tanstack-start
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

_Note: You only need to fill in Cloudflare credentials in `.env` if you plan to run `pnpm db:migrate:prod` locally._

### 3. Start Dev Server

```bash
pnpm dev
```

The app will run at `http://localhost:3000` using a local D1 emulator.

---

## 🗄️ Database Management (Drizzle ORM)

### Modify Schema

Edit schema files in `src/db/`. The main auth schema is in `src/db/auth.schema.ts`.

### Create Migrations

After modifying the schema, generate SQL migration files:

```bash
pnpm db:generate
```

### Apply Migrations

**Local Development:**

```bash
pnpm db:migrate:dev
```

**Production:**
Since this project features **Runtime Initialization** (in `src/db/init.ts`), new deployments on fresh databases are automatic.
For **updating** an existing production database with new columns/tables, use:

```bash
pnpm db:migrate:prod
```

---

## 📂 Project Structure

```
├── .cloudflare/        # Cloudflare deploy configuration
├── drizzle/            # SQL migration files
├── src/
│   ├── auth/           # Better Auth setup
│   ├── db/             # Drizzle schema & init logic
│   ├── routes/         # TanStack Router file-system routing
│   ├── server/         # Server-side functions
│   └── entry-server.tsx
├── wrangler.jsonc      # Cloudflare Workers config
└── package.json
```

## 📚 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

## 📄 License

MIT
