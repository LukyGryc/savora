"use server";

import { SignInFormSchema } from "@/components/auth/signIn-form";
import { SignUpFormSchema } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";

export const signIn = async ({ email, password }: SignInFormSchema) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      }
    })

    return {
      success: true,
      message: "Sign in successful",
    }
  } catch {
    return {
      success: false,
      message: "Incorrect email or password",
    }
  }
}

export const signUp = async ({ email, password, name }: SignUpFormSchema) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      }
    })

    return {
      success: true,
      message: "Sign up successful",
    }
  } catch {
    return {
      success: false,
      message: "Sign up failed",
    }
  }
}