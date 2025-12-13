import * as authSchema from "./auth.schema";

// Import your custom application schemas here
// Example:
// import { posts } from "./posts.schema";
// import { comments } from "./comments.schema";

/**
 * Unified schema export for Drizzle migrations
 *
 * This combines all database schemas (auth + your custom schemas)
 * into a single object for drizzle-kit to generate migrations.
 *
 * To add new schemas:
 * 1. Create a new schema file (e.g., ./posts.schema.ts)
 * 2. Import it above
 * 3. Add it to the schema object below
 */
export const schema = {
  ...authSchema, // Better Auth tables (users, sessions, accounts, etc.)
  // Add your custom schemas here:
  // posts,
  // comments,
} as const;
