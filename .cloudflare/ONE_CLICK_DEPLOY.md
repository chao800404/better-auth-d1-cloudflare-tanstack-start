# 🚀 One-Click Deploy Guide

Deploy this template to Cloudflare Workers in just a few clicks!

## Quick Start

1. **Click the deploy button** in the [README](../README.md)
2. **Authorize GitHub** - Allow Cloudflare to access your account
3. **Configure** - Select your Cloudflare account and name your Worker
4. **Deploy** - Wait 2-3 minutes for automatic setup

That's it! Your app will be live at `https://your-worker.workers.dev`

## ⚠️ Important: Initialize D1 Database

After deployment, your D1 database is created but **empty**. You need to apply migrations:

### Option 1: Using GitHub Actions (Recommended)

1. Go to your forked repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
4. Go to **Actions** tab → Select "Deploy and Initialize D1" → Click "Run workflow"

This will automatically deploy and initialize your D1 database!

### Option 2: Manual Migration

```bash
# 1. Clone your repository
git clone https://github.com/YOUR_USERNAME/your-repo.git
cd your-repo

# 2. Install dependencies
pnpm install

# 3. Apply migrations to production D1
pnpm db:migrate:prod
```

## What Gets Created Automatically

- ✅ D1 Database (`better-auth-db`)
- ✅ KV Namespace (`better-auth-kv`)
- ✅ R2 Bucket (`better-auth-r2`)
- ✅ `BETTER_AUTH_SECRET` (default provided for testing)
- ✅ Automatic deployments on every push

## ⚠️ Important for Production

The deployment uses a default `BETTER_AUTH_SECRET` for testing. **Change it for production**:

```bash
# Generate a new secret
openssl rand -base64 32

# Set it in Cloudflare
pnpm wrangler secret put BETTER_AUTH_SECRET
# Paste the generated secret when prompted
```

## Troubleshooting

### Deployment Failed?

1. Check deployment logs in Cloudflare dashboard
2. Verify you have Cloudflare permissions
3. Try redeploying from the dashboard

### Need Manual Setup?

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/your-repo.git
cd your-repo

# Setup resources
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
pnpm setup:cloudflare

# Deploy
pnpm deploy
```

## Learn More

- [Main README](../README.md) - Full documentation
- [DEPLOY.md](../DEPLOY.md) - Detailed deployment guide
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
