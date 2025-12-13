# TanStack Start + Better Auth + Cloudflare Template

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

## 🔄 GitHub Actions Auto-Deploy

This template includes a GitHub Actions workflow for automatic deployment to Cloudflare Workers.

Add the following Secrets in your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

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
