// Import your custom application schemas here
// Example:
// import { posts } from "./posts.schema";
// import { comments } from "./comments.schema";

/**
 * Unified schema export for Drizzle migrations
 *
 * This re-exports all database schemas (auth + your custom schemas)
 * for drizzle-kit to generate migrations.
 *
 * To add new schemas:
 * 1. Create a new schema file (e.g., ./posts.schema.ts)
 * 2. Import it above
 * 3. Re-export it below
 */

// Re-export all auth schema tables
export * from "./auth.schema";

// Re-export your custom schemas here:
// export * from "./posts.schema";
// export * from "./comments.schema";
