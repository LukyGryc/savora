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
  FieldSeparator,
} from "@/components/ui/field"
import { signUp } from "@/server/users"

import { z } from "zod"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AuthController from "./AuthController";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
})

export type SignUpFormSchema = z.infer<typeof formSchema>

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = async (data: SignUpFormSchema) => {
    const { success, message } = await signUp(data);
    if (success) {
      toast.success(message);
      router.push("/calendar");
    } else {
      toast.error(message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                <span className="text-white">Start by creating an account</span>
              </FieldSeparator>

              <AuthController form={form} name="name" label="Name" type="text" placeholder="Peter Parker" />
              <AuthController form={form} name="email" label="Email" type="email" placeholder="m@example.com" />
              <AuthController form={form} name="password" label="Password" type="password" placeholder="Password" />

              <Field>
                <Button
                  form="signup-form"
                  type="submit"
                  variant="primary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
