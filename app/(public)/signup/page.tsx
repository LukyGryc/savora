import { SignUpForm } from "@/components/auth/signup-form"
import AuthPage from "@/components/layout/AuthPage";
import { isUserLoggedIn } from "@/server/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Sign up',
};

export default async function SignUpPage() {

  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    redirect("/calendar");
  }

  return (
    <AuthPage>
      <SignUpForm />
    </AuthPage>
  )
}
