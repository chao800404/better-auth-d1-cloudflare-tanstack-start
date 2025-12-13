import type {
  D1Database,
  IncomingRequestCfProperties,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";
import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous, openAPI } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export interface CloudflareBindings {
  DATABASE: D1Database;
  KV: KVNamespace;
  R2_BUCKET: R2Bucket;
}

// Single auth configuration that handles both CLI and runtime scenarios
function createAuth(
  env?: CloudflareBindings,
  cf?: IncomingRequestCfProperties
) {
  // Use actual DB for runtime, empty object for CLI
  const db = env
    ? drizzle(env.DATABASE, { schema, logger: true })
    : ({} as any);

  return betterAuth({
    ...withCloudflare(
      {
        autoDetectIpAddress: true,
        geolocationTracking: true,
        cf: cf || {},
        d1: env
          ? {
              db,
              options: {
                usePlural: true,
                debugLogs: true,
              },
            }
          : undefined,
        kv: env?.KV,
        // Optional: Enable R2 file storage
        r2: {
          bucket: env?.R2_BUCKET as any,
          maxFileSize: 10 * 1024 * 1024, // 10MB
          allowedTypes: [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".pdf",
            ".doc",
            ".docx",
          ],
          additionalFields: {
            category: { type: "string", required: false },
            isPublic: { type: "boolean", required: false },
            description: { type: "string", required: false },
          },
        },
      },
      {
        emailAndPassword: {
          enabled: true,
        },
        rateLimit: {
          enabled: true,
          window: 60, // Minimum KV TTL is 60s
          max: 100, // reqs/window
          customRules: {
            // https://github.com/better-auth/better-auth/issues/5452
            "/sign-in/email": {
              window: 60,
              max: 100,
            },
            "/sign-in/social": {
              window: 60,
              max: 100,
            },
          },
        },
        plugins: [
          tanstackStartCookies(), // CRITICAL for TanStack Start
          anonymous(),
          openAPI(),
        ],
      }
    ),
    // Only add database adapter for CLI schema generation
    ...(env
      ? {}
      : {
          database: drizzleAdapter({} as D1Database, {
            provider: "sqlite",
            usePlural: true,
            debugLogs: true,
          }),
        }),
  });
}

// Export for CLI schema generation
export const auth = createAuth();

// Export for runtime usage
export { createAuth };
