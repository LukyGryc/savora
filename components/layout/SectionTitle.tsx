interface SectionTitleProps {
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const SectionTitle = ({title, size = "3xl"}: SectionTitleProps) => {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }

  return (
    <h1 className={`font-bold text-white ${sizes[size]}`}>
      {title}
    </h1>
  )
}

export default SectionTitle