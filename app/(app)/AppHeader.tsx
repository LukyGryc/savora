import Logo from "../../components/layout/Logo";
import LogoutButton from "../../components/auth/LogoutButton";

const AppHeader = async () => {

  return (
    <div className="bg-bg-primary/90 w-full h-16 flex items-center justify-center top-0 z-50 backdrop-blur sticky border-b border-white">
      <div className="w-3/4 flex justify-between">
        <Logo boxSize="lg" fontSize="2xl" includeText={true} />
        <div className="flex items-center gap-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
