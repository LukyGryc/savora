'use client';
import { toast } from "sonner";
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";

const LogoutButton = ({ onClick }: { onClick?: () => void }) => {

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      toast.success("Logged out successfully")
      router.push("/signin")
    } catch {
      toast.error("Logout failed")
    }
  }
  return (
    <form action={handleLogout}>
      <Button variant="destructive" type="submit" onClick={onClick} >Logout</Button>
    </form>
  )
}

export default LogoutButton
