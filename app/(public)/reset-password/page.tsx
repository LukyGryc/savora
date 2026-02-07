import AuthPage from "@/components/layout/AuthPage"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Reset password',
  };

const ResetPasswordPage = () => {
  return (
    <AuthPage>
      <ResetPasswordForm />
    </AuthPage>
  )
}

export default ResetPasswordPage