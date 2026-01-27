import Link from "next/link";

interface Props {
  boxSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  fontSize?: "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  includeText?: boolean;
}

const Logo = ({ boxSize = "md", fontSize = "xl", includeText = true }: Props) => {
  const fontSizes = {
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  }

  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
    "2xl": "w-14 h-14",
  }

  return (
    <Link href="/" className={`flex items-center gap-2 ${fontSizes[fontSize]}`}>
      <div className={`text-[var(--text-primary)] bg-primary ${sizes[boxSize]} rounded-xl flex items-center justify-center font-bold`}>
        <span>S</span>
      </div>
      {includeText && (
        <span className="text-[var(--text-primary)] font-bold">avora</span>
      )}
    </Link>
  )
}

export default Logo