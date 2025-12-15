import { initDatabase } from "@/db/init";
import { createServerFn } from "@tanstack/start";

export const initD1Database = createServerFn({ method: "POST" }).handler(
  async () => {
    // Only run initialization in production or when explicitly needed
    // The initDatabase function itself handles the "check if exists" logic
    await initDatabase();
    return { success: true };
  },
);
