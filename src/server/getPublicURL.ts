import { createServerFn } from "@tanstack/react-start";

// This function guarantees execution ONLY on the server
export const getPublicURL = createServerFn({ method: "GET" }).handler(
  async () => {
    return process.env.PUBLIC_URL || "http://localhost:3000";
  },
);
