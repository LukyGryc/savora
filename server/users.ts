"use server";

import { SignInFormSchema } from "@/components/auth/signIn-form";
import { SignUpFormSchema } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function logUserOut() {
  try {
    await auth.api.signOut({
      headers: await headers()
    })
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch {
    return {
      success: false,
      message: "Logout failed",
    };
  }
}

export const signIn = async ({ email, password }: SignInFormSchema) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Sign in successful",
    };
  } catch {
    return {
      success: false,
      message: "Incorrect email or password",
    };
  }
};

export const signUp = async ({ email, password, name }: SignUpFormSchema) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Sign up successful",
    };
  } catch {
    return {
      success: false,
      message: "Sign up failed",
    };
  }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.session?.id ? true : false;
}

export const getUserEmail = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user.email ?? ""
}

export const getUserID = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.session.userId ?? ""
}