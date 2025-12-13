import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function getLocalD1DB() {
  try {
    // Look specifically in the d1 directory for D1 databases
    const basePath = path.resolve(".wrangler/state/v3/d1");

    if (!fs.existsSync(basePath)) {
      return null; // Return null instead of throwing, will use production config
    }

    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      return null; // Return null instead of throwing
    }

    const url = path.resolve(basePath, dbFile);
    console.log(`Using local D1 database: ${url}`);
    return url;
  } catch (err) {
    console.warn(`Could not find local D1 database: ${err}`);
    return null;
  }
}

const localD1DBUrl = getLocalD1DB();

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  ...(process.env.NODE_ENV === "production" || localD1DBUrl === null
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
          url: localD1DBUrl!,
        },
      }),
});
