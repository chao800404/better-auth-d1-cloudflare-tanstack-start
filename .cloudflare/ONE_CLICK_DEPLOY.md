# 🚀 One-Click Deploy to Cloudflare

This template supports one-click deployment to Cloudflare Workers!

## How It Works

When you click the "Deploy to Cloudflare Workers" button:

1. **Fork Repository**: Creates a fork of this template in your GitHub account
2. **Connect to Cloudflare**: Links your GitHub repository to Cloudflare
3. **Create Resources**: Automatically creates:
   - D1 Database for Better Auth
   - KV Namespace for rate limiting
   - R2 Bucket for file uploads (optional)
4. **Deploy**: Builds and deploys your application to Cloudflare Workers
5. **Setup CI/CD**: Configures automatic deployments on every push

## What You Need

- GitHub account
- Cloudflare account (free tier works!)
- 5 minutes of your time ⏱️

## Step-by-Step Guide

### 1. Click the Deploy Button

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/better-auth-cloudflare-tanstack-start)

### 2. Authorize GitHub

- Allow Cloudflare to access your GitHub account
- Choose where to fork the repository

### 3. Configure Cloudflare

- Select your Cloudflare account
- Choose a name for your Worker
- The deployment will create necessary resources automatically

### 4. Set Environment Variables

During deployment, you'll be asked to provide:

- `BETTER_AUTH_SECRET`: Generate with `openssl rand -base64 32`

### 5. Deploy!

Click "Deploy" and wait for the process to complete (usually 2-3 minutes).

## After Deployment

### Access Your App

Your app will be available at:

```
https://your-worker-name.your-subdomain.workers.dev
```

### View Resources

Check your Cloudflare dashboard to see:

- D1 Database: `better-auth-db`
- KV Namespace: `better-auth-kv`
- R2 Bucket: `better-auth-r2`

### Automatic Deployments

Every push to your `main` branch will automatically deploy to Cloudflare!

## Manual Configuration (Optional)

If you need to customize resource names or settings:

1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages
3. Select your Worker
4. Update settings as needed

## Troubleshooting

### Deployment Failed

**Common causes**:

- Missing environment variables
- Insufficient Cloudflare permissions
- Build errors

**Solutions**:

1. Check the deployment logs in Cloudflare dashboard
2. Verify all environment variables are set
3. Try redeploying from the dashboard

### Resources Not Created

If D1/KV/R2 resources weren't created automatically:

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/better-auth-cloudflare-tanstack-start.git
cd better-auth-cloudflare-tanstack-start

# Run the setup script
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
pnpm setup:cloudflare
```

### Database Migrations

If you need to apply migrations manually:

```bash
pnpm db:migrate:prod
```

## Alternative: Deploy via CLI

Prefer command line? Use Wrangler:

```bash
# Install dependencies
pnpm install

# Setup Cloudflare resources
pnpm setup:cloudflare

# Deploy
pnpm deploy
```

## Learn More

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Deploy to Workers Documentation](https://deploy.workers.cloudflare.com/)
- [Better Auth Documentation](https://better-auth.com/)

## Need Help?

- Check the [main README](../README.md)
- See [DEPLOY.md](../DEPLOY.md) for detailed deployment guide
- Open an issue on GitHub
