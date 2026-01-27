interface IconProps {
  icon: React.ReactNode;
}

const Icon = ( { icon }: IconProps ) => {
  return (
    <div className="text-3xl font-bold text-primary bg-secondary rounded-lg w-12 h-12 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-300">
      {icon}
    </div>
  )
}

export default Icon