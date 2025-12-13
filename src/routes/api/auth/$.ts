import { createAuth } from "@/auth";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const auth = createAuth(env as any, (request as any).cf);
        return auth.handler(request);
      },
      POST: ({ request }) => {
        const auth = createAuth(env as any, (request as any).cf);
        return auth.handler(request);
      },
    },
  },
});
