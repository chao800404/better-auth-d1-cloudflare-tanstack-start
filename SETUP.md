# 🚀 Setup Guide

This guide will walk you through setting up the project from scratch.

## Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- A Cloudflare account (free tier is sufficient)

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd better-auth-cloudflare-tanstack-start

# Install dependencies
pnpm install
```

### 2. Get Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Look at the right sidebar - you'll see your **Account ID**
3. Copy it for later use

### 3. Create Cloudflare API Token

1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Add these permissions:
   - **Account** → **D1** → **Edit**
   - **Account** → **Workers Scripts** → **Edit**
5. Click "Continue to summary" → "Create Token"
6. **Copy the token immediately** (you won't see it again!)

### 4. Create D1 Database

```bash
# Create a new D1 database
pnpm wrangler d1 create my-auth-database

# You'll see output like:
# ✅ Successfully created DB 'my-auth-database'!
#
# [[d1_databases]]
# binding = "DATABASE"
# database_name = "my-auth-database"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Copy the database_id
```

### 5. Create KV Namespace

```bash
# Create KV namespace for rate limiting
pnpm wrangler kv:namespace create KV

# You'll see output like:
# ✅ Success!
# Add the following to your wrangler.jsonc:
# { binding = "KV", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }

# Copy the id
```

### 6. Create R2 Bucket (Optional)

Only needed if you want file upload functionality:

```bash
# Create R2 bucket
pnpm wrangler r2 bucket create my-auth-files

# You'll see:
# ✅ Created bucket 'my-auth-files'
```

### 7. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your favorite editor
```

Fill in:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id_from_step_2
CLOUDFLARE_DATABASE_ID=your_database_id_from_step_4
CLOUDFLARE_D1_TOKEN=your_api_token_from_step_3
BETTER_AUTH_SECRET=generate_with_openssl_rand_base64_32
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

### 8. Update wrangler.jsonc

Edit `wrangler.jsonc` and replace placeholders:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DATABASE",
      "database_name": "my-auth-database", // Your database name
      "database_id": "YOUR_DATABASE_ID_FROM_STEP_4", // From step 4
      "migrations_dir": "drizzle"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "YOUR_KV_ID_FROM_STEP_5" // From step 5
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "my-auth-files" // From step 6 (optional)
    }
  ]
}
```

**Note**: If you skipped step 6, remove the entire `r2_buckets` section.

### 9. Setup Database

```bash
# Generate Better Auth schema
pnpm auth:generate

# Format the generated schema
pnpm auth:format

# Generate migration files
pnpm db:generate

# Apply migrations to local D1
pnpm db:migrate:dev
```

### 10. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` - you should see the login page!

## Testing the Setup

1. Click "Login Anonymously" on the home page
2. You should be redirected to the dashboard
3. Check the "Geolocation" tab to see your location data
4. Try uploading a file in the "File Upload" tab (if R2 is configured)

## Troubleshooting

### "Cannot read properties of undefined (reading 'put')"

This means R2 is not configured. Either:

- Complete step 6 and update `wrangler.jsonc`
- Or remove the `r2_buckets` section from `wrangler.jsonc`

### "Failed query: select ... from users"

Database migrations haven't been applied. Run:

```bash
pnpm db:migrate:dev
```

### "404 Not Found" on /api/auth/\*

Check that:

1. `BETTER_AUTH_SECRET` is set in `.env`
2. Development server is running
3. No port conflicts (default is 3000)

### Port Already in Use

Kill the process using the port:

```bash
lsof -ti:3000 | xargs kill -9
```

## Next Steps

- Read the [README.md](./README.md) for available commands
- Check [Better Auth Documentation](https://better-auth.com/) for authentication features
- Explore [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/) for deployment

## Deployment

When ready to deploy:

```bash
# Build the project
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

Make sure to set `BETTER_AUTH_SECRET` as a Cloudflare secret:

```bash
pnpm wrangler secret put BETTER_AUTH_SECRET
```
