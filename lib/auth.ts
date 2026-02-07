import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { Resend } from "resend";
import ForgotYourPasswordEmail from "@/components/emails/forgot-your-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: "Savora <savora@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        react: ForgotYourPasswordEmail({ userName: user.name, userEmail: user.email, resetUrl: url }),
      });

      if (error) {
        console.error("[Resend] Password reset email failed:", error);
        throw new Error(error.message ?? "Failed to send password reset email");
      }
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  plugins: [nextCookies()],
});