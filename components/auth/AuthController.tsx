import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

type AuthControllerProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
}

function AuthController<T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
}: AuthControllerProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name} className="text-white">
            {label}
          </FieldLabel>

          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            className="text-white"
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}

export default AuthController
