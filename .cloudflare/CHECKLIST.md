# ✅ Deploy Button Setup Checklist

Use this checklist to ensure your one-click deploy button is properly configured.

## 📝 Before Publishing

### 1. Update Repository URLs

- [ ] Replace `YOUR_USERNAME` in README.md with your GitHub username
- [ ] Update deploy button URL in README (line 5)
- [ ] Update deploy button URL in README (line 47)
- [ ] Update template button URL in README (line 6)
- [ ] Update template button URL in README (line 94)

**Quick fix**:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
sed -i '' 's/YOUR_USERNAME/your-github-username/g' README.md
```

### 2. Verify Configuration Files

- [ ] `.cloudflare/deploy.json` exists and is valid JSON
- [ ] `wrangler.jsonc` is properly configured
- [ ] `package.json` has all required scripts:
  - [ ] `build`
  - [ ] `deploy`
  - [ ] `setup:cloudflare`
  - [ ] `db:generate`
  - [ ] `db:migrate:prod`

**Validate**:

```bash
# Check deploy.json is valid
jq empty .cloudflare/deploy.json

# Check required scripts
jq '.scripts | keys[]' package.json | grep -E '(build|deploy|setup:cloudflare|db:generate|db:migrate:prod)'
```

### 3. Test Deployment Locally

- [ ] `pnpm install` works
- [ ] `pnpm build` succeeds
- [ ] `pnpm setup:cloudflare` works (with credentials)
- [ ] `pnpm deploy` works (with credentials)

### 4. Documentation

- [ ] README.md has deploy buttons at top
- [ ] Quick Deploy section is complete
- [ ] Deployment workflow diagram exists (`public/deploy-workflow.png`)
- [ ] `.cloudflare/ONE_CLICK_DEPLOY.md` exists
- [ ] `DEPLOY.md` exists and is up to date

### 5. Visual Assets

- [ ] `public/deploy-workflow.png` exists
- [ ] Image is properly sized (not too large)
- [ ] Image displays correctly in README

### 6. Optional Enhancements

- [ ] Enable GitHub template feature in repository settings
- [ ] Add repository topics: `cloudflare-workers`, `tanstack-start`, `better-auth`
- [ ] Create a demo deployment
- [ ] Add screenshots to README
- [ ] Enable validation workflow (rename `.example` file)

## 🚀 After Publishing

### 1. Test the Deploy Button

- [ ] Click the "Deploy to Cloudflare" button
- [ ] Verify it opens Cloudflare deployment wizard
- [ ] Check that repository URL is correct
- [ ] Confirm resources are created properly

### 2. Monitor First Deployments

- [ ] Watch for issues in GitHub Issues
- [ ] Check Cloudflare deployment logs
- [ ] Verify automatic deployments work

### 3. Update Documentation

- [ ] Add any discovered issues to troubleshooting
- [ ] Update deployment time estimates if needed
- [ ] Add user feedback to docs

## 🔧 Troubleshooting

### Deploy Button Shows 404

**Cause**: Repository URL is incorrect

**Fix**:

```bash
# Update URLs in README
sed -i '' 's/YOUR_USERNAME/your-actual-username/g' README.md
```

### Resources Not Created

**Cause**: `deploy.json` configuration issue

**Fix**:

1. Validate JSON: `jq empty .cloudflare/deploy.json`
2. Check resource names are valid
3. Verify build commands are correct

### Build Fails

**Cause**: Missing dependencies or build errors

**Fix**:

1. Test locally: `pnpm build`
2. Check all dependencies are in `package.json`
3. Verify build command in `deploy.json`

## 📊 Success Criteria

Your deploy button is ready when:

- ✅ All checklist items are completed
- ✅ Deploy button opens Cloudflare wizard
- ✅ Test deployment succeeds
- ✅ Resources are created automatically
- ✅ App is live and functional
- ✅ Automatic deployments work

## 🎯 Quick Commands

```bash
# Validate everything
jq empty .cloudflare/deploy.json && \
jq '.scripts' package.json && \
echo "✅ Configuration is valid"

# Update repository URLs
read -p "Enter your GitHub username: " username
sed -i '' "s/YOUR_USERNAME/$username/g" README.md
echo "✅ URLs updated"

# Test build
pnpm install && pnpm build
echo "✅ Build successful"

# Make setup script executable
chmod +x scripts/setup-cloudflare.sh
echo "✅ Setup script is executable"
```

## 📚 Resources

- [Cloudflare Deploy Documentation](https://deploy.workers.cloudflare.com/)
- [Deploy Button Summary](./.cloudflare/DEPLOY_BUTTON_SUMMARY.md)
- [One-Click Deploy Guide](./.cloudflare/ONE_CLICK_DEPLOY.md)
- [Full Deployment Guide](../DEPLOY.md)

---

**Ready to publish?** Make sure all checkboxes are ticked! ✅
