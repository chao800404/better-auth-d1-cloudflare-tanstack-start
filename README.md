# TanStack Start + Better Auth + Cloudflare Template

<div align="center">

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chao800404/better-auth-cloudflare-tanstack-start)
[![Use this template](https://img.shields.io/badge/Use_this_template-2ea44f?style=for-the-badge&logo=github)](https://github.com/chao800404/better-auth-cloudflare-tanstack-start/generate)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9.0.0-orange.svg)

</div>

---

A **TanStack Start** template based on [better-auth-cloudflare](https://github.com/zpg6/better-auth-cloudflare), integrated with Better Auth authentication system and Cloudflare Workers deployment.

## ✨ Features

- 🚀 **TanStack Start** - Modern full-stack React framework
- 🔐 **Better Auth** - Powerful authentication system with multiple login methods
  - Anonymous authentication
  - Email/Password authentication
  - Session management with geolocation tracking
- ☁️ **Cloudflare Workers** - Edge computing deployment
- 🗄️ **Cloudflare D1** - Serverless SQLite database
- 💾 **Cloudflare KV** - Key-value storage for rate limiting
- 📦 **Cloudflare R2** - Object storage for file uploads (optional)
- 🎨 **Tailwind CSS v4** - Latest version of the CSS framework
- 🔧 **Drizzle ORM** - Type-safe database ORM
- ⚡ **Vite** - Fast build tool

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Cloudflare account (for deployment)

## ⚡ Quick Deploy

Choose your preferred deployment method:

### Option 1: One-Click Deploy to Cloudflare (Fastest) ⚡

Click the button below to deploy directly to Cloudflare Workers:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chao800404/better-auth-cloudflare-tanstack-start)

<details>
<summary>📊 What happens when you click? (Click to expand)</summary>

<br>

![Deployment Workflow](./public/deploy-workflow.png)

**The one-click deploy will:**

1. **Fork Repository** 🍴

   - Creates a copy of this template in your GitHub account
   - You maintain full control over the code

2. **Connect to Cloudflare** 🔗

   - Links your GitHub repository to Cloudflare
   - Sets up automatic deployments

3. **Create Resources** 📦

   - D1 Database (`better-auth-db`) - For user data and sessions
   - KV Namespace (`better-auth-kv`) - For rate limiting
   - R2 Bucket (`better-auth-r2`) - For file uploads

4. **Build & Deploy** 🚀

   - Installs dependencies
   - Builds your application
   - Deploys to Cloudflare's global network

5. **Live in Minutes** ✅
   - Your app is live at `https://your-worker.workers.dev`
   - Automatic deployments on every push to `main`

**Time to deploy**: ~3-5 minutes ⏱️

See [detailed deployment guide](./.cloudflare/ONE_CLICK_DEPLOY.md) for more information.

</details>

### Option 2: Use as GitHub Template

Click to create a new repository from this template:

[![Use this template](https://img.shields.io/badge/Use_this_template-2ea44f?style=for-the-badge&logo=github)](https://github.com/chao800404/better-auth-cloudflare-tanstack-start/generate)

Then follow the [manual setup instructions](#-quick-start) below.

### Option 3: Clone and Deploy Manually

```bash
# Clone the repository
git clone https://github.com/chao800404/better-auth-cloudflare-tanstack-start.git
cd better-auth-cloudflare-tanstack-start

# Setup and deploy (see Quick Start below)
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables Setup

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Edit the `.env` file with your values:

```env
# Cloudflare D1 Configuration (for drizzle-kit migrations)
# Get your Account ID from: https://dash.cloudflare.com/ (right sidebar)
CLOUDFLARE_ACCOUNT_ID=your_account_id_here

# Get Database ID after creating D1 database (see step 3)
CLOUDFLARE_DATABASE_ID=your_database_id_here

# Create API Token at: https://dash.cloudflare.com/profile/api-tokens
# Required permissions: D1:Edit, Workers:Edit
CLOUDFLARE_D1_TOKEN=your_d1_api_token_here

# Better Auth Configuration
# Generate a random secret: openssl rand -base64 32
BETTER_AUTH_SECRET=your_secret_here
```

### 3. Configure Cloudflare Resources

#### 3.1 Create D1 Database

```bash
# Create a new D1 database
pnpm wrangler d1 create your-database-name

# Copy the returned database_id
```

#### 3.2 Create KV Namespace

```bash
# Create a new KV namespace for rate limiting
pnpm wrangler kv:namespace create KV

# Copy the returned id
```

#### 3.3 Create R2 Bucket (Optional - for file uploads)

```bash
# Create a new R2 bucket for file storage
pnpm wrangler r2 bucket create your-r2-bucket-name
```

#### 3.4 Update `wrangler.jsonc`

Replace the placeholder values with your actual IDs:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DATABASE",
      "database_name": "your-database-name", // Your D1 database name
      "database_id": "YOUR_D1_DATABASE_ID", // From step 3.1
      "migrations_dir": "drizzle"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "YOUR_KV_NAMESPACE_ID" // From step 3.2
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "your-r2-bucket-name" // From step 3.3 (optional)
    }
  ]
}
```

**Note**: If you don't need file upload functionality, you can remove the `r2_buckets` section.

### 4. Database Setup

```bash
# Generate Better Auth database schema
pnpm auth:generate

# Format the generated schema
pnpm auth:format

# Generate migration files
pnpm db:generate

# Apply migrations (local development)
pnpm db:migrate:dev
```

### 5. Local Development

```bash
pnpm dev
```

The application will start at `http://localhost:3000`.

## 🗄️ Database Management

### Adding Custom Schemas

The project uses a unified schema approach. To add your own tables:

1. **Create a new schema file** (e.g., `src/db/posts.schema.ts`):

```typescript
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./auth.schema";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
```

2. **Import and add to `src/db/schema.ts`**:

```typescript
import * as authSchema from "./auth.schema";
import { posts } from "./posts.schema";

export const schema = {
  ...authSchema,
  posts, // Add your custom tables here
} as const;
```

3. **Generate and apply migrations**:

```bash
pnpm db:generate
pnpm db:migrate:dev
```

See `src/db/example.schema.ts` for more examples.

### Update Database Schema

```bash
# Update Better Auth schema (generate + format)
pnpm auth:update
```

### Database Migrations

```bash
# Generate migration files
pnpm db:generate

# Apply migrations (local development)
pnpm db:migrate:dev

# Apply migrations (production)
pnpm db:migrate:prod
```

### Database Management Interface

```bash
# Open Drizzle Studio (local)
pnpm db:studio:dev

# Open Drizzle Studio (production)
pnpm db:studio:prod
```

## 🏗️ Build & Deploy

### Build for Production

```bash
pnpm build
```

### Local Preview

```bash
pnpm preview
```

### Deploy to Cloudflare

```bash
pnpm deploy
```

## 📁 Project Structure

```
.
├── src/
│   ├── auth/           # Better Auth configuration
│   ├── components/     # React components
│   ├── db/            # Database schema and configuration
│   ├── routes/        # TanStack Router routes
│   └── styles.css     # Global styles
├── drizzle/           # Database migration files
├── public/            # Static assets
├── wrangler.jsonc     # Cloudflare Workers configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Available Commands

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `pnpm dev`             | Start development server                   |
| `pnpm build`           | Build for production                       |
| `pnpm preview`         | Preview production build                   |
| `pnpm deploy`          | Deploy to Cloudflare                       |
| `pnpm test`            | Run tests                                  |
| `pnpm cf-typegen`      | Generate Cloudflare Workers types          |
| `pnpm auth:update`     | Update Better Auth schema                  |
| `pnpm db:generate`     | Generate database migrations               |
| `pnpm db:migrate:dev`  | Apply migrations (local)                   |
| `pnpm db:migrate:prod` | Apply migrations (production)              |
| `pnpm db:studio:dev`   | Open database management interface (local) |

## 🔐 Better Auth Configuration

Better Auth is pre-configured with support for:

- Email/Password authentication
- OAuth providers (extensible)
- Session management
- User management

See `src/auth/index.ts` for detailed configuration.

## ☁️ Cloudflare Configuration

### Create D1 Database

```bash
# Create a new D1 database
wrangler d1 create your-database-name

# Copy the returned database_id to wrangler.jsonc
```

### Create KV Namespace

```bash
# Create a new KV namespace
wrangler kv:namespace create KV

# Copy the returned id to wrangler.jsonc
```

### Configure Secrets

```bash
# Set Better Auth Secret
wrangler secret put BETTER_AUTH_SECRET
```

## 🔄 GitHub Actions Auto-Deploy (Optional)

This template includes **multiple deployment workflow options** for automatic deployment to Cloudflare Workers.

### 🚀 Quick Setup (Recommended)

#### 1. **Automated Resource Setup**

Run the setup script to automatically create all Cloudflare resources:

```bash
# Set your Cloudflare credentials
export CLOUDFLARE_API_TOKEN="your_api_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"

# Optional: Customize resource names
export D1_DATABASE_NAME="my-app-db"
export KV_NAMESPACE_NAME="my-app-kv"
export R2_BUCKET_NAME="my-app-r2"

# Run the setup script
./scripts/setup-cloudflare.sh
```

This script will:

- ✅ Create D1 database (if not exists)
- ✅ Create KV namespace (if not exists)
- ✅ Create R2 bucket (if not exists)
- ✅ Update `wrangler.jsonc` with correct IDs
- ✅ Generate and apply database migrations

#### 2. **Configure GitHub Secrets**

Add these secrets in your repository settings (`Settings` → `Secrets and variables` → `Actions`):

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token ([Create one here](https://dash.cloudflare.com/profile/api-tokens))
  - Required permissions: `Workers Scripts:Edit`, `D1:Edit`, `Account Settings:Read`
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`

#### 3. **Enable Auto-Deploy Workflow**

Choose one of the workflow options:

**Option A: Simple Deploy** (Recommended - assumes resources already exist)

```bash
mv .github/workflows/deploy.yml.example .github/workflows/deploy.yml
```

**Option B: Full Auto-Deploy** (Creates resources if they don't exist)

```bash
mv .github/workflows/deploy-full.yml.example .github/workflows/deploy.yml
```

#### 4. **Deploy**

Push to the `main` branch to trigger automatic deployment:

```bash
git add .
git commit -m "Enable auto-deploy"
git push origin main
```

Or trigger manually from GitHub Actions tab.

---

### 📋 Workflow Comparison

| Feature         | Simple Deploy                   | Full Auto-Deploy             |
| --------------- | ------------------------------- | ---------------------------- |
| **Setup**       | Run `setup-cloudflare.sh` first | Automatic resource creation  |
| **Speed**       | ⚡ Faster                       | 🐢 Slower (checks resources) |
| **Reliability** | ✅ More reliable                | ⚠️ May fail on first run     |
| **Best for**    | Production                      | Experimentation              |

---

### 🛠️ Manual Deployment

If you prefer manual control:

```bash
# Build and deploy
pnpm deploy

# Or step by step
pnpm build
pnpm wrangler deploy
```

---

### 🔧 Troubleshooting

**Issue: "Resource already exists" error**

- Use the simple deploy workflow instead
- Or delete existing resources first

**Issue: "Unauthorized" error**

- Check your `CLOUDFLARE_API_TOKEN` has correct permissions
- Verify `CLOUDFLARE_ACCOUNT_ID` is correct

**Issue: Migration fails**

- Run migrations manually: `pnpm db:migrate:prod`
- Check D1 database is accessible

## 📚 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Testing**: [Vitest](https://vitest.dev/)

## 📖 Learning Resources

- [TanStack Start Documentation](https://tanstack.com/start)
- [Better Auth Documentation](https://better-auth.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

## 🙏 Credits

This template is based on [better-auth-cloudflare](https://github.com/zpg6/better-auth-cloudflare).

## 📄 License

MIT
