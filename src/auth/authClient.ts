import { cloudflareClient } from "better-auth-cloudflare/client";
import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: import.meta.env.VITE_PUBLIC_URL || "http://localhost:3000",
  plugins: [cloudflareClient(), anonymousClient()],
});

export default client;
