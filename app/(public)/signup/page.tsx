import { SignUpForm } from "@/components/auth/signup-form"
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
    <div className="bg-bg-primary flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm />
      </div>
    </div>
  )
}
