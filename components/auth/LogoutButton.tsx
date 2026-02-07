"use client";
import { logUserOut } from "@/server/users"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const { success, message } = await logUserOut()
    if (success) {
      toast.success(message)
      router.push("/signin")
    } else {
      toast.error(message)
    }
  }

  return (
    <form action={handleLogout}>
      <Button variant="destructive" type="submit">
        Logout
      </Button>
    </form>
  )
}

export default LogoutButton
