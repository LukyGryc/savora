'use client';
import { toast } from "sonner";
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";
const LogoutButton = () => {

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
      <Button variant="destructive" type="submit">Logout</Button>
    </form>
  )
}

export default LogoutButton
