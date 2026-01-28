"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const isUserLoggedIn = async (): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.session?.id ? true : false;
}

export const logUserOut = async () => {
  await auth.api.signOut({ headers: await headers() })
}