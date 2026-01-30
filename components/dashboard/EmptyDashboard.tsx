import { Calendar } from "lucide-react"
import { Button } from "../ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"
import Link from "next/link"

const EmptyDashboard = () => {
    return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Calendar size={48} />
            </EmptyMedia>
            <EmptyTitle>No Items Yet</EmptyTitle>
            <EmptyDescription>
              You haven't created any items yet. Get started by creating
              your first item.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button variant="primary" asChild>
              <Link href="/calendar">Create Items</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )
}

export default EmptyDashboard