# Infrastructure as Code approach using Wrangler
# This script helps initialize Cloudflare resources
# Run this locally first, then use the auto-deploy workflow

set -e

echo "🚀 Setting up Cloudflare resources..."

# Check if required environment variables are set
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set"
  exit 1
fi

# Configuration
D1_DATABASE_NAME="${D1_DATABASE_NAME:-my-app-db}"
KV_NAMESPACE_NAME="${KV_NAMESPACE_NAME:-my-app-kv}"
R2_BUCKET_NAME="${R2_BUCKET_NAME:-my-app-r2}"

echo "📝 Configuration:"
echo "  D1 Database: $D1_DATABASE_NAME"
echo "  KV Namespace: $KV_NAMESPACE_NAME"
echo "  R2 Bucket: $R2_BUCKET_NAME"
echo ""

# Create D1 Database
echo "🗄️  Setting up D1 database..."
if pnpm wrangler d1 list | grep -q "$D1_DATABASE_NAME"; then
  echo "✅ D1 database '$D1_DATABASE_NAME' already exists"
  D1_ID=$(pnpm wrangler d1 list | grep "$D1_DATABASE_NAME" | awk '{print $2}')
else
  echo "📦 Creating D1 database..."
  D1_OUTPUT=$(pnpm wrangler d1 create "$D1_DATABASE_NAME")
  D1_ID=$(echo "$D1_OUTPUT" | grep "database_id" | awk -F'"' '{print $4}')
  echo "✅ Created D1 database with ID: $D1_ID"
fi

# Create KV Namespace
echo ""
echo "🔑 Setting up KV namespace..."
if pnpm wrangler kv:namespace list | grep -q "$KV_NAMESPACE_NAME"; then
  echo "✅ KV namespace '$KV_NAMESPACE_NAME' already exists"
  KV_ID=$(pnpm wrangler kv:namespace list | grep "$KV_NAMESPACE_NAME" | jq -r '.[0].id')
else
  echo "📦 Creating KV namespace..."
  KV_OUTPUT=$(pnpm wrangler kv:namespace create "$KV_NAMESPACE_NAME")
  KV_ID=$(echo "$KV_OUTPUT" | grep "id" | awk -F'"' '{print $4}')
  echo "✅ Created KV namespace with ID: $KV_ID"
fi

# Create R2 Bucket
echo ""
echo "🪣 Setting up R2 bucket..."
if pnpm wrangler r2 bucket list | grep -q "$R2_BUCKET_NAME"; then
  echo "✅ R2 bucket '$R2_BUCKET_NAME' already exists"
else
  echo "📦 Creating R2 bucket..."
  pnpm wrangler r2 bucket create "$R2_BUCKET_NAME"
  echo "✅ Created R2 bucket: $R2_BUCKET_NAME"
fi

# Update wrangler.jsonc
echo ""
echo "📝 Updating wrangler.jsonc..."
cat > wrangler.jsonc.tmp << EOF
{
  "name": "better-auth-cloudflare-tanstack-start",
  "compatibility_date": "2024-12-01",
  "main": "dist/server/index.js",
  "assets": {
    "directory": "dist/client",
    "binding": "ASSETS"
  },
  "d1_databases": [
    {
      "binding": "DATABASE",
      "database_name": "$D1_DATABASE_NAME",
      "database_id": "$D1_ID",
      "migrations_dir": "drizzle"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "$KV_ID"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "$R2_BUCKET_NAME"
    }
  ]
}
EOF

mv wrangler.jsonc.tmp wrangler.jsonc
echo "✅ Updated wrangler.jsonc"

# Generate and apply migrations
echo ""
echo "🔄 Setting up database..."
echo "Generating migrations..."
pnpm db:generate

echo "Applying migrations..."
pnpm db:migrate:prod

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add these secrets to your GitHub repository:"
echo "   - CLOUDFLARE_API_TOKEN"
echo "   - CLOUDFLARE_ACCOUNT_ID"
echo "   - BETTER_AUTH_SECRET (generate with: openssl rand -base64 32)"
echo ""
echo "2. Enable auto-deploy workflow:"
echo "   mv .github/workflows/deploy-full.yml.example .github/workflows/deploy.yml"
echo ""
echo "3. Push to main branch to trigger deployment"
