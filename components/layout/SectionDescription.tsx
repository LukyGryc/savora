interface SectionDescriptionProps {
  description: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const SectionDescription = ({description, size = "md"}: SectionDescriptionProps) => {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }
  return (
    <p className={`text-muted-foreground ${sizes[size]}`}>
      {description}
    </p>
  )
}

export default SectionDescription