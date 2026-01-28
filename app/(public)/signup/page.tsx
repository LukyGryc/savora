import { SignUpForm } from "@/components/auth/signup-form"
import { isUserLoggedIn } from "@/util/userUtil";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    redirect("/calendar");
  }

  return (
    <div className="bg-bg-primary max-w-sm flex mx-auto flex-1 items-center justify-center">
        <SignUpForm />
    </div>
  )
}
