import AuthPage from "@/components/layout/AuthPage"
import ResetPasswordForm from "@/components/auth/reset-password-form"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Reset password',
};

const ResetPasswordPage = () => {
  return (
    <AuthPage>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthPage>
  )
}

export default ResetPasswordPage