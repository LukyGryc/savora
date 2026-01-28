import { LoginForm } from "@/components/auth/signIn-form"
import { isUserLoggedIn } from "@/util/userUtil";
import { redirect } from "next/navigation";

export default async function SignInPage() {

  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    redirect("/calendar");
  }

  return (
    <div className="bg-bg-primary flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
