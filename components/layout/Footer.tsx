import Logo from "./Logo"

const Footer = () => {
  return (
    <footer className="h-16 bg-bg-secondary border-t border-white flex items-center justify-around w-full" role="contentinfo">
      <Logo boxSize="md" fontSize="xl" includeText={true} />
      <span className="text-white text-xs sm:text-sm md:text-base">© {new Date().getFullYear()} Savora. All rights reserved.</span>
    </footer>
  );
};

export default Footer