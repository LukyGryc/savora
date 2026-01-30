import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

type CustomControllerProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  type?: "text" | "number" | "email" | "password"
  placeholder?: string
}

function CustomController<T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
}: CustomControllerProps<T>) {
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
            onChange={(e) => {
              if (type !== "number") return field.onChange(e.target.value)
              if (e.target.value === "") return field.onChange(0)
              const num = e.target.valueAsNumber
              if (Number.isNaN(num)) return field.onChange(0)
              return field.onChange(num)
            }}
            id={field.name}
            type={type}
            step={type === "number" ? 0.01 : undefined}
            placeholder={placeholder}
            className="text-white border border-white"
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}

export default CustomController
