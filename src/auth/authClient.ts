import { cloudflareClient } from "better-auth-cloudflare/client";
import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const client = (baseURL: string) =>
  createAuthClient({
    baseURL,
    plugins: [cloudflareClient(), anonymousClient()],
  });

export default client;
