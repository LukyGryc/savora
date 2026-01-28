import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { format } from "date-fns"

interface TrackingProps {
  selectedDate?: Date;
}

const Tracking = ({ selectedDate }: TrackingProps) => {
    return (
        <Card className="flex flex-col min-w-[400px]">
            <CardHeader>
                <CardTitle>Selected Day</CardTitle>
            </CardHeader>
            <CardContent>
                {selectedDate ? (
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-card-foreground">
                            {format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {format(selectedDate, "yyyy-MM-dd")}
                        </p>
                    </div>
                ) : (
                    <p className="text-muted-foreground">No date selected</p>
                )}
            </CardContent>
        </Card>
    )
}

export default Tracking