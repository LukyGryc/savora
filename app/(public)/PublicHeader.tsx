import Link from "next/link";
import { Button } from "../../components/ui/button";
import Logo from "../../components/layout/Logo";

const PublicHeader = async () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-bg-primary/90 backdrop-blur" role="banner">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Logo boxSize="lg" fontSize="2xl" includeText={true} />
        <div className="flex items-center gap-2">
          <Button asChild variant="primary">
            <Link href="/signin">
              <span>Sign In</span>
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/signup">
              <span>Sign Up</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
