import Logo from "../../components/layout/Logo";
import LogoutButton from "../../components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AppHeader = async () => {

  return (
    <div className="bg-bg-primary/90 w-full h-16 flex justify-center top-0 z-50 backdrop-blur sticky border-b border-white">
      <div className="w-3/4 flex justify-between items-center">
        <Logo boxSize="lg" fontSize="2xl" includeText={true} />
{ /*       <div className="flex items-center gap-2">
          <Button asChild variant="primary">
            <Link href="/calendar">
              Calendar
            </Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="/dashboard">
              Dashboard
            </Link>
          </Button>
        </div>
        <LogoutButton />*/}
      </div>
    </div>
  );
};

export default AppHeader;
