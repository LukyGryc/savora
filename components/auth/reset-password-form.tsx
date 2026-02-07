"use client";
import { useForm } from "react-hook-form"
import CustomController from "../common/CustomController"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FieldGroup } from "../ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Button } from "../ui/button";

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
})

export type ResetPasswordFormSchema = z.infer<typeof formSchema>

export const ResetPasswordForm = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const form = useForm<ResetPasswordFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async ({ password }: ResetPasswordFormSchema) => {
        const token = searchParams.get("token");

        if (!token) {
            toast.error("Your password reset link is invalid or has expired");
            return;
        }

        const { error } = await authClient.resetPassword({
            newPassword: password,
            token,
          });

        if (error) {
            toast.error(error.message || "Failed to reset password");
        } else {
            toast.success("Password reset successfully");
            router.push("/calendar");
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Reset your password</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)} aria-label="Reset password" noValidate>
                    <FieldGroup>
                        <CustomController form={form} name="password" label="Password" type="password" placeholder="Password" />
                        <CustomController form={form} name="confirmPassword" label="Confirm Password" type="password" placeholder="Confirm Password" />
                    </FieldGroup>
                </form>
                <Button form="reset-password-form" type="submit" variant="primary" disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Resetting..." : "Reset password"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default ResetPasswordForm