import ForgotYourPasswordForm from "@/components/auth/forgot-your-password-form"
import AuthPage from "@/components/layout/AuthPage"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot your password',
};

const ForgotYourPasswordPage = () => {
  return (
    <AuthPage>
      <ForgotYourPasswordForm />
    </AuthPage>
  )
}

export default ForgotYourPasswordPage