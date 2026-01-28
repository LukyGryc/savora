import Link from "next/link";
import { Button } from "../../components/ui/button";
import Logo from "../../components/layout/Logo";

const PublicHeader = async () => {

  return (
    <div className="bg-bg-primary/90 w-full h-16 flex items-center justify-center top-0 z-50 backdrop-blur sticky border-b border-white">
      <div className="w-3/4 flex justify-between">
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
    </div>
  );
};

export default PublicHeader;
