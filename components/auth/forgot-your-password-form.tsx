"use client";
import { useForm } from "react-hook-form"
import CustomController from "../common/CustomController"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FieldGroup } from "../ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Button } from "../ui/button";

const formSchema = z.object({
    email: z.email()
})
export type ForgotYourPasswordFormSchema = z.infer<typeof formSchema>

export const ForgotYourPasswordForm = () => {

    const router = useRouter()
    const form = useForm<ForgotYourPasswordFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async ({ email }: ForgotYourPasswordFormSchema) => {
        const { error } = await authClient.requestPasswordReset({
            email,
            redirectTo: "/reset-password",
        });

        if (error) {
            toast.error(error.message || "Failed to send password reset email");
        } else {
            toast.success("Password reset email sent");
            router.push("/");
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>
                <CardDescription>This feature is available for verified users only.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <form id="forgot-your-password-form" onSubmit={form.handleSubmit(onSubmit)} aria-label="Forgot your password" noValidate>
                    <FieldGroup>
                        <CustomController form={form} name="email" label="Email" type="email" placeholder="Luke@Skywalker.com" />
                    </FieldGroup>
                </form>
                <Button form="forgot-your-password-form" type="submit" variant="primary" disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send reset email"}
                </Button>
            </CardContent>
        </Card>
    )
}

export default ForgotYourPasswordForm