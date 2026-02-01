import { createAuthClient } from "better-auth/react";

// Use NEXT_PUBLIC_APP_URL on Vercel (e.g. https://your-app.vercel.app); localhost for local dev
const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");

export const authClient = createAuthClient({ baseURL });