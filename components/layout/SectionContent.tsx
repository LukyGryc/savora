const SectionContent = ({ children, gap = "gap-6" }: { children: React.ReactNode, gap?: string }) => {
  return (
    <div className={`flex flex-col ${gap}`}>
      {children}
    </div>
  )
}

export default SectionContent