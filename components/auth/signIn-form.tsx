"use client";
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { signIn } from "@/server/users"

import { z } from "zod"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import AuthController from "./AuthController";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type SignInFormSchema = z.infer<typeof formSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async(data: SignInFormSchema) => {
    const { success, message } = await signIn(data);
    if (success) {
      toast.success(message);
      router.push("/calendar");
    } else {
      toast.error(message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              <AuthController form={form} name="email" label="Email" type="email" placeholder="email@example.com" />
              <AuthController form={form} name="password" label="Password" type="password" placeholder="Password" />

              <Field>
                <Button form="login-form" type="submit" variant="primary" disabled={form.formState.isSubmitting}>{ form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In" }</Button>
                <FieldDescription className="text-center text-white">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
