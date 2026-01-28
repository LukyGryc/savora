'use client';
import { toast } from "sonner";
import { Button } from "../ui/button"
import { logUserOut } from "@/util/userUtil"
import { useRouter } from "next/navigation"
const LogoutButton = () => {

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logUserOut()
      toast.success("Logged out successfully")
      router.push("/signin")
    } catch {
      toast.error("Logout failed")
    }
  }
  return (
    <form action={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  )
}

export default LogoutButton
