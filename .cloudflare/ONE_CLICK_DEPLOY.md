# 🚀 One-Click Deploy Guide

Deploy this template to Cloudflare Workers in just a few clicks!

## Quick Start

1. **Click the deploy button** in the [README](../README.md)
2. **Authorize GitHub** - Allow Cloudflare to access your account
3. **Configure** - Select your Cloudflare account and name your Worker
4. **Deploy** - Wait 2-3 minutes for automatic setup

That's it! Your app will be live at `https://your-worker.workers.dev`

## What Gets Created Automatically

- ✅ D1 Database (`better-auth-db`)
- ✅ KV Namespace (`better-auth-kv`)
- ✅ R2 Bucket (`better-auth-r2`)
- ✅ `BETTER_AUTH_SECRET` (auto-generated)
- ✅ Automatic deployments on every push

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
