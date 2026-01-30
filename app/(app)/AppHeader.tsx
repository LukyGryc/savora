import Logo from "../../components/layout/Logo";
import LogoutButton from "../../components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavigationDrawer from "@/components/layout/NavigationDrawer";

const AppHeader = async () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-bg-primary/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo
            boxSize="lg"
            fontSize="2xl"
            includeText
          />

          <nav className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/calendar">Calendar</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LogoutButton />
          </div>

          <div className="md:hidden cursor-pointer">
            <NavigationDrawer />
          </div>
        </div>
      </div>
    </header>

  );
};

export default AppHeader;
