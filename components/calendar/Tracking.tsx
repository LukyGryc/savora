"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { format } from "date-fns"
import { Separator } from "../ui/separator";
import { CircleXIcon, Edit2, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface TrackingProps {
    selectedDate: Date;
}

const trackingData = [
    {
        id: 1,
        name: "Breakfast",
        categories: ["Food", "Drink"],
        amount: 10,
    },
]

const Tracking = ({ selectedDate }: TrackingProps) => {

    const handleDelete = (id: number) => {
        alert(`Deleting item ${id}`);
    }

    const handleEdit = (id: number) => {
        alert(`Editing item ${id}`);
    }

    const handleAddItem = () => {
        alert("Adding item");
    }

    return (
        <Card className="flex flex-col min-w-[400px]">
            <CardHeader>
                <CardTitle>Selected Day</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-lg font-medium text-card-foreground">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {format(selectedDate, "yyyy-MM-dd")}
                    </p>
                </div>
                <Separator className="my-4" />
                {trackingData.map((item) => (
                    <div key={item.id} className="flex flex-row gap-2 justify-between border border-border border-muted-foreground rounded-md p-3 mb-2 pb-2 hover:bg-accent/50 transition-colors">
                        <div className="flex flex-row gap-2 items-center">
                            <p>{item.name}</p>
                            <div title="Edit">
                                <Edit2 className="w-4 h-4 text-primary hover:text-primary/80 transition-colors cursor-pointer" onClick={() => handleEdit(item.id)} />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 items-center">
                            <p>${item.amount}</p>
                            <div title="Delete">
                                <CircleXIcon className="w-4 h-4 text-destructive hover:text-destructive/80 transition-colors cursor-pointer" onClick={() => handleDelete(item.id)} />
                            </div>
                        </div>
                    </div>
                ))}
                <Button onClick={handleAddItem}><PlusIcon /> Add Item</Button>
            </CardContent>
        </Card>
    )
}

export default Tracking