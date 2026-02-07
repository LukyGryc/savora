import { LoginForm } from "@/components/auth/signIn-form"
import AuthPage from "@/components/layout/AuthPage";
import { isUserLoggedIn } from "@/server/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function SignInPage() {

  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    redirect("/calendar");
  }

  return (
    <AuthPage>
      <LoginForm />
    </AuthPage>
  )
}
