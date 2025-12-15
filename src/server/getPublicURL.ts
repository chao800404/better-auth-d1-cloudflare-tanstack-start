import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";

// This function guarantees execution ONLY on the server
export const getPublicURL = createServerFn({ method: "GET" }).handler(
  async () => {
    // 1. Priority: Trust the environment variable (Secure & Production best practice)
    const _env = env as any;
    const envUrl = _env.BETTER_AUTH_URL || _env.PUBLIC_URL;
    if (envUrl) return envUrl;

    // 2. Fallback: Infer from request (Convenient for "One-Click Deploy" previews)
    // Warning: Host header can be spoofed. Only rely on this if Env var is missing.
    const request = getRequest();
    if (request?.headers) {
      const host = request.headers.get("host");
      const protocol = host?.includes("localhost") ? "http" : "https";
      if (host) return `${protocol}://${host}`;
    }

    return "http://localhost:3000";
  },
);
