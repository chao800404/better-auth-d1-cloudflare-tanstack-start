import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function getLocalD1DB() {
  try {
    // Look specifically in the d1 directory for D1 databases
    const basePath = path.resolve(".wrangler/state/v3/d1");

    if (!fs.existsSync(basePath)) {
      throw new Error(
        `D1 directory not found at ${basePath}. Run 'pnpm dev' first to create the local D1 database.`
      );
    }

    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(
        `.sqlite file not found in ${basePath}. Run 'pnpm dev' first to create the local D1 database.`
      );
    }

    const url = path.resolve(basePath, dbFile);
    console.log(`Using local D1 database: ${url}`);
    return url;
  } catch (err) {
    console.error(`Error finding local D1 database: ${err}`);
    throw err;
  }
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_TOKEN!,
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1DB()!,
        },
      }),
});
