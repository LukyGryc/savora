import Logo from "../../components/layout/Logo";
import LogoutButton from "../../components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AppHeader = async () => {

  return (
    <div className="bg-bg-primary/90 w-full h-16 flex justify-center top-0 z-50 backdrop-blur sticky border-b border-white">
      <div className="w-3/4 flex justify-between items-center">
        <div className="w-full flex items-center gap-40">
          <Logo boxSize="lg" fontSize="2xl" includeText={true} />
          <Button asChild variant="primary">
            <Link href="/calendar">
              Calendar
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
