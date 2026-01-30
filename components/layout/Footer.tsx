import Logo from "./Logo"

const Footer = () => {
  return (
    <div className="h-16 bg-bg-secondary border-t border-white flex items-center justify-around w-full">
      <Logo boxSize="md" fontSize="xl" includeText={true} />
      <span className="text-white text-xs sm:text-sm md:text-base">© {new Date().getFullYear()} Savora. All rights reserved.</span>
    </div >
  )
}

export default Footer