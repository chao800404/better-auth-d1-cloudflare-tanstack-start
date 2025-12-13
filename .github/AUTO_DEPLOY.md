# 📦 Auto-Deploy Files Summary

This template now includes comprehensive auto-deploy capabilities for Cloudflare Workers.

## 📁 New Files Created

### 1. **Setup Script**

- **File**: `scripts/setup-cloudflare.sh`
- **Purpose**: Automatically create and configure Cloudflare resources
- **Usage**: `pnpm setup:cloudflare`
- **What it does**:
  - Creates D1 database
  - Creates KV namespace
  - Creates R2 bucket
  - Updates `wrangler.jsonc` with IDs
  - Applies database migrations

### 2. **Workflow Files**

#### Simple Deploy (Recommended)

- **File**: `.github/workflows/deploy.yml.example`
- **Best for**: Production environments
- **Requirements**: Run `pnpm setup:cloudflare` first
- **Features**:
  - Fast deployment
  - Automatic migrations
  - Secret management

#### Full Auto-Deploy

- **File**: `.github/workflows/deploy-full.yml.example`
- **Best for**: Experimentation
- **Requirements**: None (creates resources automatically)
- **Features**:
  - Automatic resource creation
  - Resource existence checks
  - Self-contained

### 3. **Documentation**

- **File**: `DEPLOY.md`
- **Purpose**: Comprehensive deployment guide
- **Includes**:
  - Step-by-step setup instructions
  - Troubleshooting guide
  - Security best practices
  - Advanced configurations

## 🚀 Quick Start

```bash
# 1. Setup Cloudflare resources
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
pnpm setup:cloudflare

# 2. Enable auto-deploy
mv .github/workflows/deploy.yml.example .github/workflows/deploy.yml

# 3. Add GitHub Secrets (see DEPLOY.md)

# 4. Push to deploy
git push origin main
```

## 📊 Workflow Comparison

| Feature           | Simple Deploy | Full Auto-Deploy |
| ----------------- | ------------- | ---------------- |
| Setup Required    | ✅ Yes        | ❌ No            |
| Speed             | ⚡ Fast       | 🐢 Slower        |
| Reliability       | ✅ High       | ⚠️ Medium        |
| Resource Creation | ❌ Manual     | ✅ Automatic     |
| Best For          | Production    | Testing          |

## 🔑 Required GitHub Secrets

Add these in `Settings` → `Secrets and variables` → `Actions`:

1. **CLOUDFLARE_API_TOKEN**

   - Get from: https://dash.cloudflare.com/profile/api-tokens
   - Permissions: Workers Scripts:Edit, D1:Edit, Account Settings:Read

2. **CLOUDFLARE_ACCOUNT_ID**

   - Get from: https://dash.cloudflare.com/ (right sidebar)

3. **BETTER_AUTH_SECRET**
   - Generate with: `openssl rand -base64 32`

## 📝 Updated Files

### package.json

Added new script:

```json
"setup:cloudflare": "./scripts/setup-cloudflare.sh"
```

### README.md

- Expanded GitHub Actions section
- Added workflow comparison table
- Added troubleshooting guide

## 🎯 Deployment Flow

```
Local Development
    ↓
Run setup:cloudflare (one-time)
    ↓
Configure GitHub Secrets
    ↓
Enable workflow (rename .example file)
    ↓
Push to main branch
    ↓
GitHub Actions runs
    ↓
Deployed to Cloudflare Workers! 🎉
```

## 💡 Tips

- **First time**: Use the setup script to create resources
- **Production**: Use simple deploy workflow
- **Testing**: Use full auto-deploy workflow
- **Manual control**: Use `pnpm deploy` instead

## 📚 Learn More

- See `DEPLOY.md` for detailed instructions
- See `README.md` for project overview
- See workflow files for implementation details

## 🆘 Troubleshooting

Common issues and solutions:

1. **"Resource already exists"**
   → Use simple deploy workflow

2. **"Unauthorized"**
   → Check API token permissions

3. **"Migration fails"**
   → Run `pnpm db:migrate:prod` manually

See `DEPLOY.md` for more troubleshooting tips.
