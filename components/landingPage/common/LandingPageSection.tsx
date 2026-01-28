interface LandingPageSectionProps {
  children: React.ReactNode;
  bgColor?: string;
  maxWidth?: string;
}

const LandingPageSection = ({ children, bgColor = "bg-bg-primary", maxWidth = "1400px" }: LandingPageSectionProps) => {
  return (
    <section className={`border-t border-white ${bgColor}`}>
      <div
        className={`mx-auto py-32 text-center`}
        style={{ maxWidth: maxWidth }}
      >
        <div className="max-w-3/4 mx-auto flex flex-col gap-16">
          {children}
        </div>
      </div>
    </section>
  )
}

export default LandingPageSection