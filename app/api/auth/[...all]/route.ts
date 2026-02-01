import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

// Prevent Next.js from statically analyzing this route during build (fixes Vercel "Failed to collect page data")
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const { POST, GET } = toNextJsHandler(auth);